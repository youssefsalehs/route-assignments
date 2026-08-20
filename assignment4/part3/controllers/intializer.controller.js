const pool = require("../config/dbConfig.js");
async function initializeData(req, res) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const supplierResult = await client.query(
      `INSERT INTO supplier (name, contact_number)
       VALUES ($1, $2)
       RETURNING id`,
      ["FreshFoods", "01001234567"],
    );

    const supplierId = supplierResult.rows[0].id;
    const milkResult = await client.query(
      `INSERT INTO product (name, price, stock, supplier_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      ["Milk", 15.0, 50, supplierId],
    );

    await client.query(
      `INSERT INTO product (name, price, stock, supplier_id)
       VALUES ($1, $2, $3, $4)`,
      ["Bread", 10.0, 30, supplierId],
    );

    await client.query(
      `INSERT INTO product (name, price, stock, supplier_id)
       VALUES ($1, $2, $3, $4)`,
      ["Eggs", 20.0, 40, supplierId],
    );

    const milkId = milkResult.rows[0].id;

    await client.query(
      `INSERT INTO sale (quantity, date, product_id)
       VALUES ($1, $2, $3)`,
      [2, "2025-05-20", milkId],
    );

    await client.query("COMMIT");

    res.status(201).json({
      message: "Initial data inserted successfully",
    });
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
module.exports = initializeData;
