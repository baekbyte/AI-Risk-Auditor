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
        
        // Check if the system is prohibited using both text analysis and yes/no answers
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
        
        // Check if it's high risk using both text analysis and yes/no answers
        boolean isHighRisk = checkHighRiskUseCase(request);
        
        // Check transparency requirements using both text analysis and yes/no answers
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
        boolean isProhibitedFromText = purpose.contains("subliminal") || 
                                     purpose.contains("manipulative") ||
                                     purpose.contains("exploit vulnerabilities") ||
                                     purpose.contains("social scoring") ||
                                     purpose.contains("real-time biometric") ||
                                     purpose.contains("emotion recognition") ||
                                     purpose.contains("facial recognition database") ||
                                     purpose.contains("predictive policing");

        // Check for prohibited practices using yes/no answers
        boolean isProhibitedFromAnswers = Boolean.TRUE.equals(request.getUsesSubliminalTechniques()) ||
                                        Boolean.TRUE.equals(request.getExploitsVulnerabilities()) ||
                                        Boolean.TRUE.equals(request.getConductsSocialScoring()) ||
                                        Boolean.TRUE.equals(request.getUsesRealTimeBiometric()) ||
                                        Boolean.TRUE.equals(request.getUsesEmotionRecognition()) ||
                                        Boolean.TRUE.equals(request.getCreatesFacialRecognitionDB()) ||
                                        Boolean.TRUE.equals(request.getUsesPredictivePolicing());

        return isProhibitedFromText || isProhibitedFromAnswers;
    }
    
    private boolean checkHighRiskUseCase(ClassificationRequest request) {
        String purpose = request.getSystemPurpose().toLowerCase();
        
        // Check for high-risk domains using text analysis
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

        // Check high-risk domains using yes/no answers
        boolean isHighRiskFromAnswers = Boolean.TRUE.equals(request.getUsedInBiometrics()) ||
                                       Boolean.TRUE.equals(request.getUsedInCriticalInfrastructure()) ||
                                       Boolean.TRUE.equals(request.getUsedInEducation()) ||
                                       Boolean.TRUE.equals(request.getUsedInEmployment()) ||
                                       Boolean.TRUE.equals(request.getUsedInEssentialServices()) ||
                                       Boolean.TRUE.equals(request.getUsedInLawEnforcement()) ||
                                       Boolean.TRUE.equals(request.getUsedInMigration()) ||
                                       Boolean.TRUE.equals(request.getUsedInJustice()) ||
                                       Boolean.TRUE.equals(request.getIsSafetyComponent());
        
        return isHighRiskDomain || isSafetyComponent || isHighRiskFromAnswers;
    }
    
    private boolean checkTransparencyRequirements(ClassificationRequest request) {
        String purpose = request.getSystemPurpose().toLowerCase();
        
        // Check for transparency requirements using text analysis
        boolean needsTransparencyFromText = purpose.contains("chatbot") ||
                                          purpose.contains("human interaction") ||
                                          purpose.contains("content generation") ||
                                          purpose.contains("deepfake") ||
                                          purpose.contains("emotion recognition") ||
                                          purpose.contains("biometric categorization");

        // Check for transparency requirements using yes/no answers
        boolean needsTransparencyFromAnswers = Boolean.TRUE.equals(request.getInteractsWithHumans()) ||
                                             Boolean.TRUE.equals(request.getGeneratesContent()) ||
                                             Boolean.TRUE.equals(request.getUsesEmotionOrBiometric());
        
        return needsTransparencyFromText || needsTransparencyFromAnswers;
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

    // Export classification results and recommendations to a text file
    public void exportResultsToFile(ClassificationResponse response, String fileName) {
        try {
            // Ensure .txt extension
            if (!fileName.toLowerCase().endsWith(".txt")) {
                fileName += ".txt";
            }
            java.io.FileWriter fileWriter = new java.io.FileWriter(fileName);
            java.io.BufferedWriter writer = new java.io.BufferedWriter(fileWriter);

            // Header
            writer.write("=================================================");
            writer.newLine();
            writer.write("EU AI ACT RISK CLASSIFICATION ASSESSMENT");
            writer.newLine();
            writer.write("=================================================");
            writer.newLine();
            writer.newLine();

            // System details
            writer.write("SYSTEM INFORMATION");
            writer.newLine();
            writer.write("-----------------");
            writer.newLine();
            writer.write("System Name: " + response.getSystemName());
            writer.newLine();
            writer.write("System Purpose: " + response.getSystemPurpose());
            writer.newLine();
            writer.newLine();

            // Classification results
            writer.write("CLASSIFICATION RESULT");
            writer.newLine();
            writer.write("-------------------");
            writer.newLine();
            writer.write("EU AI Act Classification: " + response.getRiskCategory());
            writer.newLine();
            writer.newLine();

            // Risk category explanation
            writer.write("Risk Category Explanation:");
            writer.newLine();
            switch (response.getRiskCategory()) {
                case "High-Risk":
                    writer.write("High-risk AI systems require substantial compliance measures ");
                    writer.newLine();
                    writer.write("under the EU AI Act, including risk assessments, technical ");
                    writer.newLine();
                    writer.write("documentation, and human oversight.");
                    break;
                case "Limited Risk":
                    writer.write("Limited risk AI systems must meet specific transparency ");
                    writer.newLine();
                    writer.write("obligations, such as notifying users they are interacting ");
                    writer.newLine();
                    writer.write("with an AI system or that content is artificially generated.");
                    break;
                case "Minimal Risk":
                    writer.write("Minimal risk AI systems have few regulatory obligations ");
                    writer.newLine();
                    writer.write("under the EU AI Act, though voluntary codes of conduct ");
                    writer.newLine();
                    writer.write("are encouraged.");
                    break;
                case "PROHIBITED":
                    writer.write("This AI system falls under prohibited practices according to the EU AI Act.");
                    writer.newLine();
                    writer.write("Consider consulting with a legal expert specializing in AI regulation.");
                    break;
            }
            writer.newLine();
            writer.newLine();

            // Recommendations
            writer.write("COMPLIANCE RECOMMENDATIONS");
            writer.newLine();
            writer.write("-------------------------");
            writer.newLine();
            int count = 1;
            for (String recommendation : response.getRecommendations()) {
                writer.write(count + ". " + recommendation);
                writer.newLine();
                count++;
            }
            writer.newLine();

            // Disclaimer
            writer.write("=================================================");
            writer.newLine();
            writer.write("DISCLAIMER: This assessment is provided for informational purposes only ");
            writer.newLine();
            writer.write("and should not be considered legal advice. Consult with legal experts ");
            writer.newLine();
            writer.write("for a comprehensive compliance assessment with the EU AI Act.");
            writer.newLine();
            writer.write("=================================================");

            writer.close();
        } catch (java.io.IOException e) {
            // Log or handle error as needed
            System.out.println("Error saving results to file: " + e.getMessage());
        }
    }
} 