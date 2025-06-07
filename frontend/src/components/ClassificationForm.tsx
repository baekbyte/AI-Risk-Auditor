import React, { useState } from 'react';
import { classificationService, ClassificationRequest, ClassificationResponse } from '../services/api';

const ClassificationForm: React.FC = () => {
    const [formData, setFormData] = useState<ClassificationRequest>({
        systemName: '',
        systemPurpose: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<ClassificationResponse | null>(null);

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
        setResult(null);

        try {
            const response = await classificationService.classify(formData);
            setResult(response);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred during classification');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="systemName" className="block text-sm font-medium text-gray-700">
                        System Name
                    </label>
                    <input
                        type="text"
                        id="systemName"
                        name="systemName"
                        value={formData.systemName}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Enter the name of your AI system"
                    />
                </div>

                <div>
                    <label htmlFor="systemPurpose" className="block text-sm font-medium text-gray-700">
                        System Purpose
                    </label>
                    <textarea
                        id="systemPurpose"
                        name="systemPurpose"
                        value={formData.systemPurpose}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Describe the purpose of your AI system"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {isLoading ? 'Classifying...' : 'Classify System'}
                </button>
            </form>

            {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            {result && (
                <div className="mt-6 p-6 bg-white shadow rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Classification Results</h3>
                    <div className="space-y-4">
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
                                {result.recommendations.map((rec, index) => (
                                    <li key={index}>{rec}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClassificationForm; 