const pool = require("../config/dbConfig.js");
async function getTotalSalesForProduct(req, res) {
  const { rows } = await pool.query(
    "select p.id,p.name ,  COALESCE(SUM(s.quantity), 0)  as total_sales from product p left join sale s on p.id=s.product_id group by p.id",
  );

  return res.status(200).json({
    data: rows,
  });
}
async function getHighestStock(req, res) {
  const { rows } = await pool.query(
    "select * from product  order by stock desc,name asc limit 1",
  );

  return res.status(200).json({
    data: rows[0],
  });
}
async function getSuppliersStartingWith(req, res) {
  const { letter } = req.query;
  const { rows } = await pool.query(
    `
    SELECT *
    FROM supplier
    WHERE name LIKE $1
  `,
    [`${letter}%`],
  );
  res.status(200).json({ data: rows });
}
async function getNeverSoldProducts(req, res) {
  const { rows } = await pool.query(`
   SELECT 
      p.id,
      p.name,
      COALESCE(SUM(s.quantity), 0) AS total_sales
    FROM product p
    LEFT JOIN sale s ON p.id = s.product_id
    GROUP BY p.id, p.name
    HAVING COALESCE(SUM(s.quantity), 0) = 0
    `);

  res.status(200).json({ data: rows });
}
module.exports = {
  getTotalSalesForProduct,
  getHighestStock,
  getSuppliersStartingWith,
  getNeverSoldProducts,
};
