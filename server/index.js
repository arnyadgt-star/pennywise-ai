const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to PocketNinja Backend!",
    status: "Server is running successfully",
  });
});

// Server port
const PORT = process.env.PORT || 5000;

app.listen(PORT, "127.0.0.1", () => {
  console.log(`PocketNinja backend running on http://127.0.0.1:${PORT}`);
});
