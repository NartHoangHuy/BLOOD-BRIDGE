import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, TextField, Typography, Paper, MenuItem } from '@mui/material';
import axios from 'axios';
import './DonorProfile.css';

const DonorProfile = () => {
  const imageInputRef = useRef(null);
  const linkFileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    Ho: '',
    Ten: '',
    NgaySinh: '',
    GioiTinh: 1,
    SDT: '',
    MaTaiKhoan: ''
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [linkFileName, setLinkFileName] = useState('');

  const formatDateForMySQL = (isoDate) => {
    if (!isoDate) return '';
    return isoDate.split('T')[0];
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setFormData((prev) => ({
        ...prev,
        MaTaiKhoan: userId
      }));

      const fetchProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/profile/${userId}`, {
            withCredentials: true
          });
          if (response.data.hasProfile) {
            // ✅ Đã có hồ sơ ➜ load dữ liệu lên form
            setFormData((prev) => ({
              ...prev,
              ...response.data.profile
            }));
            if (response.data.profile.HinhAnh) {
              setImagePreview(`http://localhost:5000/uploads/${response.data.profile.HinhAnh}`);
            }
            if (response.data.profile.LinkThongTin) {
              setLinkFileName(response.data.profile.LinkThongTin);
            }
          } else {
            console.log('Chưa có hồ sơ ➜ Tạo mới');
          }
        } catch (error) {
          console.error('❌ Lỗi khi tải profile:', error);
        }
      };

      fetchProfile();
    } else {
      window.location.href = '/login';
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleLinkFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLinkFileName(file.name);
    }
  };

  const handleUploadImage = () => {
    imageInputRef.current.click();
  };

  const handleUploadLink = () => {
    linkFileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.MaTaiKhoan) {
      alert('Lỗi: MaTaiKhoan không tồn tại!');
      return;
    }

    console.log('🟢 Dữ liệu chuẩn bị gửi:', formData);

    const data = new FormData();
    data.append('MaTaiKhoan', formData.MaTaiKhoan);
    data.append('Ho', formData.Ho);
    data.append('Ten', formData.Ten);
    data.append('NgaySinh', formatDateForMySQL(formData.NgaySinh));
    data.append('GioiTinh', parseInt(formData.GioiTinh, 10));
    data.append('SDT', formData.SDT);

    if (imageInputRef.current.files[0]) {
      data.append('Image', imageInputRef.current.files[0]);
    }
    if (linkFileInputRef.current.files[0]) {
      data.append('LinkFile', linkFileInputRef.current.files[0]);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/profile/save', data, {
        withCredentials: true
      });
      alert(response.data.message || 'Cập nhật thành công!');
      window.location.href = '/';
    } catch (error) {
      console.error('❌ Lỗi khi gửi request:', error);
      alert(error.response?.data?.message || 'Lỗi kết nối server!');
    }
  };

  return (
    <Box className="donor-profile-page">
      <Paper elevation={3} className="donor-profile-card">
        {/* Ảnh preview */}
        <Box className="donor-profile-image-box">
          <Box
            sx={{
              width: '100%',
              height: 200,
              border: '1px solid #ccc',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
              overflow: 'hidden'
            }}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <Typography color="textSecondary">IMAGES</Typography>
            )}
          </Box>
          <input
            type="file"
            ref={imageInputRef}
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <Button variant="outlined" fullWidth onClick={handleUploadImage}>
            UPLOAD IMAGE
          </Button>
        </Box>

        {/* Form thông tin */}
        <Box component="form" onSubmit={handleSubmit} className="donor-profile-info">
          <TextField
            label="Họ"
            name="Ho"
            value={formData.Ho}
            onChange={handleChange}
            size="small"
            fullWidth
          />
          <TextField
            label="Tên"
            name="Ten"
            value={formData.Ten}
            onChange={handleChange}
            size="small"
            fullWidth
          />
          <TextField
            label="Ngày Sinh"
            name="NgaySinh"
            type="date"
            value={formatDateForMySQL(formData.NgaySinh)}
            onChange={handleChange}
            size="small"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Giới Tính"
            name="GioiTinh"
            select
            value={formData.GioiTinh}
            onChange={handleChange}
            size="small"
            fullWidth
          >
            <MenuItem value={1}>Nam</MenuItem>
            <MenuItem value={2}>Nữ</MenuItem>
            <MenuItem value={0}>Khác</MenuItem>
          </TextField>
          <TextField
            label="SĐT"
            name="SDT"
            value={formData.SDT}
            onChange={handleChange}
            size="small"
            fullWidth
          />

          <input
            type="file"
            ref={linkFileInputRef}
            style={{ display: 'none' }}
            onChange={handleLinkFileChange}
          />
          <Button variant="outlined" onClick={handleUploadLink}>
            UPLOAD LINK FILE
          </Button>
          {linkFileName && (
            <Typography variant="body2" color="textSecondary" mt={1}>
              File đã chọn: {linkFileName}
            </Typography>
          )}

          <Button variant="contained" color="error" type="submit">
            CẬP NHẬT
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default DonorProfile;
