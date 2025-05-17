// src/pages/HospitalProfile.jsx
import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Divider,
  Button
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

const HospitalProfile = () => {
  // Mock thông tin bệnh viện (sẽ thay bằng dữ liệu thực sau)
  const hospital = {
    name: 'Bệnh viện Đa khoa Trung ương',
    address: '123 Nguyễn Văn Cừ, Quận 5, TP.HCM',
    phone: '028 1234 5678',
    description: 'Bệnh viện Đa khoa Trung ương là đơn vị y tế tuyến đầu với đội ngũ y bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại.'
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <LocalHospitalIcon color="error" fontSize="large" />
          <Typography variant="h5" fontWeight="bold">
            {hospital.name}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <LocationOnIcon color="action" />
          <Typography>{hospital.address}</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={3}>
          <PhoneIcon color="action" />
          <Typography>{hospital.phone}</Typography>
        </Box>

        <Typography variant="body1" paragraph>
          {hospital.description}
        </Typography>

        <Button variant="outlined" color="error">
          Chỉnh sửa thông tin
        </Button>
      </Paper>
    </Container>
  );
};

export default HospitalProfile;
