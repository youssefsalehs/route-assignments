const express = require("express");
const {
  createSupplier,
  getAllSuppliers,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplier.controller");
const supplierRouter = express.Router();

supplierRouter.route("/").get(getAllSuppliers).post(createSupplier);
supplierRouter.route("/:supplierId").put(updateSupplier).delete(deleteSupplier);
module.exports = supplierRouter;
