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
        

        // TODO: Edit the descriptions of the recommendations to be more specific to the EU AI Act according to original JAVA file

        switch (riskCategory) {
            case "High-Risk":
                recommendations.add("Conduct a comprehensive risk assessment");
                recommendations.add("Prepare technical documentation");
                recommendations.add("Implement human oversight mechanisms");
                recommendations.add("Ensure data quality and governance");
                recommendations.add("Register the system in the EU database");
                recommendations.add("Implement appropriate risk management measures");
                recommendations.add("Ensure system robustness and security");
                recommendations.add("Maintain detailed logs of system operations");
                recommendations.add("Establish a quality management system");
                recommendations.add("Prepare for conformity assessment");
                break;
                
            case "Limited Risk":
                recommendations.add("Implement transparency measures");
                recommendations.add("Notify users when they interact with AI");
                recommendations.add("Label AI-generated content");
                recommendations.add("Maintain documentation of system capabilities");
                recommendations.add("Provide clear information about AI system limitations");
                recommendations.add("Establish procedures for handling user feedback");
                recommendations.add("Monitor system performance and accuracy");
                break;
                
            case "Minimal Risk":
                recommendations.add("Follow voluntary codes of conduct");
                recommendations.add("Monitor for potential risks");
                recommendations.add("Keep documentation of system operations");
                recommendations.add("Stay informed about regulatory updates");
                recommendations.add("Consider implementing basic transparency measures");
                recommendations.add("Regularly review system impact");
                break;
        }
        
        return recommendations;
    }
} 