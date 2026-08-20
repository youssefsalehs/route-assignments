const pool = require("../config/dbConfig.js");

async function createSupplier(req, res) {
  const { name, phone } = req.body;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rows: suppliers } = await client.query(
      "select * from supplier where name = $1",
      [name],
    );
    if (suppliers.length > 0) {
      const error = new Error("supplier already exists");
      throw error;
    }
    const { rows } = await client.query(
      "insert into supplier (name,contact_number) values ($1,$2)",
      [name, phone],
    );
    await client.query("COMMIT");
    return res.status(201).json({
      status: "success",
      message: "supplier is created successfully",
    });
  } catch (error) {
    console.log(error);
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
async function getAllSuppliers(req, res) {
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;
  const offset = (page - 1) * limit;
  try {
    const { rows } = await pool.query(
      "select * from supplier limit $1 offset $2",
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
async function updateSupplier(req, res) {
  const { name, phone } = req.body;
  const supplierId = +req.params.supplierId;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rows: supplier } = await client.query(
      "select * from supplier where name = $1 and id != $2",
      [name, supplierId],
    );
    if (supplier.length > 0) {
      const error = new Error("supplier already exists");
      throw error;
    }
    const updatedName = name || supplier[0].name;
    const updatedPhone = phone || supplier[0]["contact_number"];
    const { rows } = await client.query(
      "UPDATE supplier SET name = $1, contact_number = $2 WHERE id = $2 RETURNING *",
      [updatedName, updatedPhone, supplierId],
    );
    if (rows.length === 0) {
      const error = new Error("supplier not found");
      throw error;
    }

    await client.query("COMMIT");
    return res.status(200).json({
      status: "success",
      message: "supplier updated successfully",
      data: rows[0],
    });
  } catch (error) {
    console.log(error);
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
async function deleteSupplier(req, res) {
  const supplierid = +req.params.supplierId;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rows } = await client.query(
      "delete from supplier where id = $1 returning *",
      [supplierid],
    );
    if (rows.length === 0) {
      const error = new Error("supplier not found");
      throw error;
    }
    await client.query("COMMIT");
    return res.status(204).json({
      status: "success",
      message: "supplier deleted successfully",
    });
  } catch (error) {
    console.log(error);
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
async function changeContactNumberType(req, res) {
  const client = await pool.connect();

  try {
    await client.query(`
      ALTER TABLE supplier
      ALTER COLUMN contact_number TYPE VARCHAR(15)
    `);

    return res.status(200).json({
      status: "success",
      message: "ContactNumber changed to VARCHAR(15)",
    });
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}
module.exports = {
  createSupplier,
  getAllSuppliers,
  updateSupplier,
  deleteSupplier,
  changeContactNumberType,
};
