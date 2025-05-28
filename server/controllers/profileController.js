const pool = require('../db');

// 📌 Lấy hồ sơ
async function getProfile(req, res) {
  const userId = req.params.userId;
  try {
    const [rows] = await pool.query(
      `SELECT h.* FROM hosotaikhoan h
       JOIN taikhoan t ON h.MaTaiKhoan = t.MaTaiKhoan
       WHERE h.MaTaiKhoan = ?`,
      [userId]
    );
    if (rows.length > 0) {
      res.json({ hasProfile: true, profile: rows[0] });
    } else {
      res.json({ hasProfile: false });
    }
  } catch (err) {
    console.error('❌ Lỗi trong getProfile:', err);
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
}

// 📌 Lưu / cập nhật hồ sơ (với file upload)
async function saveDonorProfile(req, res) {
  try {
    console.log('🟢 req.body:', req.body);
    console.log('🟢 req.files:', req.files);

    const { MaTaiKhoan, Ho, Ten, NgaySinh, SDT } = req.body;
    const maTaiKhoanInt = parseInt(MaTaiKhoan, 10);

    if (!maTaiKhoanInt || isNaN(maTaiKhoanInt)) {
      return res.status(400).json({ message: 'MaTaiKhoan không hợp lệ!' });
    }

    const GioiTinh = parseInt(req.body.GioiTinh, 10) || 0;
    const LinkThongTin = req.files?.LinkFile?.[0]?.filename || null;
    const HinhAnh = req.files?.Image?.[0]?.filename || null;

    const formatDate = (dateString) => {
      if (!dateString) return null;
      return dateString.split('T')[0];
    };
    const NgaySinhFormatted = formatDate(NgaySinh);

    const [existing] = await pool.query('SELECT * FROM hosotaikhoan WHERE MaTaiKhoan = ?', [maTaiKhoanInt]);

    if (existing.length > 0) {
      await pool.query(
        `UPDATE hosotaikhoan SET Ho=?, Ten=?, NgaySinh=?, GioiTinh=?, SDT=?,
         LinkThongTin=IFNULL(?, LinkThongTin), HinhAnh=IFNULL(?, HinhAnh)
         WHERE MaTaiKhoan=?`,
        [Ho, Ten, NgaySinhFormatted, GioiTinh, SDT, LinkThongTin, HinhAnh, maTaiKhoanInt]
      );
      res.status(200).json({ message: 'Cập nhật hồ sơ thành công!' });
    } else {
      await pool.query(
        `INSERT INTO hosotaikhoan (MaTaiKhoan, Ho, Ten, NgaySinh, GioiTinh, SDT, LinkThongTin, HinhAnh)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [maTaiKhoanInt, Ho, Ten, NgaySinhFormatted, GioiTinh, SDT, LinkThongTin, HinhAnh]
      );
      res.status(201).json({ message: 'Tạo hồ sơ thành công!' });
    }
  } catch (error) {
    console.error('❌ Lỗi trong saveDonorProfile:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
}

module.exports = { getProfile, saveDonorProfile };
