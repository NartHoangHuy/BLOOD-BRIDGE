import React from 'react';
import './Auth.css';
import { TextField, Button, Typography, Stack, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const Register = () => {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <Typography variant="h5" color="error" gutterBottom textAlign="center" fontWeight="600">
          Đăng ký
        </Typography>

        <form className="auth-form">
          <Stack spacing={2}>
            <TextField label="Họ tên" type="text" fullWidth required variant="outlined" size="medium" />
            <TextField label="Email" type="email" fullWidth required variant="outlined" size="medium" />
            <TextField label="Mật khẩu" type="password" fullWidth required variant="outlined" size="medium" />
            <TextField label="Xác nhận mật khẩu" type="password" fullWidth required variant="outlined" size="medium" />
            <Button type="submit" variant="contained" color="error" size="large">
              Tạo tài khoản
            </Button>
          </Stack>
        </form>

        <div className="auth-google-icon" title="Đăng ký bằng Google">
          <a href="#">
            <GoogleIcon sx={{ fontSize: 20 }} />
            <span>Tiếp tục với Google</span>
          </a>
        </div>

        <Divider sx={{ my: 2 }}>Hoặc</Divider>

        <Typography className="auth-switch" mt={3} align="center" variant="body2">
          Đã có tài khoản? <a href="/login">Đăng nhập</a>
        </Typography>
      </div>
    </div>
  );
};

export default Register;