import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={{
      backgroundColor: 'var(--white)',
      padding: '1.5rem 0',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{
          color: 'var(--primary-blue)',
          fontSize: '1.8rem',
          fontWeight: 600,
          margin: 0
        }}>
          AI Use Case Classifier
        </h1>
      </div>
    </header>
  );
};

export default Header; 