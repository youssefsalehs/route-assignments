const pool = require("../config/dbConfig.js");

async function createSupplier(req, res) {
  const { name } = req.body;
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
      "insert into supplier (name) values ($1)",
      [name],
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
  const { name } = req.body;
  if (!name) {
    const error = new Error("name is a must");
    throw error;
  }
  const supplierId = +req.params.supplierId;
  console.log(supplierId, name);
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
    const { rows } = await client.query(
      "update supplier set name = $1 where id = $2 returning *",
      [name, supplierId],
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
module.exports = {
  createSupplier,
  getAllSuppliers,
  updateSupplier,
  deleteSupplier,
};
