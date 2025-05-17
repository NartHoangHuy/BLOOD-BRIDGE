import React from 'react';
import './Auth.css';
import { TextField, Button, Typography, Stack, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <Typography variant="h5" color="error" gutterBottom textAlign="center" fontWeight="600">
          Đăng nhập
        </Typography>

        <form className="auth-form">
          <Stack spacing={2}>
            <TextField label="Email" type="email" fullWidth required variant="outlined" size="medium" />
            <TextField label="Mật khẩu" type="password" fullWidth required variant="outlined" size="medium" />
            <div className="auth-forgot">
              <a href="#">Quên mật khẩu?</a>
            </div>
            <Button type="submit" variant="contained" color="error" size="large">
              Đăng nhập
            </Button>
          </Stack>
        </form>

        <div className="auth-google-icon" title="Đăng nhập bằng Google">
          <a href="#">
            <GoogleIcon sx={{ fontSize: 20 }} />
            <span>Tiếp tục với Google</span>
          </a>
        </div>

        <Divider sx={{ my: 2 }}>Hoặc</Divider>

        <Typography className="auth-switch" mt={3} align="center" variant="body2">
          Chưa có tài khoản? <a href="/register">Đăng ký</a>
        </Typography>
      </div>
    </div>
  );
};

export default Login;
