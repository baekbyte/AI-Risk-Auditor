import axios from 'axios';

// Defining API requests and responses types
export interface ClassificationRequest {
    systemName: string;
    systemPurpose: string;
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
    baseURL: 'http://localhost:8080/api',
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
};

export default classificationService; 