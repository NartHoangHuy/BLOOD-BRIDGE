import React from 'react';
import './WaysToHelp.css';

const helps = [
  {
    icon: '❤️',
    title: 'Hiến máu',
    description: 'Trở thành người hiến máu để cứu sống nhiều người đang cần gấp.'
  },
  {
    icon: '🙌',
    title: 'Tình nguyện viên',
    description: 'Tham gia tổ chức sự kiện và hỗ trợ các đợt hiến máu lưu động.'
  },
  {
    icon: '📢',
    title: 'Lan tỏa thông điệp',
    description: 'Chia sẻ thông tin về BLOOD-BRIDGE đến với cộng đồng xung quanh bạn.'
  }
];

const WaysToHelp = () => {
  return (
    <section className="ways-to-help">
      <div className="container">
        <h2 className="section-title">Cách Bạn Có Thể Giúp Đỡ</h2>
        <div className="help-grid">
          {helps.map((item, index) => (
            <div className="help-card" key={index}>
              <div className="help-icon">{item.icon}</div>
              <h3 className="help-title">{item.title}</h3>
              <p className="help-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WaysToHelp;
