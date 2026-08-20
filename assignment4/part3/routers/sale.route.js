const express = require("express");
const {
  getAllSales,
  getSaleById,
  createSale,
} = require("../controllers/sale.controller");

const saleRouter = express.Router({ mergeParams: true });

saleRouter.route("/").get(getAllSales).post(createSale);
saleRouter.route("/:saleId").get(getSaleById);
module.exports = saleRouter;
