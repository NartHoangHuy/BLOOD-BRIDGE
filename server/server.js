const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const pool = require('./db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// 🟩 Cung cấp file tĩnh (ảnh upload)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 🟩 Các API routes
app.use('/api/profile', profileRoutes);
app.use(express.json());
app.use('/api/auth', authRoutes);

// Test DB (tuỳ chọn)
app.get('/api/db-test', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.json({ message: 'Kết nối DB thành công', result: rows[0].result });
  } catch (err) {
    res.status(500).json({ message: 'Không thể kết nối DB', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});
