import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Kiểm tra role (chỉ Admin mới vào được)
    const role = localStorage.getItem('role');
    if (role !== 'Admin') {
      navigate('/');
      return;
    }

    const token = localStorage.getItem('token');

    // Gọi API dashboard (demo)
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setDashboardData(data.message);
      } catch (error) {
        console.error('❌ Lỗi khi tải dashboard:', error);
      }
    };

    // Gọi API danh sách user
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

    fetchDashboardData();
    fetchUsers();
  }, [navigate]);

  return (
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 800, width: '100%' }}>
        <Typography variant="h5" color="error" gutterBottom textAlign="center" fontWeight="600">
          Admin Dashboard
        </Typography>

        {dashboardData ? (
          <Typography variant="body1" textAlign="center" sx={{ mt: 2 }}>
            {dashboardData}
          </Typography>
        ) : (
          <Typography variant="body2" color="textSecondary" textAlign="center">
            Đang tải dữ liệu dashboard...
          </Typography>
        )}

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Danh sách tài khoản:
          </Typography>
          {users.length > 0 ? (
            <List>
              {users.map((user) => (
                <ListItem key={user.MaTaiKhoan}>
                  <ListItemText
                    primary={user.TenDangNhap}
                    secondary={`${user.Email} - Role: ${user.LoaiTaiKhoan}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="textSecondary">
              Không có user nào.
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;
