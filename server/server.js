require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const { Transaction, Account, Budget, Goal, Transfer, Bill, Profile } = require("./Models");

const app = express();
const PORT = process.env.PORT || 5000;
const origins = (process.env.CLIENT_ORIGIN || "http://localhost:5173,http://127.0.0.1:5173")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
// any localhost port is fine while developing, plus whatever is listed in CLIENT_ORIGIN
const LOCAL_RE = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/;
app.use(
  cors({
    origin: (origin, cb) => cb(null, !origin || LOCAL_RE.test(origin) || origins.includes(origin)),
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "x-device-id"],
  })
);
app.use(express.json({ limit: "100kb" }));

app.get("/", (req, res) => res.send("PocketNinja Backend is running!"));
app.get("/health", (req, res) => res.json({ ok: true, db: mongoose.connection.readyState === 1 }));

app.use("/api", rateLimit({ windowMs: 15 * 60 * 1000, limit: 1500, standardHeaders: true, legacyHeaders: false }));

/* ---------- identify the device (a random id kept in the browser) ---------- */
const DEVICE_RE = /^[A-Za-z0-9-]{16,64}$/;
app.use("/api", (req, res, next) => {
  const id = String(req.get("x-device-id") || req.query.deviceId || (req.body && req.body.deviceId) || "");
  if (!DEVICE_RE.test(id)) return res.status(400).json({ message: "A valid device ID is required" });
  req.deviceId = id;
  next();
});

const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const ID_RE = /^[\w-]{1,64}$/;
const OWN = (req) => ({ deviceId: req.deviceId, _id: { $type: "string" } });

/* ---------- generic CRUD: list / create / update / delete ---------- */
function crud(Model, fields, sort) {
  const router = express.Router();
  const pick = (body = {}) => {
    const out = {};
    for (const f of fields) if (body[f] !== undefined) out[f] = body[f];
    return out;
  };

  // GET all
  router.get("/", wrap(async (req, res) => {
    res.json(await Model.find(OWN(req)).sort(sort).limit(5000));
  }));

  // POST create (the client supplies the id)
  router.post("/", wrap(async (req, res) => {
    const id = String((req.body && req.body.id) || "");
    if (!ID_RE.test(id)) return res.status(400).json({ message: "A valid id is required" });
    const doc = await Model.create({ ...pick(req.body), _id: id, deviceId: req.deviceId });
    res.status(201).json(doc);
  }));

  // PUT update
  router.put("/:id", wrap(async (req, res) => {
    const doc = await Model.findOneAndUpdate(
      { _id: String(req.params.id), deviceId: req.deviceId },
      { $set: pick(req.body) },
      { new: true, runValidators: true }
    );
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  }));

  // DELETE
  router.delete("/:id", wrap(async (req, res) => {
    const doc = await Model.findOneAndDelete({ _id: String(req.params.id), deviceId: req.deviceId });
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  }));

  return router;
}

app.use("/api/transactions", crud(Transaction, ["name", "amount", "type", "category", "date", "account"], { date: -1, createdAt: -1 }));
app.use("/api/accounts", crud(Account, ["name", "type", "opening"], { createdAt: 1 }));
app.use("/api/budgets", crud(Budget, ["name", "amount"], { createdAt: 1 }));
app.use("/api/goals", crud(Goal, ["name", "target", "saved"], { createdAt: 1 }));
app.use("/api/transfers", crud(Transfer, ["createdAt", "from", "toType", "to", "amount", "note", "status", "decidedAt"], { createdAt: -1 }));
app.use("/api/bills", crud(Bill, ["name", "amount", "dueDay", "type", "category", "paid"], { createdAt: 1 }));

/* ---------- one call to load everything ---------- */
app.get("/api/all", wrap(async (req, res) => {
  const q = OWN(req);
  const [transactions, accounts, budgets, goals, transfers, bills, profile] = await Promise.all([
    Transaction.find(q).sort({ date: -1, createdAt: -1 }).limit(5000),
    Account.find(q).sort({ createdAt: 1 }),
    Budget.find(q).sort({ createdAt: 1 }),
    Goal.find(q).sort({ createdAt: 1 }),
    Transfer.find(q).sort({ createdAt: -1 }).limit(2000),
    Bill.find(q).sort({ createdAt: 1 }),
    Profile.findOne({ deviceId: req.deviceId }),
  ]);
  res.json({
    transactions, accounts, budgets, goals, transfers, bills,
    settings: profile ? { settings: profile.settings, eduDone: profile.eduDone } : null,
  });
}));

/* ---------- preferences ---------- */
app.get("/api/settings", wrap(async (req, res) => {
  const p = await Profile.findOne({ deviceId: req.deviceId });
  res.json({ settings: p ? p.settings : {}, eduDone: p ? p.eduDone : [] });
}));

app.put("/api/settings", wrap(async (req, res) => {
  const { settings, eduDone } = req.body || {};
  const bad = (m) => res.status(400).json({ message: m });
  if (settings !== undefined && (typeof settings !== "object" || settings === null || Array.isArray(settings) || JSON.stringify(settings).length > 10000))
    return bad("Invalid settings");
  if (eduDone !== undefined && (!Array.isArray(eduDone) || eduDone.length > 50 || eduDone.some((x) => typeof x !== "string" || x.length > 40)))
    return bad("Invalid lesson list");
  const update = {};
  if (settings) {
    const { parentPinHash, ...safe } = settings; // the PIN hash never leaves the browser
    update.settings = safe;
  }
  if (eduDone) update.eduDone = eduDone;
  const p = await Profile.findOneAndUpdate(
    { deviceId: req.deviceId },
    { $set: update },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  res.json({ settings: p.settings, eduDone: p.eduDone });
}));

/* ---------- reset: wipe this device's data back to zero ---------- */
app.delete("/api/reset", wrap(async (req, res) => {
  const f = { deviceId: req.deviceId };
  await Promise.all([Transaction, Account, Budget, Goal, Transfer, Bill].map((M) => M.deleteMany(f)));
  await Profile.updateOne(f, { $set: { eduDone: [] } });
  res.json({ message: "All data reset" });
}));

/* ---------- errors ---------- */
app.use("/api", (req, res) => res.status(404).json({ message: "Route not found" }));
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") return res.status(400).json({ message: "Invalid JSON" });
  if (err.name === "ValidationError")
    return res.status(400).json({ message: Object.values(err.errors).map((e) => e.message).join(", ") });
  if (err.code === 11000) return res.status(409).json({ message: "That item already exists" });
  if (err.name === "CastError") return res.status(400).json({ message: "Invalid value" });
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

/* ---------- start ---------- */
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is missing. Copy .env.example to .env and fill it in.");
  process.exit(1);
}
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    const server = app.listen(PORT, () => console.log(`PocketNinja API running on http://localhost:${PORT}`));
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE")
        console.error(`Port ${PORT} is already in use. Stop the other server, or set a different PORT in .env (on a Mac, try 5001 because AirPlay uses 5000).`);
      else console.error(err);
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });