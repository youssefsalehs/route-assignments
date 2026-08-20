const pool = require("../config/dbConfig.js");
async function createProduct(req, res) {
  const { title, quantity, price, supplierId } = req.body;
  if (!title || !quantity || !price || !supplierId) {
    const error = new Error("all fields are required");
    throw error;
  }
  if (quantity < 0) {
    const error = new Error("Quantity can't be negative");
    throw error;
  }
  if (price < 0) {
    const error = new Error("Price can't be negative");
    throw error;
  }
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rows: searchedProduct } = await client.query(
      "select * from product where name = $1",
      [title],
    );
    if (searchedProduct.length > 0) {
      const error = new Error("product name already exists");
      throw error;
    }
    await client.query(
      " insert into product (name,stock,price,supplier_id) values($1,$2,$3,$4)",
      [title, quantity, price, supplierId],
    );
    await client.query("COMMIT");
    return res.status(201).json({
      status: "success",
      message: "product created successfully",
    });
  } catch (error) {
    console.log(error);
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
async function updateProduct(req, res) {
  const { title, quantity, price, supplierId } = req.body;
  const productId = req.params.productId;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rows: searchedProduct } = await client.query(
      "select * from product where id = $1",
      [productId],
    );
    if (searchedProduct.length === 0) {
      const error = new Error("no product found");
      throw error;
    }
    const product = searchedProduct[0];
    const { rows: searchedSupplier } = await client.query(
      "select * from supplier where id = $1",
      [supplierId],
    );

    let updatedSupplier;
    if (searchedSupplier.length === 0) {
      updatedSupplier = product["supplier_id"];
    } else {
      updatedSupplier = supplierId;
    }

    const updatedQuantity = quantity || product.stock;
    const updatedName = title || product.name;
    const updatedPrice = price || product.price;
    const { rows: existingProduct } = await client.query(
      `SELECT *
       FROM product
       WHERE name = $1
       AND id != $2`,
      [updatedName, productId],
    );

    if (existingProduct.length > 0) {
      const error = new Error("Another product already has this name");
      throw error;
    }
    if (updatedQuantity < 0) {
      const error = new Error("Quantity can't be negative");
      throw error;
    }
    if (updatedPrice < 0) {
      const error = new Error("Price can't be negative");
      throw error;
    }
    await client.query(
      " update  product set name = $1,stock = $2,price = $3,supplier_id = $4 where id = $5",
      [updatedName, updatedQuantity, updatedPrice, updatedSupplier, productId],
    );
    await client.query("COMMIT");
    return res.status(200).json({
      status: "success",
      message: "product updated successfully",
    });
  } catch (error) {
    console.log(error);
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
async function getAllProducts(req, res) {
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;
  const offset = (page - 1) * limit;
  try {
    const { rows } = await pool.query(
      "select * from product limit $1 offset $2",
      [limit, offset],
    );
    return res.status(200).json({
      data: rows,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function getProduct(req, res) {
  const productId = req.params.productId;
  try {
    const { rows } = await pool.query("select * from product where id = $1", [
      productId,
    ]);
    if (rows.length === 0) {
      const error = new Error("product not found");
      throw error;
    }
    return res.status(200).json({
      data: rows[0],
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function deleteProduct(req, res) {
  const productId = +req.params.productId;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rows } = await client.query(
      "delete from product where id = $1 returning *",
      [productId],
    );
    if (rows.length === 0) {
      const error = new Error("product not found");
      throw error;
    }
    await client.query("COMMIT");
    return res.status(204).json({
      status: "success",
      message: "product  deleted successfully",
    });
  } catch (error) {
    console.log(error);
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
async function createCategoryColumn(req, res) {
  try {
    await pool.query(`
      ALTER TABLE product
      ADD COLUMN category VARCHAR(100)
    `);

    return res.status(200).json({
      status: "success",
      message: "Category column added successfully",
    });
  } catch (error) {
    throw error;
  }
}
async function deleteCategoryColumn(req, res) {
  try {
    await pool.query(`
      ALTER TABLE product
      DROP COLUMN category 
    `);

    return res.status(200).json({
      status: "success",
      message: "Category column deleted successfully",
    });
  } catch (error) {
    throw error;
  }
}
async function addProductNameNotNull(req, res) {
  const client = await pool.connect();

  try {
    await client.query(`
      ALTER TABLE product
      ALTER COLUMN name SET NOT NULL
    `);

    return res.status(200).json({
      message: "Product name is now NOT NULL",
    });
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}
async function updateProductPriceByName(req, res) {
  const { name, price } = req.body;
  if (!name) {
    const error = new Error("name must be included");
    throw error;
  }
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rows: searchedProduct } = await client.query(
      "select * from product where name = $1",
      [name],
    );
    if (searchedProduct.length === 0) {
      const error = new Error("no product found");
      throw error;
    }
    const updatedPrice = price || searchedProduct[0].price;
    if (updatedPrice < 0) {
      const error = new Error("Price can't be negative");
      throw error;
    }
    await client.query(" update  product set price = $1 where id = $2", [
      updatedPrice,
      searchedProduct[0].id,
    ]);
    await client.query("COMMIT");
    return res.status(200).json({
      status: "success",
      message: `product ${searchedProduct[0].name} updated successfully`,
    });
  } catch (error) {
    console.log(error);
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
async function deleteProductByName(req, res) {
  const { name } = req.query;
  try {
    const { rows } = await pool.query(
      "DELETE FROM product WHERE name = $1 RETURNING *",
      [name],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: `Product ${name} not found`,
      });
    }

    return res.status(204).json({
      message: "Eggs deleted successfully",
    });
  } catch (error) {
    throw error;
  }
}
module.exports = {
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
};
