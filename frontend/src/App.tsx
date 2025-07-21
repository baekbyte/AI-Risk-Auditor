import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import ClassificationForm from './components/ClassificationForm';
import Classifier from './components/Classifier';
import ResultsPage from './components/ResultsPage';
import './styles/global.css';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/classifier" element={<Classifier />} />
            <Route path="/classification" element={<ClassificationForm />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
