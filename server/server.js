// server/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample route (API test)
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Hospital API mock (sẽ kết nối database sau)
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

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
