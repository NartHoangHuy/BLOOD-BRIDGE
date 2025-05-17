// src/layouts/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="layout-footer">
      <div className="container">
        <div className="footer-columns">
          <div className="footer-column">
            <h4>BLOOD-BRIDGE</h4>
            <p>Kết nối người hiến máu và bệnh viện trên toàn quốc để cứu sống hàng ngàn người mỗi ngày.</p>
          </div>

          <div className="footer-column">
            <h4>Liên hệ</h4>
            <p>Email: support@bloodbridge.org</p>
            <p>Hotline: 1900 999 888</p>
            <p>Địa chỉ: 123 Nguyễn Văn Máu, Q.1, TP.HCM</p>
          </div>

          <div className="footer-column">
            <h4>Slogan</h4>
            <p>&quot;Giọt máu cho đi – Cuộc đời ở lại&quot;</p>
            <p>&quot;Hiến máu hôm nay – Cứu người mai sau&quot;</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 BLOOD-BRIDGE. Kết nối sự sống - Cứu người bằng hành động.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;