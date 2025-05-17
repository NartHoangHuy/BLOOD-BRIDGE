import React from 'react';
import './WaysToHelp.css';

const helps = [
  {
    title: 'Hiến máu',
    description: 'Trở thành người hiến máu để cứu sống nhiều người đang cần gấp.',
  },
  {
    title: 'Tình nguyện viên',
    description: 'Tham gia tổ chức sự kiện và hỗ trợ các đợt hiến máu lưu động.',
  },
  {
    title: 'Lan tỏa thông điệp',
    description: 'Chia sẻ thông tin về BLOOD-BRIDGE đến với cộng đồng xung quanh bạn.',
  },
];

const WaysToHelp = () => {
  return (
    <section className="ways-to-help">
      <div className="container">
        <h2>Đây là WaysToHelp</h2>
        <div className="help-cards">
          {helps.map((item, index) => (
            <div className="help-card" key={index}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WaysToHelp;