const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { checkProfile } = require('../controllers/authController'); // Lấy từ authController.js

// 📌 Đăng ký tài khoản
router.post('/register', register);

// 📌 Đăng nhập
router.post('/login', login);

// 📌 Kiểm tra hồ sơ tài khoản (DonorProfile)
router.get('/profile/:userId', checkProfile);

module.exports = router;
