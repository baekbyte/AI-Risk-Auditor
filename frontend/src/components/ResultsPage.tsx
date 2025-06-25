import React, { useEffect, useState } from 'react';

interface ClassificationResponse {
  riskCategory: string;
  isProhibited: boolean;
  recommendations: string[];
}

const ResultsPage: React.FC = () => {
  const [result, setResult] = useState<ClassificationResponse | null>(null);

  useEffect(() => {
    const storedResult = localStorage.getItem('classificationResult');
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Classification Results</h2>
      {result ? (
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
      ) : (
        <div className="p-4 bg-gray-100 rounded">No results found. Please complete an assessment first.</div>
      )}
    </div>
  );
};

export default ResultsPage; 