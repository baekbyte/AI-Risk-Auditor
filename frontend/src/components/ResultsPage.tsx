import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { classificationService, ClassificationResponse } from '../services/api';
import '../styles/ResultsPage.css';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<ClassificationResponse | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const storedResult = localStorage.getItem('classificationResult');
    if (storedResult) {
      const parsedResult = JSON.parse(storedResult);
      console.log('Stored result:', parsedResult);
      console.log('isProhibited value:', parsedResult.isProhibited);
      console.log('riskCategory:', parsedResult.riskCategory);
      setResult(parsedResult);
    }
  }, []);

  const handleDownload = async () => {
    if (!result) return;
    setDownloading(true);
    try {
      const blob = await classificationService.downloadResultsFile(result, 'Audit_Results.txt');
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Audit_Results.txt';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      alert('Failed to download results file.');
    } finally {
      setDownloading(false);
    }
  };

  const handleNewAssessment = () => {
    navigate('/classifier');
  };

  const getRiskCategoryClass = (category: string) => {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('prohibited')) return 'prohibited';
    if (lowerCategory.includes('high')) return 'high-risk';
    if (lowerCategory.includes('medium')) return 'medium-risk';
    if (lowerCategory.includes('low')) return 'low-risk';
    return 'minimal-risk';
  };

  const getStatusBadgeClass = (isProhibited: boolean) => {
    return isProhibited ? 'prohibited' : 'allowed';
  };

  return (
    <div className="results-container">
      <div className="results-content">
        <div className="results-header">
          <h1 className="results-title">Assessment Results</h1>
          <p className="results-subtitle">
            Your AI system has been analyzed for EU AI Act compliance
          </p>
        </div>

        {result ? (
          <>
            <div className="results-card">
              <div className="results-section">
                <h2 className="results-section-title">Risk Category</h2>
                <div className={`risk-category ${getRiskCategoryClass(result.riskCategory)}`}>
                  {result.riskCategory}
                </div>
              </div>

              <div className="results-section">
                <h2 className="results-section-title">Compliance Status</h2>
                <div className={`status-badge ${getStatusBadgeClass(result.isProhibited)}`}>
                  {(() => {
                    console.log('Rendering status badge, isProhibited:', result.isProhibited);
                    return result.isProhibited ? 'Prohibited' : 'Allowed';
                  })()}
                </div>
              </div>

              <div className="results-section">
                <h2 className="results-section-title">Recommendations</h2>
                <ul className="recommendations-list">
                  {result.recommendations.map((recommendation, idx) => (
                    <li key={idx} className="recommendation-item">
                      <div className="recommendation-icon">
                        {idx + 1}
                      </div>
                      <div className="recommendation-text">
                        {recommendation}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="results-actions">
              <button
                className="results-button results-button-secondary"
                onClick={handleNewAssessment}
              >
                New Assessment
              </button>
              <button
                className="results-button"
                onClick={handleDownload}
                disabled={downloading}
              >
                {downloading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Downloading...
                  </>
                ) : (
                  'Download Results'
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">📋</div>
            <h2 className="no-results-title">No Results Found</h2>
            <p className="no-results-text">
              Please complete an assessment first to view your results.
            </p>
            <div className="results-actions">
              <button
                className="results-button"
                onClick={handleNewAssessment}
              >
                Start Assessment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage; 