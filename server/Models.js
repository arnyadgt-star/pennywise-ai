const mongoose = require("mongoose");
const { Schema } = mongoose;

/*
  Every document uses a STRING _id that the frontend generates (a UUID) and is
  tied to a deviceId, so a device can only see and change its own data.
  toJSON exposes `_id` as `id` and hides deviceId / timestamps.
*/
function build(name, collection, fields, { timestamps = true } = {}) {
  const schema = new Schema(
    {
      _id: { type: String, required: true },
      deviceId: { type: String, required: true, index: true },
      ...fields,
    },
    {
      collection,
      timestamps,
      versionKey: false,
      toJSON: {
        transform: (doc, ret) => {
          ret.id = ret._id;
          delete ret._id;
          delete ret.deviceId;
          if (timestamps) {
            delete ret.createdAt;
            delete ret.updatedAt;
          }
          return ret;
        },
      },
    }
  );
  return mongoose.model(name, schema);
}

const text = (max, extra = {}) => ({ type: String, trim: true, maxlength: max, ...extra });
const money = (extra = {}) => ({ type: Number, min: 0.01, max: 1e12, ...extra });

const Transaction = build("Transaction", "Transactions", {
  name: text(120, { required: true }),
  amount: money({ required: true }),
  type: { type: String, enum: ["income", "expense"], required: true },
  category: text(60, { required: true }),
  date: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
  account: text(64, { default: "" }),
});

const Account = build("Account", "Accounts", {
  name: text(80, { required: true }),
  type: { type: String, enum: ["Checking", "Savings", "Cash", "Wallet"], required: true },
  opening: { type: Number, default: 0, min: -1e12, max: 1e12 },
});

const Budget = build("Budget", "Budgets", {
  name: text(60, { required: true }),
  amount: money({ required: true }),
});

const Goal = build("Goal", "Goals", {
  name: text(80, { required: true }),
  target: money({ required: true }),
  saved: { type: Number, default: 0, min: 0, max: 1e12 },
});

// Transfers keep the client's own createdAt string, so no automatic timestamps
const Transfer = build(
  "Transfer",
  "Transfers",
  {
    createdAt: { type: String, required: true },
    from: text(64, { required: true }),
    toType: { type: String, enum: ["account", "external"], required: true },
    to: text(120, { required: true }),
    amount: money({ required: true }),
    note: text(200, { default: "" }),
    status: {
      type: String,
      enum: ["pending", "completed", "declined", "cancelled", "failed"],
      default: "pending",
    },
    decidedAt: { type: String, default: null },
  },
  { timestamps: false }
);

const Bill = build("Bill", "Bills", {
  name: text(80, { required: true }),
  amount: money({ required: true }),
  dueDay: { type: Number, min: 1, max: 31, required: true },
  type: { type: String, enum: ["Bill", "Subscription"], default: "Bill" },
  category: text(60, { default: "Bills" }),
  paid: { type: [String], default: [] },
});

// One profile per device: preferences + finished lessons
const Profile = mongoose.model(
  "Profile",
  new Schema(
    {
      deviceId: { type: String, required: true, unique: true },
      settings: { type: Schema.Types.Mixed, default: {} },
      eduDone: { type: [String], default: [] },
    },
    { collection: "Profiles", timestamps: true, versionKey: false }
  )
);

module.exports = { Transaction, Account, Budget, Goal, Transfer, Bill, Profile };