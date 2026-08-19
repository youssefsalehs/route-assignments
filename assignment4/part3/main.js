const { config } = require("dotenv");
config();
const PORT = process.env.PORT;
const express = require("express");
const app = express();
const { Pool } = require("pg");
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({ status: "ok", db: "connected" });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", db: "disconnected", message: err.message });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
