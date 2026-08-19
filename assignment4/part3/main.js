const { config } = require("dotenv");
config();
const PORT = process.env.PORT;
const express = require("express");
const app = express();
const pool = require("./config/dbConfig");
const productRouter = require("./routers/product.route");
const supplierRouter = require("./routers/supplier.route");
const saleRouter = require("./routers/sale.route");
app.use(express.json());
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
app.use("/api/v1/product", productRouter);
app.use("/api/v1/supplier", supplierRouter);
app.use("/api/v1/sale", saleRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
