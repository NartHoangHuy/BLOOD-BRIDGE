import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="layout-main container">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;