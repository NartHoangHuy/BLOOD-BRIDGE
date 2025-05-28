const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Đăng ký tài khoản
async function register(req, res) {
  const { TenDangNhap, Email, MatKhau } = req.body;

  if (!TenDangNhap || !Email || !MatKhau) {
    return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
  }

  try {
    // Kiểm tra tên đăng nhập hoặc email đã tồn tại chưa
    const [existing] = await pool.query(
      'SELECT * FROM TAIKHOAN WHERE TenDangNhap = ? OR Email = ?',
      [TenDangNhap, Email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Tên đăng nhập hoặc email đã tồn tại' });
    }

    // Mã hoá mật khẩu
    const hashedPassword = await bcrypt.hash(MatKhau, 10);

    // Lưu tài khoản mới (mặc định: User)
    const [result] = await pool.query(
      'INSERT INTO TAIKHOAN (TenDangNhap, MatKhau, Email, LoaiTaiKhoan, ThoiGianDangKy) VALUES (?, ?, ?, ?, NOW())',
      [TenDangNhap, hashedPassword, Email, 'User']
    );

    return res.status(201).json({
      message: 'Đăng ký thành công',
      userId: result.insertId,
      role: 'User'
    });
  } catch (error) {
    console.error('❌ Lỗi trong register:', error);
    return res.status(500).json({ message: 'Lỗi server' });
  }
}

// Đăng nhập
async function login(req, res) {
  const { TenDangNhap, MatKhau } = req.body;

  if (!TenDangNhap || !MatKhau) {
    return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
  }

  try {
    // Tìm tài khoản
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

    // Lấy thông tin họ tên từ HOSOTAIKHOAN (nếu có)
    const [profiles] = await pool.query(
      'SELECT Ho, Ten FROM HOSOTAIKHOAN WHERE MaTaiKhoan = ?',
      [user.MaTaiKhoan]
    );

    let fullName = 'Người dùng';
    if (profiles.length > 0) {
      fullName = `${profiles[0].Ho} ${profiles[0].Ten}`.trim();
    }

    // Tạo token
    const token = jwt.sign(
      { MaTaiKhoan: user.MaTaiKhoan, LoaiTaiKhoan: user.LoaiTaiKhoan },
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      message: 'Đăng nhập thành công',
      userId: user.MaTaiKhoan,
      role: user.LoaiTaiKhoan,
      fullName,  // ✅ Thêm tên người dùng
      token
    });
  } catch (error) {
    console.error('❌ Lỗi trong login:', error);
    return res.status(500).json({ message: 'Lỗi server' });
  }
}

// Kiểm tra hồ sơ tài khoản (DonorProfile)
async function checkProfile(req, res) {
  const userId = req.params.userId;

  try {
    const [rows] = await pool.query(
      `SELECT h.* FROM hosotaikhoan h
       JOIN taikhoan t ON h.MaTaiKhoan = t.MaTaiKhoan
       WHERE t.MaTaiKhoan = ?`,
      [userId]
    );

    if (rows.length > 0) {
      return res.json({ hasProfile: true, profile: rows[0] });
    } else {
      return res.json({ hasProfile: false });
    }
  } catch (error) {
    console.error('❌ Lỗi trong checkProfile:', error);
    return res.status(500).json({ message: 'Lỗi server' });
  }
}

module.exports = { register, login, checkProfile };
