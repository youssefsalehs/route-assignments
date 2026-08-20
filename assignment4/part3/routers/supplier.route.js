const express = require("express");
const {
  createSupplier,
  getAllSuppliers,
  updateSupplier,
  deleteSupplier,
  changeContactNumberType,
} = require("../controllers/supplier.controller");
const supplierRouter = express.Router();

supplierRouter.route("/").get(getAllSuppliers).post(createSupplier);
supplierRouter.put("/contact-number", changeContactNumberType);
supplierRouter.route("/:supplierId").put(updateSupplier).delete(deleteSupplier);
module.exports = supplierRouter;
