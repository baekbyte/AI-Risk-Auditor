import React, { useState } from 'react';
import { classificationService, ClassificationRequest, ClassificationResponse } from '../services/api';

const ClassificationForm: React.FC = () => {
    const [formData, setFormData] = useState<ClassificationRequest>({
        systemName: '',
        systemPurpose: '',
        // Prohibited AI Practices Assessment
        usesSubliminalTechniques: false,
        exploitsVulnerabilities: false,
        conductsSocialScoring: false,
        usesRealTimeBiometric: false,
        usesEmotionRecognition: false,
        createsFacialRecognitionDB: false,
        usesPredictivePolicing: false,
        // High-Risk AI Practices Assessment
        usedInBiometrics: false,
        usedInCriticalInfrastructure: false,
        usedInEducation: false,
        usedInEmployment: false,
        usedInEssentialServices: false,
        usedInLawEnforcement: false,
        usedInMigration: false,
        usedInJustice: false,
        isSafetyComponent: false,
        // Transparency Requirements Assessment
        interactsWithHumans: false,
        generatesContent: false,
        usesEmotionOrBiometric: false
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

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: checked
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

                <div className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Prohibited AI Practices Assessment</h3>
                        <p className="text-sm text-gray-500">Please answer the following questions about prohibited practices:</p>
                        
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="usesSubliminalTechniques"
                                    name="usesSubliminalTechniques"
                                    checked={formData.usesSubliminalTechniques}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="usesSubliminalTechniques" className="ml-2 block text-sm text-gray-900">
                                    Does your system deploy subliminal or manipulative techniques to distort the behavior or persons?
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="exploitsVulnerabilities"
                                    name="exploitsVulnerabilities"
                                    checked={formData.exploitsVulnerabilities}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="exploitsVulnerabilities" className="ml-2 block text-sm text-gray-900">
                                    Does your system exploit any vulnerabilities of specific groups based on demographics?
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="conductsSocialScoring"
                                    name="conductsSocialScoring"
                                    checked={formData.conductsSocialScoring}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="conductsSocialScoring" className="ml-2 block text-sm text-gray-900">
                                    Does your system conduct social scoring for general purposes that could lead to detrimental or unfavourable treatment?
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="usesRealTimeBiometric"
                                    name="usesRealTimeBiometric"
                                    checked={formData.usesRealTimeBiometric}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="usesRealTimeBiometric" className="ml-2 block text-sm text-gray-900">
                                    Does your system use real-time remote biometric identification in publicly accessible spaces for law enforcement?
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="usesEmotionRecognition"
                                    name="usesEmotionRecognition"
                                    checked={formData.usesEmotionRecognition}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="usesEmotionRecognition" className="ml-2 block text-sm text-gray-900">
                                    Does your system use emotion recognition in workplaces or educational institutions?
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="createsFacialRecognitionDB"
                                    name="createsFacialRecognitionDB"
                                    checked={formData.createsFacialRecognitionDB}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="createsFacialRecognitionDB" className="ml-2 block text-sm text-gray-900">
                                    Does your system create or expand facial recognition databases through untargeted scraping?
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="usesPredictivePolicing"
                                    name="usesPredictivePolicing"
                                    checked={formData.usesPredictivePolicing}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="usesPredictivePolicing" className="ml-2 block text-sm text-gray-900">
                                    Does your system use predictive policing based solely on profiling or assessment of traits?
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">High-Risk AI Practices Assessment</h3>
                        <p className="text-sm text-gray-500">Is your AI system used in any of these domains?</p>
                        
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="usedInBiometrics"
                                    name="usedInBiometrics"
                                    checked={formData.usedInBiometrics}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="usedInBiometrics" className="ml-2 block text-sm text-gray-900">
                                    Biometrics where it's intended to be used for identification, categorisation, or emotional recognition systems
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="usedInCriticalInfrastructure"
                                    name="usedInCriticalInfrastructure"
                                    checked={formData.usedInCriticalInfrastructure}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="usedInCriticalInfrastructure" className="ml-2 block text-sm text-gray-900">
                                    Critical infrastructure where it poses safety risks
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="usedInEducation"
                                    name="usedInEducation"
                                    checked={formData.usedInEducation}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="usedInEducation" className="ml-2 block text-sm text-gray-900">
                                    Educational or vocational training with significant impact on access to education
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="usedInEmployment"
                                    name="usedInEmployment"
                                    checked={formData.usedInEmployment}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="usedInEmployment" className="ml-2 block text-sm text-gray-900">
                                    Employment, worker management, or access to self-employment
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="usedInEssentialServices"
                                    name="usedInEssentialServices"
                                    checked={formData.usedInEssentialServices}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="usedInEssentialServices" className="ml-2 block text-sm text-gray-900">
                                    Access to essential private or public services (e.g., credit scoring, social benefits)
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="usedInLawEnforcement"
                                    name="usedInLawEnforcement"
                                    checked={formData.usedInLawEnforcement}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="usedInLawEnforcement" className="ml-2 block text-sm text-gray-900">
                                    Law enforcement with significant impact on people's lives
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="usedInMigration"
                                    name="usedInMigration"
                                    checked={formData.usedInMigration}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="usedInMigration" className="ml-2 block text-sm text-gray-900">
                                    Migration, asylum, or border control management
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="usedInJustice"
                                    name="usedInJustice"
                                    checked={formData.usedInJustice}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="usedInJustice" className="ml-2 block text-sm text-gray-900">
                                    Administration of justice and democratic processes
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isSafetyComponent"
                                    name="isSafetyComponent"
                                    checked={formData.isSafetyComponent}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="isSafetyComponent" className="ml-2 block text-sm text-gray-900">
                                    Is your AI system a safety component of a product or a product itself covered by the Union harmonisation legislation?
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Transparency Requirements Assessment</h3>
                        <p className="text-sm text-gray-500">Please answer the following questions about transparency requirements:</p>
                        
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="interactsWithHumans"
                                    name="interactsWithHumans"
                                    checked={formData.interactsWithHumans}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="interactsWithHumans" className="ml-2 block text-sm text-gray-900">
                                    Does your system interact with humans (e.g. chatbots)?
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="generatesContent"
                                    name="generatesContent"
                                    checked={formData.generatesContent}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="generatesContent" className="ml-2 block text-sm text-gray-900">
                                    Does your system generate or manipulate content (e.g. deepfakes)?
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="usesEmotionOrBiometric"
                                    name="usesEmotionOrBiometric"
                                    checked={formData.usesEmotionOrBiometric}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="usesEmotionOrBiometric" className="ml-2 block text-sm text-gray-900">
                                    Does your system use emotion recognition or biometric categorization?
                                </label>
                            </div>
                        </div>
                    </div>
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