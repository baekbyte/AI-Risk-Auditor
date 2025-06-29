import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { classificationService, ClassificationRequest } from '../services/api';
import '../styles/ClassificationForm.css';

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

  const getPageTitle = (page: Page) => {
    switch (page) {
      case 'prohibited': return 'Prohibited AI Practices';
      case 'highrisk': return 'High-Risk AI Practices';
      case 'transparency': return 'Transparency Requirements';
      default: return '';
    }
  };

  const getPageIcon = (page: Page) => {
    switch (page) {
      case 'prohibited': return 'prohibited-icon';
      case 'highrisk': return 'highrisk-icon';
      case 'transparency': return 'transparency-icon';
      default: return '';
    }
  };

  const getPageDescription = (page: Page) => {
    switch (page) {
      case 'prohibited': return 'Please answer the following questions about prohibited practices under the EU AI Act:';
      case 'highrisk': return 'Please answer the following questions about high-risk practices that require special compliance:';
      case 'transparency': return 'Please answer the following questions about transparency requirements:';
      default: return '';
    }
  };

  return (
    <div className="classification-form-container">
      <div className="classification-form-content">
        <div className="classification-form-header">
          <h1 className="classification-form-title">AI System Assessment</h1>
          <p className="classification-form-subtitle">
            Complete the assessment to determine your AI system's compliance requirements
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="progress-indicator">
          {PAGES.map((pageName, index) => (
            <React.Fragment key={pageName}>
              <div className={`progress-step ${page === pageName ? 'active' : index < PAGES.indexOf(page) ? 'completed' : ''}`}>
                <div className="progress-dot"></div>
                <span>{getPageTitle(pageName)}</span>
              </div>
              {index < PAGES.length - 1 && (
                <div className={`progress-line ${index < PAGES.indexOf(page) ? 'completed' : ''}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* System Information */}
        <div className="system-info-section">
          <h2 className="system-info-title">System Information</h2>
          <div className="system-info-grid">
            <div className="system-info-label">System Name</div>
            <div className="system-info-value">{formData.systemName}</div>
            <div className="system-info-label">System Purpose</div>
            <div className="system-info-value">{formData.systemPurpose}</div>
          </div>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="form-section">
            <h3 className="form-section-title">
              <span className={`section-icon ${getPageIcon(page)}`}></span>
              {getPageTitle(page)}
            </h3>
            <p className="form-section-subtitle">{getPageDescription(page)}</p>

            <div className="checkbox-group">
              {page === 'prohibited' && (
                <>
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="usesSubliminalTechniques"
                      name="usesSubliminalTechniques"
                      checked={formData.usesSubliminalTechniques}
                      onChange={handleCheckboxChange}
                      className="checkbox-input"
                    />
                    <label htmlFor="usesSubliminalTechniques" className="custom-checkbox"></label>
                    <label htmlFor="usesSubliminalTechniques" className="checkbox-label">
                      Does your system deploy subliminal or manipulative techniques to distort the behavior of persons?
                    </label>
                  </div>
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="exploitsVulnerabilities"
                      name="exploitsVulnerabilities"
                      checked={formData.exploitsVulnerabilities}
                      onChange={handleCheckboxChange}
                      className="checkbox-input"
                    />
                    <label htmlFor="exploitsVulnerabilities" className="custom-checkbox"></label>
                    <label htmlFor="exploitsVulnerabilities" className="checkbox-label">
                      Does your system exploit vulnerabilities of specific groups (e.g., children, disabled)?
                    </label>
                  </div>
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="conductsSocialScoring"
                      name="conductsSocialScoring"
                      checked={formData.conductsSocialScoring}
                      onChange={handleCheckboxChange}
                      className="checkbox-input"
                    />
                    <label htmlFor="conductsSocialScoring" className="custom-checkbox"></label>
                    <label htmlFor="conductsSocialScoring" className="checkbox-label">
                      Does your system conduct social scoring of individuals?
                    </label>
                  </div>
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="usesRealTimeBiometric"
                      name="usesRealTimeBiometric"
                      checked={formData.usesRealTimeBiometric}
                      onChange={handleCheckboxChange}
                      className="checkbox-input"
                    />
                    <label htmlFor="usesRealTimeBiometric" className="custom-checkbox"></label>
                    <label htmlFor="usesRealTimeBiometric" className="checkbox-label">
                      Does your system use real-time remote biometric identification in publicly accessible spaces for law enforcement?
                    </label>
                  </div>
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="usesEmotionRecognition"
                      name="usesEmotionRecognition"
                      checked={formData.usesEmotionRecognition}
                      onChange={handleCheckboxChange}
                      className="checkbox-input"
                    />
                    <label htmlFor="usesEmotionRecognition" className="custom-checkbox"></label>
                    <label htmlFor="usesEmotionRecognition" className="checkbox-label">
                      Does your system use emotion recognition in workplaces or educational institutions?
                    </label>
                  </div>
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="createsFacialRecognitionDB"
                      name="createsFacialRecognitionDB"
                      checked={formData.createsFacialRecognitionDB}
                      onChange={handleCheckboxChange}
                      className="checkbox-input"
                    />
                    <label htmlFor="createsFacialRecognitionDB" className="custom-checkbox"></label>
                    <label htmlFor="createsFacialRecognitionDB" className="checkbox-label">
                      Does your system create facial recognition databases from indiscriminate scraping?
                    </label>
                  </div>
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="usesPredictivePolicing"
                      name="usesPredictivePolicing"
                      checked={formData.usesPredictivePolicing}
                      onChange={handleCheckboxChange}
                      className="checkbox-input"
                    />
                    <label htmlFor="usesPredictivePolicing" className="custom-checkbox"></label>
                    <label htmlFor="usesPredictivePolicing" className="checkbox-label">
                      Does your system use predictive policing or profiling for law enforcement?
                    </label>
                  </div>
                </>
              )}

              {page === 'highrisk' && (
                <>
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="usedInBiometrics"
                      name="usedInBiometrics"
                      checked={formData.usedInBiometrics}
                      onChange={handleCheckboxChange}
                      className="checkbox-input"
                    />
                    <label htmlFor="usedInBiometrics" className="custom-checkbox"></label>
                    <label htmlFor="usedInBiometrics" className="checkbox-label">
                      Is your system used in biometric identification or categorization?
                    </label>
                  </div>
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="usedInCriticalInfrastructure"
                      name="usedInCriticalInfrastructure"
                      checked={formData.usedInCriticalInfrastructure}
                      onChange={handleCheckboxChange}
                      className="checkbox-input"
                    />
                    <label htmlFor="usedInCriticalInfrastructure" className="custom-checkbox"></label>
                    <label htmlFor="usedInCriticalInfrastructure" className="checkbox-label">
                      Is your system used in critical infrastructure (e.g., water, energy)?
                    </label>
                  </div>
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="usedInEducation"
                      name="usedInEducation"
                      checked={formData.usedInEducation}
                      onChange={handleCheckboxChange}
                      className="checkbox-input"
                    />
                    <label htmlFor="usedInEducation" className="custom-checkbox"></label>
                    <label htmlFor="usedInEducation" className="checkbox-label">
                      Is your system used in education or vocational training?
                    </label>
                  </div>
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="usedInEmployment"
                      name="usedInEmployment"
                      checked={formData.usedInEmployment}
                      onChange={handleCheckboxChange}
                      className="checkbox-input"
                    />
                    <label htmlFor="usedInEmployment" className="custom-checkbox"></label>
                    <label htmlFor="usedInEmployment" className="checkbox-label">
                      Is your system used in employment, worker management, or access to self-employment?
                    </label>
                  </div>
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="usedInEssentialServices"
                      name="usedInEssentialServices"
                      checked={formData.usedInEssentialServices}
                      onChange={handleCheckboxChange}
                      className="checkbox-input"
                    />
                    <label htmlFor="usedInEssentialServices" className="custom-checkbox"></label>
                    <label htmlFor="usedInEssentialServices" className="checkbox-label">
                      Is your system used in essential private or public services (e.g., credit scoring, social benefits)?
                    </label>
                  </div>
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="usedInLawEnforcement"
                      name="usedInLawEnforcement"
                      checked={formData.usedInLawEnforcement}
                      onChange={handleCheckboxChange}
                      className="checkbox-input"
                    />
                    <label htmlFor="usedInLawEnforcement" className="custom-checkbox"></label>
                    <label htmlFor="usedInLawEnforcement" className="checkbox-label">
                      Is your system used in law enforcement?
                    </label>
                  </div>
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="usedInMigration"
                      name="usedInMigration"
                      checked={formData.usedInMigration}
                      onChange={handleCheckboxChange}
                      className="checkbox-input"
                    />
                    <label htmlFor="usedInMigration" className="custom-checkbox"></label>
                    <label htmlFor="usedInMigration" className="checkbox-label">
                      Is your system used in migration, asylum, or border control?
                    </label>
                  </div>
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="usedInJustice"
                      name="usedInJustice"
                      checked={formData.usedInJustice}
                      onChange={handleCheckboxChange}
                      className="checkbox-input"
                    />
                    <label htmlFor="usedInJustice" className="custom-checkbox"></label>
                    <label htmlFor="usedInJustice" className="checkbox-label">
                      Is your system used in the administration of justice or democratic processes?
                    </label>
                  </div>
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="isSafetyComponent"
                      name="isSafetyComponent"
                      checked={formData.isSafetyComponent}
                      onChange={handleCheckboxChange}
                      className="checkbox-input"
                    />
                    <label htmlFor="isSafetyComponent" className="custom-checkbox"></label>
                    <label htmlFor="isSafetyComponent" className="checkbox-label">
                      Is your system a safety component of a regulated product?
                    </label>
                  </div>
                </>
              )}

              {page === 'transparency' && (
                <>
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="interactsWithHumans"
                      name="interactsWithHumans"
                      checked={formData.interactsWithHumans}
                      onChange={handleCheckboxChange}
                      className="checkbox-input"
                    />
                    <label htmlFor="interactsWithHumans" className="custom-checkbox"></label>
                    <label htmlFor="interactsWithHumans" className="checkbox-label">
                      Does your system interact with humans (e.g., chatbots, virtual assistants)?
                    </label>
                  </div>
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="generatesContent"
                      name="generatesContent"
                      checked={formData.generatesContent}
                      onChange={handleCheckboxChange}
                      className="checkbox-input"
                    />
                    <label htmlFor="generatesContent" className="custom-checkbox"></label>
                    <label htmlFor="generatesContent" className="checkbox-label">
                      Does your system generate content (e.g., deepfakes, synthetic media)?
                    </label>
                  </div>
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="usesEmotionOrBiometric"
                      name="usesEmotionOrBiometric"
                      checked={formData.usesEmotionOrBiometric}
                      onChange={handleCheckboxChange}
                      className="checkbox-input"
                    />
                    <label htmlFor="usesEmotionOrBiometric" className="custom-checkbox"></label>
                    <label htmlFor="usesEmotionOrBiometric" className="checkbox-label">
                      Does your system use emotion recognition or biometric categorization?
                    </label>
                  </div>
                </>
              )}
            </div>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              onClick={handleBack}
              className="form-button form-button-secondary"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isLoading && page === 'transparency'}
              className="form-button"
            >
              {page !== 'transparency' ? (
                'Next'
              ) : (
                isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Classifying...
                  </>
                ) : (
                  'Complete Assessment'
                )
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassificationForm; 