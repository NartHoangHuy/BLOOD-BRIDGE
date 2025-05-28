const express = require('express');
const router = express.Router();
const pool = require('../db'); // 🟩 Kết nối DB
const { authenticate, authorize } = require('../middleware/authMiddleware');

// 📌 Route: Dashboard (BenhVien-only)
router.get('/dashboard', authenticate, authorize(['BenhVien']), (req, res) => {
  res.json({ message: 'Chào mừng Nhân viên bệnh viện!' });
});

// 📌 Route: Tạo yêu cầu hiến máu (BenhVien-only)
router.post('/yeu-cau-hien-mau', authenticate, authorize(['BenhVien']), async (req, res) => {
  const { MaNhomMau, MaNV } = req.body;

  if (!MaNhomMau || !MaNV) {
    return res.status(400).json({ message: 'Thiếu dữ liệu!' });
  }

  try {
    await pool.query(
      `INSERT INTO YEUCAUHIENMAU (MaNhomMau, MaNV, ThoiGianTaoYeuCau, TrangThaiYeuCau)
       VALUES (?, ?, NOW(), 'DangThieu')`,
      [MaNhomMau, MaNV]
    );

    res.status(201).json({ message: 'Tạo yêu cầu hiến máu thành công!' });
  } catch (error) {
    console.error('❌ Lỗi khi tạo yêu cầu:', error);
    res.status(500).json({ message: 'Lỗi server!' });
  }
});

module.exports = router;
