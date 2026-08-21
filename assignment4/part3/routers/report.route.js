const express = require("express");
const {
  getTotalSalesForProduct,
  getHighestStock,
  getSuppliersStartingWith,
  getNeverSoldProducts,
  getAllSales,
} = require("../controllers/report.controller");

const reportRouter = express.Router();
reportRouter.get("/total-sales-for-products", getTotalSalesForProduct);
reportRouter.get("/highest-stock", getHighestStock);
reportRouter.get("/suppliers-starting-letter", getSuppliersStartingWith);
reportRouter.get("/never-sold", getNeverSoldProducts);
reportRouter.get("/all-sales", getAllSales);
module.exports = reportRouter;
