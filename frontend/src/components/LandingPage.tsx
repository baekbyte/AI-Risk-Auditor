import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    const handleStartClick = () => {
        navigate('/classifier');
    };

    return (
        <div className="landing-container">
            <div className="landing-content">
                <h1 className="landing-title">
                    AI Risk Auditor
                </h1>
                <p className="landing-subtitle">
                    Comprehensive AI System Analysis & Risk Assessment
                </p>
                <p className="landing-description">
                    Understand your AI system's compliance with EU AI Act requirements. 
                    Get detailed insights into risk levels, regulatory obligations, and 
                    actionable recommendations for your AI implementation.
                </p>
                <button
                    onClick={handleStartClick}
                    className="landing-button"
                >
                    Start Analysis
                </button>

                <div className="landing-features">
                    <div className="feature-card">
                        <div className="feature-icon">
                            🔍
                        </div>
                        <h3 className="feature-title">Smart Analysis</h3>
                        <p className="feature-description">
                            Advanced classification system that accurately 
                            categorizes your AI applications based on EU AI Act criteria.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            📊
                        </div>
                        <h3 className="feature-title">Risk Assessment</h3>
                        <p className="feature-description">
                            Comprehensive risk evaluation with detailed breakdown of 
                            compliance requirements and potential regulatory impacts.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage; 