import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { classificationService, ClassificationRequest } from '../services/api';

const PAGES = ['prohibited', 'highrisk', 'transparency'] as const;
type Page = typeof PAGES[number];

const initialFormData: ClassificationRequest = {
  systemName: '',
  systemPurpose: '',
  usesSubliminalTechniques: false,
  exploitsVulnerabilities: false,
  conductsSocialScoring: false,
  usesRealTimeBiometric: false,
  usesEmotionRecognition: false,
  createsFacialRecognitionDB: false,
  usesPredictivePolicing: false,
  usedInBiometrics: false,
  usedInCriticalInfrastructure: false,
  usedInEducation: false,
  usedInEmployment: false,
  usedInEssentialServices: false,
  usedInLawEnforcement: false,
  usedInMigration: false,
  usedInJustice: false,
  isSafetyComponent: false,
  interactsWithHumans: false,
  generatesContent: false,
  usesEmotionOrBiometric: false
};

const ClassificationForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ClassificationRequest>(initialFormData);
  const [page, setPage] = useState<Page>('prohibited');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('classificationFormData');
    let loadedFormData = saved ? JSON.parse(saved) : { ...initialFormData };
    // Always merge in systemName and systemPurpose from initialClassificationData if present
    const initialData = localStorage.getItem('initialClassificationData');
    if (initialData) {
      const parsed = JSON.parse(initialData);
      loadedFormData = {
        ...loadedFormData,
        systemName: parsed.systemName || loadedFormData.systemName,
        systemPurpose: parsed.systemPurpose || loadedFormData.systemPurpose,
      };
    }
    setFormData(loadedFormData);
    const savedPage = localStorage.getItem('classificationFormPage');
    if (savedPage && PAGES.includes(savedPage as Page)) {
      setPage(savedPage as Page);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('classificationFormData', JSON.stringify(formData));
  }, [formData]);
  useEffect(() => {
    localStorage.setItem('classificationFormPage', page);
  }, [page]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleBack = () => {
    const idx = PAGES.indexOf(page);
    if (idx > 0) {
      setPage(PAGES[idx - 1]);
    } else {
      navigate('/classifier');
    }
  };
  const handleNext = () => {
    const idx = PAGES.indexOf(page);
    if (idx < PAGES.length - 1) setPage(PAGES[idx + 1]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const result = await classificationService.classify(formData);
      localStorage.setItem('classificationResult', JSON.stringify(result));
      localStorage.removeItem('classificationFormData');
      localStorage.removeItem('classificationFormPage');
      navigate('/results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during classification');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (page !== 'transparency') {
      handleNext();
    } else {
      handleSubmit(e);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900">System Information</h2>
        <div className="mt-4 space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">System Name</p>
            <p className="mt-1 text-sm text-gray-900">{formData.systemName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">System Purpose</p>
            <p className="mt-1 text-sm text-gray-900">{formData.systemPurpose}</p>
          </div>
        </div>
      </div>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        {page === 'prohibited' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Prohibited AI Practices Assessment</h3>
            <p className="text-sm text-gray-500">Please answer the following questions about prohibited practices:</p>
            <div className="space-y-4">
              <div className="flex items-center">
                <input type="checkbox" id="usesSubliminalTechniques" name="usesSubliminalTechniques" checked={formData.usesSubliminalTechniques} onChange={handleCheckboxChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="usesSubliminalTechniques" className="ml-2 block text-sm text-gray-900">Does your system deploy subliminal or manipulative techniques to distort the behavior or persons?</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="exploitsVulnerabilities" name="exploitsVulnerabilities" checked={formData.exploitsVulnerabilities} onChange={handleCheckboxChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="exploitsVulnerabilities" className="ml-2 block text-sm text-gray-900">Does your system exploit vulnerabilities of specific groups (e.g., children, disabled)?</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="conductsSocialScoring" name="conductsSocialScoring" checked={formData.conductsSocialScoring} onChange={handleCheckboxChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="conductsSocialScoring" className="ml-2 block text-sm text-gray-900">Does your system conduct social scoring of individuals?</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="usesRealTimeBiometric" name="usesRealTimeBiometric" checked={formData.usesRealTimeBiometric} onChange={handleCheckboxChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="usesRealTimeBiometric" className="ml-2 block text-sm text-gray-900">Does your system use real-time remote biometric identification in publicly accessible spaces for law enforcement?</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="usesEmotionRecognition" name="usesEmotionRecognition" checked={formData.usesEmotionRecognition} onChange={handleCheckboxChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="usesEmotionRecognition" className="ml-2 block text-sm text-gray-900">Does your system use emotion recognition in workplaces or educational institutions?</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="createsFacialRecognitionDB" name="createsFacialRecognitionDB" checked={formData.createsFacialRecognitionDB} onChange={handleCheckboxChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="createsFacialRecognitionDB" className="ml-2 block text-sm text-gray-900">Does your system create facial recognition databases from indiscriminate scraping?</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="usesPredictivePolicing" name="usesPredictivePolicing" checked={formData.usesPredictivePolicing} onChange={handleCheckboxChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="usesPredictivePolicing" className="ml-2 block text-sm text-gray-900">Does your system use predictive policing or profiling for law enforcement?</label>
              </div>
            </div>
          </div>
        )}
        {page === 'highrisk' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">High-Risk AI Practices Assessment</h3>
            <p className="text-sm text-gray-500">Please answer the following questions about high-risk practices:</p>
            <div className="space-y-4">
              <div className="flex items-center">
                <input type="checkbox" id="usedInBiometrics" name="usedInBiometrics" checked={formData.usedInBiometrics} onChange={handleCheckboxChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="usedInBiometrics" className="ml-2 block text-sm text-gray-900">Is your system used in biometric identification or categorization?</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="usedInCriticalInfrastructure" name="usedInCriticalInfrastructure" checked={formData.usedInCriticalInfrastructure} onChange={handleCheckboxChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="usedInCriticalInfrastructure" className="ml-2 block text-sm text-gray-900">Is your system used in critical infrastructure (e.g., water, energy)?</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="usedInEducation" name="usedInEducation" checked={formData.usedInEducation} onChange={handleCheckboxChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="usedInEducation" className="ml-2 block text-sm text-gray-900">Is your system used in education or vocational training?</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="usedInEmployment" name="usedInEmployment" checked={formData.usedInEmployment} onChange={handleCheckboxChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="usedInEmployment" className="ml-2 block text-sm text-gray-900">Is your system used in employment, worker management, or access to self-employment?</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="usedInEssentialServices" name="usedInEssentialServices" checked={formData.usedInEssentialServices} onChange={handleCheckboxChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="usedInEssentialServices" className="ml-2 block text-sm text-gray-900">Is your system used in essential private or public services (e.g., credit scoring, social benefits)?</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="usedInLawEnforcement" name="usedInLawEnforcement" checked={formData.usedInLawEnforcement} onChange={handleCheckboxChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="usedInLawEnforcement" className="ml-2 block text-sm text-gray-900">Is your system used in law enforcement?</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="usedInMigration" name="usedInMigration" checked={formData.usedInMigration} onChange={handleCheckboxChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="usedInMigration" className="ml-2 block text-sm text-gray-900">Is your system used in migration, asylum, or border control?</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="usedInJustice" name="usedInJustice" checked={formData.usedInJustice} onChange={handleCheckboxChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="usedInJustice" className="ml-2 block text-sm text-gray-900">Is your system used in the administration of justice or democratic processes?</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="isSafetyComponent" name="isSafetyComponent" checked={formData.isSafetyComponent} onChange={handleCheckboxChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="isSafetyComponent" className="ml-2 block text-sm text-gray-900">Is your system a safety component of a regulated product?</label>
              </div>
            </div>
          </div>
        )}
        {page === 'transparency' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Transparency Requirements Assessment</h3>
            <p className="text-sm text-gray-500">Please answer the following questions about transparency requirements:</p>
            <div className="space-y-4">
              <div className="flex items-center">
                <input type="checkbox" id="interactsWithHumans" name="interactsWithHumans" checked={formData.interactsWithHumans} onChange={handleCheckboxChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="interactsWithHumans" className="ml-2 block text-sm text-gray-900">Does your system interact with humans (e.g., chatbots, virtual assistants)?</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="generatesContent" name="generatesContent" checked={formData.generatesContent} onChange={handleCheckboxChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="generatesContent" className="ml-2 block text-sm text-gray-900">Does your system generate content (e.g., deepfakes, synthetic media)?</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="usesEmotionOrBiometric" name="usesEmotionOrBiometric" checked={formData.usesEmotionOrBiometric} onChange={handleCheckboxChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="usesEmotionOrBiometric" className="ml-2 block text-sm text-gray-900">Does your system use emotion recognition or biometric categorization?</label>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        <div className="flex justify-between mt-8">
          <button type="button" onClick={handleBack} className="btn disabled:opacity-50">Back</button>
          <button type="submit" disabled={isLoading && page === 'transparency'} className="btn disabled:opacity-50">
            {page !== 'transparency' ? 'Next' : (isLoading ? 'Classifying...' : 'Complete Assessment')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClassificationForm; 