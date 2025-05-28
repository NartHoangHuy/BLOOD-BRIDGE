const jwt = require('jsonwebtoken');

// Middleware: Xác thực token (Bearer token)
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Chưa đăng nhập!' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');
    req.user = decoded; // { MaTaiKhoan, LoaiTaiKhoan }
    next();
  } catch (error) {
    console.error('❌ Lỗi xác thực token:', error);
    return res.status(403).json({ message: 'Token không hợp lệ!' });
  }
};

// Middleware: Phân quyền (dựa trên LoaiTaiKhoan)
const authorize = (allowedRoles) => (req, res, next) => {
  const userRole = req.user.LoaiTaiKhoan; // Chuẩn field trong token
  if (allowedRoles.includes(userRole)) {
    next();
  } else {
    return res.status(403).json({ message: 'Không có quyền!' });
  }
};

module.exports = {
  authenticate,
  authorize
};
