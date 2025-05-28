import React, { useState } from 'react';
import './Auth.css';
import { TextField, Button, Typography, Stack, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const [form, setForm] = useState({
    TenDangNhap: '',
    MatKhau: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    return response.json();
  };

  const getProfileInfo = async (userId) => {
    const response = await fetch(`http://localhost:5000/api/auth/profile/${userId}`);
    return response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser();

      if (data && data.token && data.userId) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('role', data.role);

        // 🔥 Lấy tên đầy đủ (nếu có)
        const profileData = await getProfileInfo(data.userId);
        if (profileData.hasProfile) {
          const { Ho, Ten } = profileData.profile;
          localStorage.setItem('userName', `${Ho} ${Ten}`);
        } else {
          localStorage.setItem('userName', data.fullName || 'Người dùng');
        }

        alert('Đăng nhập thành công!');

        // 🔥 Điều hướng dựa trên role
        if (data.role === 'Admin') {
          window.location.href = '/dashboard';
        } else if (data.role === 'BenhVien') {
          window.location.href = '/yeu-cau-hien-mau';
        } else if (profileData.hasProfile) {
          window.location.href = '/';
        } else {
          window.location.href = '/donor-profile';
        }
      } else {
        alert(`Lỗi: ${data.message || 'Không xác định'}`);
      }
    } catch (error) {
      console.error(error);
      alert('Lỗi kết nối server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Typography variant="h5" color="error" gutterBottom textAlign="center" fontWeight="600">
          Đăng nhập
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
            <div className="auth-forgot">
              <a href="#">Quên mật khẩu?</a>
            </div>
            <Button type="submit" variant="contained" color="error" size="large" disabled={loading}>
              {loading ? 'Đang gửi...' : 'Đăng nhập'}
            </Button>
          </Stack>
        </form>

        <Divider sx={{ my: 2 }}>Hoặc</Divider>

        <div className="auth-google-icon" title="Đăng nhập bằng Google">
          <a href="#">
            <GoogleIcon sx={{ fontSize: 20 }} />
            <span>Tiếp tục với Google</span>
          </a>
        </div>

        <Typography className="auth-switch" mt={3} align="center" variant="body2">
          Chưa có tài khoản? <a href="/register">Đăng ký</a>
        </Typography>
      </div>
    </div>
  );
};

export default Login;
