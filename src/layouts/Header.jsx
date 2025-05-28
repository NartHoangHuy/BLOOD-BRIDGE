import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { logout } from '../utils/AuthUtils';

const Header = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem('userId');
    setUserId(id);

    const handleStorageChange = () => {
      setUserId(localStorage.getItem('userId'));
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setUserId(null);
    navigate('/login');
  };

  return (
    <AppBar position="static" color="error" elevation={2}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            BLOOD-BRIDGE
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center">
            <Button component={Link} to="/" color="inherit">Trang chủ</Button>
            <Button component={Link} to="/about" color="inherit">Giới thiệu</Button>

            {userId ? (
              <>
                <Button component={Link} to="/donor-profile" color="inherit">Xem Hồ Sơ</Button>
                <Button onClick={handleLogout} color="inherit">Đăng Xuất</Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/register" color="inherit">Đăng Ký</Button>
                <Button component={Link} to="/login" color="inherit">Đăng Nhập</Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
