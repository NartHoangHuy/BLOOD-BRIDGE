const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function register(req, res) {
  console.log('Body nhận được:', req.body); // 🔍 Kiểm tra body

  const { TenDangNhap, Email, MatKhau } = req.body;

  if (!TenDangNhap || !Email || !MatKhau) {
    return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
  }

  try {
    const [existing] = await pool.query(
      'SELECT * FROM TAIKHOAN WHERE TenDangNhap = ? OR Email = ?',
      [TenDangNhap, Email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Tên đăng nhập hoặc email đã tồn tại' });
    }

    const hashedPassword = await bcrypt.hash(MatKhau, 10);

    const [result] = await pool.query(
      'INSERT INTO TAIKHOAN (TenDangNhap, MatKhau, Email, LoaiTaiKhoan, ThoiGianDangKy) VALUES (?, ?, ?, ?, NOW())',
      [TenDangNhap, hashedPassword, Email, 'User']
    );

    return res.status(201).json({ message: 'Đăng ký thành công', userId: result.insertId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Lỗi server' });
  }
}

async function login(req, res) {
  console.log('Body nhận được:', req.body); // 🔍 Kiểm tra body

  const { TenDangNhap, MatKhau } = req.body;

  if (!TenDangNhap || !MatKhau) {
    return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
  }

  try {
    const [users] = await pool.query(
      'SELECT * FROM TAIKHOAN WHERE TenDangNhap = ?',
      [TenDangNhap]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Tên đăng nhập không tồn tại' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(MatKhau, user.MatKhau);

    if (!isMatch) {
      return res.status(401).json({ message: 'Mật khẩu không đúng' });
    }

    const token = jwt.sign(
      { userId: user.MaTaiKhoan, role: user.LoaiTaiKhoan },
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      message: 'Đăng nhập thành công',
      userId: user.MaTaiKhoan,
      role: user.LoaiTaiKhoan,
      token
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Lỗi server' });
  }
}

module.exports = { register, login };
