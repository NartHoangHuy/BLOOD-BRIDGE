const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const pool = require('./db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const adminRoutes = require('./routes/adminRoutes');      // Thêm
const benhvienRoutes = require('./routes/benhvienRoutes'); // Thêm
const { authenticate, authorize } = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Cung cấp file tĩnh (ảnh upload)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Các routes chính
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);         // Áp dụng route Admin
app.use('/api/benhvien', benhvienRoutes);   // Áp dụng route BenhVien

// 🟩 Ví dụ route cho User & Admin (có sẵn trong server.js)
app.get('/api/user/data', authenticate, authorize(['User', 'Admin']), (req, res) => {
  res.json({ message: 'Dữ liệu cho User & Admin!' });
});

// 🟩 Test DB (tuỳ chọn)
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
