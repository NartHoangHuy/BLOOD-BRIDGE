import React, { useState } from 'react';
import { Typography, Box, Paper, TextField, Button, MenuItem } from '@mui/material';

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
        body: JSON.stringify({
          nhomMau,
          soLuong
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message || 'Có lỗi xảy ra!');
      }
    } catch (error) {
      console.error('❌ Lỗi:', error);
      setMessage('Lỗi kết nối server.');
    }
  };

  return (
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 600, width: '100%' }}>
        <Typography variant="h5" color="error" gutterBottom textAlign="center" fontWeight="600">
          Tạo Yêu Cầu Hiến Máu
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Nhóm máu cần"
            value={nhomMau}
            onChange={(e) => setNhomMau(e.target.value)}
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="A+">A+</MenuItem>
            <MenuItem value="A-">A-</MenuItem>
            <MenuItem value="B+">B+</MenuItem>
            <MenuItem value="B-">B-</MenuItem>
            <MenuItem value="AB+">AB+</MenuItem>
            <MenuItem value="AB-">AB-</MenuItem>
            <MenuItem value="O+">O+</MenuItem>
            <MenuItem value="O-">O-</MenuItem>
          </TextField>

          <TextField
            label="Số lượng cần"
            type="number"
            value={soLuong}
            onChange={(e) => setSoLuong(e.target.value)}
            fullWidth
            margin="normal"
            required
            inputProps={{ min: 1 }}
          />

          <Button type="submit" variant="contained" color="error" fullWidth sx={{ mt: 2 }}>
            Gửi Yêu Cầu
          </Button>
        </form>

        {message && (
          <Typography variant="body2" color="green" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default YeuCauHienMau;
