import React from 'react';
import { useNavigate } from 'react-router-dom';

const Classifier: React.FC = () => {
  const navigate = useNavigate();

  const handleAuditClick = () => {
    navigate('/classification');
  };

  return (
    <div>
      <h1>Classifier</h1>
      <button onClick={handleAuditClick}>Audit</button>
    </div>
  );
};

export default Classifier; 