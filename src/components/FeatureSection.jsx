import React from 'react';
import './FeatureSection.css';

const features = [
  {
    icon: '🩸',
    title: 'Tìm người hiến máu',
    description: 'Tìm kiếm người hiến máu theo nhóm máu và khu vực gần bạn.'
  },
  {
    icon: '🏥',
    title: 'Danh sách bệnh viện',
    description: 'Xem thông tin các bệnh viện đang cần máu và liên hệ nhanh chóng.'
  },
  {
    icon: '📝',
    title: 'Đăng ký hiến máu',
    description: 'Trở thành người hiến máu, lưu hồ sơ và theo dõi lịch sử hiến.'
  }
];

const FeatureSection = () => {
  return (
    <section className="feature-section">
      <div className="container">
        <h2 className="section-title">Đây là featureSection</h2>
        <div className="feature-grid">
          {features.map((item, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
