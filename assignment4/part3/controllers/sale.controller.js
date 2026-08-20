const pool = require("../config/dbConfig.js");
async function createSale(req, res) {
  const { quantity, date, productId } = req.body;
  if (!quantity || !productId) {
    const error = new Error("all fields are required");
    throw error;
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rows: searchedProduct } = await client.query(
      "select * from product where id = $1",
      [productId],
    );
    if (searchedProduct.length === 0) {
      const error = new Error("product not found");
      throw error;
    }
    if (quantity < 0 || quantity > searchedProduct[0].quantity) {
      const error = new Error(
        "Quantity can't be negative or exceed available stock",
      );
      throw error;
    }
    if (date) {
      await client.query(
        "INSERT INTO sale (quantity, product_id, date) VALUES ($1, $2, $3)",
        [quantity, productId, date],
      );
    } else {
      await client.query(
        "INSERT INTO sale (quantity, product_id) VALUES ($1, $2)",
        [quantity, productId],
      );
    }
    await client.query("COMMIT");
    return res.status(201).json({
      status: "success",
      message: "sale created successfully",
    });
  } catch (error) {
    console.log(error);
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
async function getAllSales(req, res) {
  const { productId } = req.params;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  try {
    let query;
    let values;

    if (productId) {
      query = `
        SELECT *
        FROM sale
        WHERE product_id = $1
        LIMIT $2
        OFFSET $3
      `;

      values = [productId, limit, offset];
    } else {
      query = `
        SELECT *
        FROM sale
        LIMIT $1
        OFFSET $2
      `;

      values = [limit, offset];
    }

    const { rows } = await pool.query(query, values);

    return res.status(200).json({
      data: rows,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function getSaleById(req, res) {
  const saleId = req.params.saleId;
  try {
    const { rows } = await pool.query("select * from sale where id = $1", [
      saleId,
    ]);
    if (rows.length === 0) {
      const error = new Error("sale not found");
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

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
};
