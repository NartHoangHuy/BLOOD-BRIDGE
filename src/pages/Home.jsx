// src/pages/Home.jsx
import React from 'react';
import HeroBanner from '../components/HeroBanner';
import AboutSection from '../components/AboutSection';
import FeatureSection from '../components/FeatureSection';
import WaysToHelp from '../components/WaysToHelp';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <HeroBanner />
      <AboutSection />
      <FeatureSection />
      <WaysToHelp />
    </div>
  );
};

export default Home;
