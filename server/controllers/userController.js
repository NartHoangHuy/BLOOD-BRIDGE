const pool = require('../db');

async function getAllUsers() {
  const [rows] = await pool.query('SELECT * FROM TAIKHOAN');
  return rows;
}

module.exports = { getAllUsers };
