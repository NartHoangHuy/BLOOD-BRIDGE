// src/pages/DonorSearch.jsx
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Container,
  Card,
  CardContent,
  Slider,
  Box
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import { GoogleMap, Marker, InfoWindow, LoadScript } from '@react-google-maps/api';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const mapContainerStyle = { width: '100%', height: '400px' };

const DonorSearch = () => {
  const [filters, setFilters] = useState({ bloodGroup: '', address: '', radius: 5 });
  const [donors] = useState([]); // sẽ cập nhật từ API khi backend sẵn sàng
  const [results, setResults] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [hospitalLocation, setHospitalLocation] = useState(null);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleRadiusChange = (e, value) => {
    setFilters({ ...filters, radius: value });
  };

  const geocodeAddress = async (address) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=YOUR_API_KEY`
    );
    const data = await response.json();
    if (data.status === 'OK') {
      return data.results[0].geometry.location;
    } else {
      throw new Error('Không tìm được vị trí từ địa chỉ');
    }
  };

  const handleSearch = async () => {
    try {
      const location = await geocodeAddress(filters.address);
      setHospitalLocation(location);

      const toRad = (value) => (value * Math.PI) / 180;

      const mockDonors = [
        {
          id: 1,
          name: 'Nguyễn Văn A',
          bloodGroup: 'O+',
          location: 'Q.5, TP.HCM',
          lat: 10.762622,
          lng: 106.660172
        },
        {
          id: 2,
          name: 'Lê Thị B',
          bloodGroup: 'A-',
          location: 'Q.Đống Đa, Hà Nội',
          lat: 21.002843,
          lng: 105.841435
        },
        {
          id: 3,
          name: 'Trần Văn C',
          bloodGroup: 'A-',
          location: 'Q.1, TP.HCM',
          lat: 10.775659,
          lng: 106.700424
        }
      ];

      const filtered = mockDonors.filter((donor) => {
        const R = 6371;
        const dLat = toRad(donor.lat - location.lat);
        const dLng = toRad(donor.lng - location.lng);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(location.lat)) *
            Math.cos(toRad(donor.lat)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        return (
          (!filters.bloodGroup || donor.bloodGroup === filters.bloodGroup) &&
          distance <= filters.radius
        );
      });

      setDonors(mockDonors);
      setResults(filtered);
      setActiveMarker(null);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleMarkerClick = (id) => {
    setActiveMarker(id);
  };

  const defaultCenter = hospitalLocation || { lat: 10.762622, lng: 106.660172 };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" color="error" gutterBottom textAlign="center">
        Tìm người hiến máu theo bán kính
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center" mb={2}>
        * Chức năng này chỉ dành cho nhân viên bệnh viện
      </Typography>

      <Grid container spacing={2} justifyContent="center" mb={4}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Địa chỉ bệnh viện"
            name="address"
            fullWidth
            value={filters.address}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Nhóm máu"
            name="bloodGroup"
            select
            fullWidth
            value={filters.bloodGroup}
            onChange={handleChange}
          >
            {bloodGroups.map((group) => (
              <MenuItem key={group} value={group}>{group}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography gutterBottom>Bán kính tìm kiếm (km)</Typography>
          <Slider
            value={filters.radius}
            onChange={handleRadiusChange}
            aria-labelledby="radius-slider"
            valueLabelDisplay="auto"
            step={1}
            min={1}
            max={50}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={1}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            sx={{ height: '100%' }}
            onClick={handleSearch}
          >
            Tìm
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {results.map((donor) => (
          <Grid item xs={12} md={6} lg={4} key={donor.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {donor.name}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <BloodtypeIcon color="error" />
                  <Typography>Nhóm máu: {donor.bloodGroup}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <LocationOnIcon color="action" />
                  <Typography>{donor.location}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={4}>
        <LoadScript googleMapsApiKey="AIzaSyAKZPgcxnmYmuDDoBC9tUS9XJuW7YpmURk">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={defaultCenter}
            zoom={10}
          >
            {hospitalLocation && (
              <Marker
                position={hospitalLocation}
                icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/hospitals.png' }}
              />
            )}

            {results.map((donor) => (
              <Marker
                key={donor.id}
                position={{ lat: donor.lat, lng: donor.lng }}
                onClick={() => handleMarkerClick(donor.id)}
              >
                {activeMarker === donor.id && (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">{donor.name}</Typography>
                      <Typography variant="body2">Nhóm máu: {donor.bloodGroup}</Typography>
                      <Typography variant="body2">{donor.location}</Typography>
                    </Box>
                  </InfoWindow>
                )}
              </Marker>
            ))}
          </GoogleMap>
        </LoadScript>
      </Box>
    </Container>
  );
};

export default DonorSearch;
