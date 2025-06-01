import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

const drawerWidth = 220;

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardMessage, setDashboardMessage] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'Admin') {
      navigate('/');
      return;
    }

    const token = localStorage.getItem('token');

    const fetchDashboard = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setDashboardMessage(data.message);
      } catch (error) {
        console.error('❌ Lỗi khi tải dashboard:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setUsers(data.users || []);
      } catch (error) {
        console.error('❌ Lỗi khi tải danh sách user:', error);
      }
    };

    fetchDashboard();
    fetchUsers();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', bgcolor: '#A41214', color: '#fff' }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: 'error.main', mr: 1 }}>
            <DashboardIcon />
          </Avatar>
          <Typography variant="h6" fontWeight="600">
            Admin Panel
          </Typography>
        </Box>
        <Divider sx={{ bgcolor: '#fff' }} />
        <List>
          <ListItem button>
            <ListItemIcon sx={{ color: '#fff' }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemIcon sx={{ color: '#fff' }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="User List" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon sx={{ color: '#fff' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Đăng xuất" />
          </ListItem>
        </List>
      </Drawer>

      {/* Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" color="error" fontWeight="700" gutterBottom>
          Admin Dashboard
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" fontWeight="600" gutterBottom>
            Thông tin hệ thống
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {dashboardMessage || 'Đang tải...'}
          </Typography>
        </Paper>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="600" gutterBottom>
            Danh sách tài khoản
          </Typography>
          {users.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell>STT</TableCell>
                    <TableCell>Tên đăng nhập</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user, index) => (
                    <TableRow key={user.MaTaiKhoan}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{user.TenDangNhap}</TableCell>
                      <TableCell>{user.Email}</TableCell>
                      <TableCell>{user.LoaiTaiKhoan}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body2" color="textSecondary">
              Không có tài khoản nào.
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
