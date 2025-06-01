import React, { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  MenuItem,
  Divider
} from '@mui/material';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';

const YeuCauHienMau = () => {
  const [nhomMau, setNhomMau] = useState('');
  const [soLuong, setSoLuong] = useState(1);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/benhvien/yeu-cau-hien-mau', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ nhomMau, soLuong })
      });

      const data = await response.json();
      setMessage(data.message || 'Có lỗi xảy ra!');
    } catch (error) {
      console.error('❌ Lỗi:', error);
      setMessage('Lỗi kết nối server.');
    }
  };

  return (
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 500,
          width: '100%',
          bgcolor: '#fff',
          borderRadius: 3,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <BloodtypeIcon sx={{ fontSize: 40, color: 'error.main' }} />
        </Box>

        <Typography
          variant="h5"
          fontWeight="600"
          gutterBottom
          color="error"
        >
          Tạo Yêu Cầu Hiến Máu
        </Typography>

        <Divider sx={{ mb: 3, bgcolor: '#A41214' }} />

        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Nhóm máu cần *"
            value={nhomMau}
            onChange={(e) => setNhomMau(e.target.value)}
            fullWidth
            margin="normal"
            required
            size="small"
          >
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((blood) => (
              <MenuItem key={blood} value={blood}>
                {blood}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Số lượng cần *"
            type="number"
            value={soLuong}
            onChange={(e) => setSoLuong(e.target.value)}
            fullWidth
            margin="normal"
            required
            size="small"
            inputProps={{ min: 1 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="error"
            fullWidth
            sx={{ mt: 2, fontWeight: '600' }}
          >
            Gửi Yêu Cầu
          </Button>
        </form>

        {message && (
          <Typography
            variant="body2"
            color={message.includes('thành công') ? 'green' : 'error'}
            sx={{ mt: 2 }}
          >
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default YeuCauHienMau;
