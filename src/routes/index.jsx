import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DonorSearch from '../pages/DonorSearch';
import DonorProfile from '../pages/DonorProfile';
import HospitalProfile from '../pages/HospitalProfile';
import UserProfile from '../pages/UserProfile';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Dashboard from '../pages/Dashboard';
import YeuCauHienMau from '../pages/YeuCauHienMau'; // ✅ Thêm trang yêu cầu hiến máu

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/donor-search" element={<DonorSearch />} />
    <Route path="/donor/:id" element={<DonorProfile />} />
    <Route path="/hospital/:id" element={<HospitalProfile />} />
    <Route path="/profile" element={<UserProfile />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/about" element={<About />} />
    <Route path="/donor-profile" element={<DonorProfile />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/yeu-cau-hien-mau" element={<YeuCauHienMau />} /> {/* ✅ Route mới */}
  </Routes>
);

export default AppRoutes;
