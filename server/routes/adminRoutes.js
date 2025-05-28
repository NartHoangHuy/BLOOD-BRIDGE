const express = require('express');
const router = express.Router();
const pool = require('../db'); // 🟩 Thêm kết nối DB (nếu cần)
const { authenticate, authorize } = require('../middleware/authMiddleware');

// 📌 Route: Dashboard (Admin-only)
router.get('/dashboard', authenticate, authorize(['Admin']), (req, res) => {
  res.json({ message: 'Chào mừng Admin! Đây là trang dashboard.' });
});

// 📌 Route: Lấy danh sách user (Admin-only)
router.get('/users', authenticate, authorize(['Admin']), async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT MaTaiKhoan, TenDangNhap, Email, LoaiTaiKhoan FROM TAIKHOAN'
    );
    res.json({
      message: 'Danh sách tài khoản',
      users
    });
  } catch (error) {
    console.error('❌ Lỗi khi lấy danh sách user:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

module.exports = router;
