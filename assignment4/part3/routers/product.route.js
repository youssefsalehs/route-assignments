const express = require("express");
const {
  createProduct,
  updateProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const productRouter = express.Router();

productRouter.route("/").get(getAllProducts).post(createProduct);
productRouter
  .route("/:productId")
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);
module.exports = productRouter;
