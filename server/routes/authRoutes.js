const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { getProfile } = require('../controllers/profileController'); // Sửa lại: Import từ profileController

// 📌 Đăng ký
router.post('/register', register);

// 📌 Đăng nhập
router.post('/login', login);

// 📌 Kiểm tra hồ sơ tài khoản
router.get('/profile/:userId', getProfile); // 🚀 API kiểm tra hồ sơ

module.exports = router;
