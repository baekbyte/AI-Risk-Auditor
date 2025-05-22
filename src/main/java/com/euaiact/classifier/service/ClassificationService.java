package com.euaiact.classifier.service;

import com.euaiact.classifier.model.ClassificationRequest;
import com.euaiact.classifier.model.ClassificationResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClassificationService {
    
    public ClassificationResponse classify(ClassificationRequest request) {
        ClassificationResponse response = new ClassificationResponse();
        response.setSystemName(request.getSystemName());
        response.setSystemPurpose(request.getSystemPurpose());
        
        // Check if the system is prohibited
        boolean isProhibited = checkProhibitedUseCase(request);
        response.setProhibited(isProhibited);
        
        if (isProhibited) {
            response.setRiskCategory("PROHIBITED");
            response.setRecommendations(List.of(
                "This AI system falls under prohibited practices according to the EU AI Act.",
                "Consider consulting with a legal expert specializing in AI regulation.",
                "Review and modify the system to comply with EU AI Act requirements."
            ));
            return response;
        }
        
        // Check if it's high risk
        boolean isHighRisk = checkHighRiskUseCase(request);
        
        // Check transparency requirements
        boolean needsTransparency = checkTransparencyRequirements(request);
        
        // Determine final risk category
        String riskCategory;
        if (isHighRisk) {
            riskCategory = "High-Risk";
        } else if (needsTransparency) {
            riskCategory = "Limited Risk";
        } else {
            riskCategory = "Minimal Risk";
        }
        
        response.setRiskCategory(riskCategory);
        response.setRecommendations(generateRecommendations(riskCategory));
        
        return response;
    }
    
    private boolean checkProhibitedUseCase(ClassificationRequest request) {
        String purpose = request.getSystemPurpose().toLowerCase();
        
        // Check for prohibited practices based on the system's purpose
        return purpose.contains("subliminal") || 
               purpose.contains("manipulative") ||
               purpose.contains("exploit vulnerabilities") ||
               purpose.contains("social scoring") ||
               purpose.contains("real-time biometric") ||
               purpose.contains("emotion recognition") ||
               purpose.contains("facial recognition database") ||
               purpose.contains("predictive policing");
    }
    
    private boolean checkHighRiskUseCase(ClassificationRequest request) {
        String purpose = request.getSystemPurpose().toLowerCase();
        
        // Check for high-risk domains
        boolean isHighRiskDomain = purpose.contains("biometric") ||
                                  purpose.contains("critical infrastructure") ||
                                  purpose.contains("education") ||
                                  purpose.contains("employment") ||
                                  purpose.contains("worker management") ||
                                  purpose.contains("credit scoring") ||
                                  purpose.contains("social benefits") ||
                                  purpose.contains("law enforcement") ||
                                  purpose.contains("migration") ||
                                  purpose.contains("asylum") ||
                                  purpose.contains("border control") ||
                                  purpose.contains("justice") ||
                                  purpose.contains("democratic process");
        
        // Check if it's a safety component
        boolean isSafetyComponent = purpose.contains("safety component") ||
                                   purpose.contains("product safety");
        
        return isHighRiskDomain || isSafetyComponent;
    }
    
    private boolean checkTransparencyRequirements(ClassificationRequest request) {
        String purpose = request.getSystemPurpose().toLowerCase();
        
        // Check for transparency requirements
        return purpose.contains("chatbot") ||
               purpose.contains("human interaction") ||
               purpose.contains("content generation") ||
               purpose.contains("deepfake") ||
               purpose.contains("emotion recognition") ||
               purpose.contains("biometric categorization");
    }
    
    private List<String> generateRecommendations(String riskCategory) {
        List<String> recommendations = new ArrayList<>();
        

        switch (riskCategory) {
            case "High-Risk":
                recommendations.add("Implement a comprehensive risk management system that operates throughout the system lifecycle");
                recommendations.add("Conduct and document thorough risk assessments");
                recommendations.add("Establish data governance measures addressing training, validation, and testing data");
                recommendations.add("Ensure datasets are relevant, representative, and free from errors");
                recommendations.add("Maintain detailed technical documentation before market placement");
                recommendations.add("Document system architecture, capabilities, limitations, and performance metrics");
                recommendations.add("Implement automatic logging of events while the system is operating");
                recommendations.add("Ensure traceability throughout the system lifecycle");
                recommendations.add("Provide clear information to users about capabilities, limitations, and purpose");
                recommendations.add("Document oversight measures and human-AI interaction capabilities");
                recommendations.add("Design system to allow for effective oversight by humans");
                recommendations.add("Implement 'stop' buttons or similar intervention measures");
                recommendations.add("Develop with appropriate levels of accuracy and cybersecurity measures");
                recommendations.add("Test for potential discriminatory impacts and implement mitigations");
                recommendations.add("Undergo formal conformity assessment before deployment");
                recommendations.add("Register in the EU database before putting the system into service");
                break;
                
            case "Limited Risk":
                recommendations.add("Notify users that they are interacting with an AI system");
                recommendations.add("Clearly label AI-generated or manipulated content");
                recommendations.add("Design notifications to be accessible and difficult to miss");
                recommendations.add("Ensure users can make informed choices based on transparent disclosures");
                recommendations.add("Document transparency measures implemented in the system");
                break;
                
            case "Minimal Risk":
                recommendations.add("Consider adopting voluntary codes of conduct");
                recommendations.add("Follow AI ethics principles as a matter of good practice");
                recommendations.add("Stay informed of regulatory developments");
                recommendations.add("Consider implementing selected high-risk requirements as best practice");
                recommendations.add("Document your system's purpose and basic functioning");
                break;
        }
        
        return recommendations;
    }
} 