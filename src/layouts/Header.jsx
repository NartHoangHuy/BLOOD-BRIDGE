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
  const [role, setRole] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('userId');
    const userRole = localStorage.getItem('role');
    const name = localStorage.getItem('userName');

    setUserId(id);
    setRole(userRole);
    setUserName(name);

    const handleStorageChange = () => {
      setUserId(localStorage.getItem('userId'));
      setRole(localStorage.getItem('role'));
      setUserName(localStorage.getItem('userName'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setUserId(null);
    setRole('');
    setUserName('');
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
                <Typography variant="body2" color="inherit">
                  Xin chào: {userName || 'Người dùng'}
                </Typography>

                {role === 'Admin' && (
                  <Button component={Link} to="/dashboard" color="inherit">Dashboard</Button>
                )}

                {role === 'BenhVien' && (
                  <>
                    <Button component={Link} to="/yeu-cau-hien-mau" color="inherit">Yêu Cầu Hiến Máu</Button>
                    <Button component={Link} to="/donor-search" color="inherit">Tìm Người Hiến Máu</Button> {/* ✅ Thêm nút này */}
                  </>
                )}

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
