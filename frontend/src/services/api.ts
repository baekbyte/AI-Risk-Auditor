import axios from 'axios';

// Defining API requests and responses types
export interface ClassificationRequest {
    systemName: string;
    systemPurpose: string;
    // Prohibited AI Practices Assessment
    usesSubliminalTechniques?: boolean;
    exploitsVulnerabilities?: boolean;
    conductsSocialScoring?: boolean;
    usesRealTimeBiometric?: boolean;
    usesEmotionRecognition?: boolean;
    createsFacialRecognitionDB?: boolean;
    usesPredictivePolicing?: boolean;
    // High-Risk AI Practices Assessment
    usedInBiometrics?: boolean;
    usedInCriticalInfrastructure?: boolean;
    usedInEducation?: boolean;
    usedInEmployment?: boolean;
    usedInEssentialServices?: boolean;
    usedInLawEnforcement?: boolean;
    usedInMigration?: boolean;
    usedInJustice?: boolean;
    isSafetyComponent?: boolean;
    // Transparency Requirements Assessment
    interactsWithHumans?: boolean;
    generatesContent?: boolean;
    usesEmotionOrBiometric?: boolean;
}

export interface ClassificationResponse {
    systemName: string;
    systemPurpose: string;
    riskCategory: string;
    recommendations: string[];
    isProhibited: boolean;
}

// Creating axios instance with default config
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// API service functions
export const classificationService = {
    /**
     * Classify an AI system based on its characteristics
     * @param request The classification request containing system details
     * @returns Promise with the classification response
     */
    classify: async (request: ClassificationRequest): Promise<ClassificationResponse> => {
        try {
            const response = await api.post<ClassificationResponse>('/classify', request);
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Classification failed: ${error.message}`);
            }
            throw new Error('Failed to make classification request');
        }
    },
    /**
     * Download the results file from the backend
     * @param response The classification response to export
     * @param fileName The desired file name
     * @returns Promise with the file blob
     */
    downloadResultsFile: async (response: ClassificationResponse, fileName: string = 'Audit_Results.txt'): Promise<Blob> => {
        const res = await api.post(`/classify/download?fileName=${encodeURIComponent(fileName)}`, response, {
            responseType: 'blob',
        });
        return res.data as Blob;
    },
};

export default classificationService; 