import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import ClassificationForm from './components/ClassificationForm';
import Classifier from './components/Classifier';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/landing" replace />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/classifier" element={<Classifier />} />
            <Route path="/classification" element={<ClassificationForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
