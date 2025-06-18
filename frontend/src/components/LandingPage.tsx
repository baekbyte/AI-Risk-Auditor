import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    const handleStartClick = () => {
        navigate('/classifier');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center space-y-8 p-8">
                <h1 className="text-4xl font-bold text-gray-900">
                    Welcome to the AI Risk Auditor
                </h1>
                <p className="text-xl text-gray-600">
                    A tool to understand your AI system better
                </p>
                <button
                    onClick={handleStartClick}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-lg font-medium"
                >
                    Start
                </button>
            </div>
        </div>
    );
};

export default LandingPage; 