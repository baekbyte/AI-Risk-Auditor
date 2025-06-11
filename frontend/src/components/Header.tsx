import React from 'react';
import '../styles/Header.css';

const logo = require('./img/logo.png');

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src={logo} alt="logo" className="header-logo" />
          <h1 className="header-title">
            AI Risk Auditor
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header; 