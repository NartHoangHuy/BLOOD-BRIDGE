import React, { useState } from 'react';
import './Auth.css';
import { TextField, Button, Typography, Stack, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const Register = () => {
  const [form, setForm] = useState({
    TenDangNhap: '',
    Email: '',
    MatKhau: '',
    XacNhanLaiMatKhau: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.MatKhau !== form.XacNhanLaiMatKhau) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }

    setLoading(true);

    // Dùng AbortController để tránh lỗi treo request
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000); // 7s timeout

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          TenDangNhap: form.TenDangNhap,
          Email: form.Email,
          MatKhau: form.MatKhau
        }),
        signal: controller.signal
      });

      clearTimeout(timeout);

      const data = await response.json();

      if (response.ok) {
        alert('Đăng ký thành công!');
        window.location.href = '/login';
      } else {
        alert(`Lỗi: ${data.message}`);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        alert('Kết nối server quá lâu, vui lòng thử lại!');
      } else {
        console.error(error);
        alert('Lỗi kết nối server');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Typography variant="h5" color="error" gutterBottom textAlign="center" fontWeight="600">
          Đăng ký
        </Typography>

        <form className="auth-form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Tên đăng nhập"
              name="TenDangNhap"
              value={form.TenDangNhap}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              size="medium"
            />
            <TextField
              label="Email"
              name="Email"
              type="email"
              value={form.Email}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              size="medium"
            />
            <TextField
              label="Mật khẩu"
              name="MatKhau"
              type="password"
              value={form.MatKhau}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              size="medium"
            />
            <TextField
              label="Xác nhận lại mật khẩu"
              name="XacNhanLaiMatKhau"
              type="password"
              value={form.XacNhanLaiMatKhau}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              size="medium"
            />
            <Button type="submit" variant="contained" color="error" size="large" disabled={loading}>
              {loading ? 'Đang gửi...' : 'Tạo tài khoản'}
            </Button>
          </Stack>
        </form>

        <Divider sx={{ my: 2 }}>Hoặc</Divider>

        <div className="auth-google-icon" title="Đăng ký bằng Google">
          <a href="#">
            <GoogleIcon sx={{ fontSize: 20 }} />
            <span>Tiếp tục với Google</span>
          </a>
        </div>

        <Typography className="auth-switch" mt={3} align="center" variant="body2">
          Đã có tài khoản? <a href="/login">Đăng nhập</a>
        </Typography>
      </div>
    </div>
  );
};

export default Register;
