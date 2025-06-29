import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { classificationService, ClassificationRequest } from '../services/api';
import '../styles/Classifier.css';

const Classifier: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ClassificationRequest>({
    systemName: '',
    systemPurpose: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Store the initial data in localStorage
      localStorage.setItem('initialClassificationData', JSON.stringify(formData));
      // Navigate to the classification form
      navigate('/classification');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="classifier-container">
      <div className="classifier-content">
        <div className="classifier-header">
          <h1 className="classifier-title">AI System Assessment</h1>
          <p className="classifier-subtitle">
            Let's start by understanding your AI system. Provide basic information to begin the classification process.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="classifier-form">
          <div className="form-group">
            <label htmlFor="systemName" className="form-label">
              System Name
            </label>
            <input
              type="text"
              id="systemName"
              name="systemName"
              value={formData.systemName}
              onChange={handleInputChange}
              required
              className="form-input"
              placeholder="Enter the name of your AI system"
            />
          </div>

          <div className="form-group">
            <label htmlFor="systemPurpose" className="form-label">
              System Purpose
            </label>
            <textarea
              id="systemPurpose"
              name="systemPurpose"
              value={formData.systemPurpose}
              onChange={handleInputChange}
              required
              className="form-textarea"
              placeholder="Describe the purpose and functionality of your AI system..."
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="classifier-button"
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Processing...
              </>
            ) : (
              'Continue to Assessment'
            )}
          </button>
        </form>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Classifier; 