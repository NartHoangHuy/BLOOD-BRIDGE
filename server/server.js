const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./db');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (phải trước khi đăng ký routes!)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// API auth
app.use('/api/auth', authRoutes);

// Route kiểm tra kết nối DB
app.get('/api/db-test', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.json({ message: 'Kết nối DB thành công', result: rows[0].result });
  } catch (err) {
    console.error('Lỗi kết nối DB:', err);
    res.status(500).json({ message: 'Không thể kết nối cơ sở dữ liệu', error: err.message });
  }
});

// Root API test
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// API mock bệnh viện
app.get('/api/hospitals/:id', (req, res) => {
  const mockHospital = {
    id: req.params.id,
    name: 'Bệnh viện Đa khoa Trung ương',
    address: '123 Nguyễn Văn Cừ, Quận 5, TP.HCM',
    phone: '028 1234 5678',
    description: 'Đây là mô tả bệnh viện mẫu từ backend Express.'
  };
  res.json(mockHospital);
});

// Lắng nghe server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
