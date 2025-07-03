import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const logo = require('./img/logo.png');

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src={logo} alt="logo" className="header-logo" />
          <h1 className="header-title">
            AI Risk Auditor
          </h1>
        </div>
        
        <nav className="header-nav">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/classifier" 
            className={`nav-link ${location.pathname === '/classifier' ? 'active' : ''}`}
          >
            Classifier
          </Link>
          <Link 
            to="/results" 
            className={`nav-link ${location.pathname === '/results' ? 'active' : ''}`}
          >
            Results
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 