import React, { useEffect, useState } from 'react';
import { classificationService, ClassificationResponse as APIClassificationResponse } from '../services/api';

interface ClassificationResponse {
  riskCategory: string;
  isProhibited: boolean;
  recommendations: string[];
}

const ResultsPage: React.FC = () => {
  const [result, setResult] = useState<ClassificationResponse | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const storedResult = localStorage.getItem('classificationResult');
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
  }, []);

  const handleDownload = async () => {
    if (!result) return;
    setDownloading(true);
    try {
      // Add systemName and systemPurpose as empty strings for compatibility
      const apiResult: APIClassificationResponse = {
        systemName: '',
        systemPurpose: '',
        ...result,
      };
      const blob = await classificationService.downloadResultsFile(apiResult, 'Audit_Results.txt');
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

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Classification Results</h2>
      {result ? (
        <>
          <div className="p-6 bg-white shadow rounded-lg space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Risk Category</p>
              <p className="mt-1 text-sm text-gray-900">{result.riskCategory}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <p className="mt-1 text-sm text-gray-900">
                {result.isProhibited ? 'Prohibited' : 'Allowed'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Recommendations</p>
              <ul className="mt-1 list-disc list-inside text-sm text-gray-900">
                {result.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
          <button
            className="mt-6 btn btn-primary"
            onClick={handleDownload}
            disabled={downloading}
          >
            {downloading ? 'Downloading...' : 'Download Results'}
          </button>
        </>
      ) : (
        <div className="p-4 bg-gray-100 rounded">No results found. Please complete an assessment first.</div>
      )}
    </div>
  );
};

export default ResultsPage; 