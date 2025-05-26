const express = require('express');
const router = express.Router();
const { getProfile, saveDonorProfile } = require('../controllers/profileController');
const upload = require('../middleware/multer');

// 🟢 Lấy hồ sơ
router.get('/:userId', getProfile);

// 🟢 Cập nhật / tạo hồ sơ (dùng multer)
router.post('/save', upload, saveDonorProfile);

module.exports = router;
