const express = require("express");
const {
  createProduct,
  updateProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  createCategoryColumn,
  deleteCategoryColumn,
  addProductNameNotNull,
  updateProductPriceByName,
  deleteProductByName,
} = require("../controllers/product.controller");
const saleRouter = require("./sale.route");
const productRouter = express.Router();

productRouter.use("/:productId/sales", saleRouter);
productRouter.route("/").get(getAllProducts).post(createProduct);
productRouter.patch("/update-price", updateProductPriceByName);
productRouter.delete("/delete-by-name", deleteProductByName);
productRouter
  .route("/category")
  .put(createCategoryColumn)
  .delete(deleteCategoryColumn);
productRouter.put("/not-null", addProductNameNotNull);
productRouter
  .route("/:productId")
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = productRouter;
