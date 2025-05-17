import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

const Header = () => {
  return (
    <AppBar position="static" color="error" elevation={2}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            BLOOD-BRIDGE
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button component={Link} to="/" color="inherit">Trang chủ</Button>
            <Button component={Link} to="/donor-search" color="inherit">Tìm người hiến máu</Button>
            <Button component={Link} to="/register" color="inherit">Đăng ký</Button>
            <Button component={Link} to="/login" color="inherit">Đăng nhập</Button>
            <Button component={Link} to="/about" color="inherit">Giới thiệu</Button>
            <Button component={Link} to="/contact" color="inherit">Liên hệ</Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
