import java.util.*; 
import java.io.*;

/*
 * EU AI Act Risk Classifier
 * 
 * A Java application that classifies AI systems according to the risk-based approach
 * of the EU AI Act and provides compliance guidance based on the classification.
 */
public class EUAIActClassifer {
    public static void main(String[] args) {
        String systemName;
        String systemPurpose;
        Scanner scnr = new Scanner(System.in);

        // Prompting user with assessment interface
        System.out.println("===============================================");
        System.out.println("  EU AI ACT RISK CLASSIFICATION TOOL");
        System.out.println("===============================================");
        System.out.println("This tool helps classify your AI system according to");
        System.out.println("the EU AI Act's risk-based framework and provides");
        System.out.println("relevant governance recommendations.\n");

        System.out.println("Enter the name of your AI system:");
        systemName = scnr.nextLine();

        System.out.println("Describe the main purpose of your AI system:");
        systemPurpose = scnr.nextLine();

        
        // Determine if the system is prohibited
        boolean isProhibited = checkProhibitedUseCase(scnr);
        
        if (isProhibited) {
            System.out.println("WARNING: Your AI system may fall under PROHIBITED practices!");
            System.out.println("According to the EU AI Act, this type of AI system is not permitted.");
            System.out.println("Consider consulting with a legal expert specializing in AI regulation.");
            return;
        }

        boolean isHighRisk = checkHighRiskUseCase(scnr);

        // Determine transparency requirements
        boolean needsTransparency = checkTransparencyRequirements(scnr);
        
        // Determine final risk category
        String riskCategory;
        if (isHighRisk) {
            riskCategory = "High-Risk";
        } else if (needsTransparency) {
            riskCategory = "Limited Risk";
        } else {
            riskCategory = "Minimal Risk";
        }
        
        // Displaying Result
        displayResult(systemName, systemPurpose, riskCategory);
        List<String> recommendations = generateRecommendations(riskCategory);

        displayRecommendations(recommendations);

        // Asking user whether to save to file
        boolean saveToFile = promptYesNo(scnr, "Would you like to save the results and recommendation to a file?");
        if(saveToFile) {
            System.out.println("Enter file name without extension: ");
            String fileName = scnr.nextLine();
            fileResults(fileName, systemName, systemPurpose, riskCategory, recommendations);
        }

        System.out.println("\nThank you for using the EU AI Act Risk Classification Tool.");
        scnr.close();

    }

    /* Saving results and recommednations to an external txt file.
     * @param fileName Name for the file (without extension)
     * @param systemName Name of the AI system
     * @param systemPurpose Purpose of the AI system
     * @param riskCategory EU AI Act risk classification
     * @param recommendations List of compliance recommendations
     */
    private static void fileResults(String fileName, String systemName, String systemPurpose, String riskCategory, List<String> recommendations) {

        try {

            // Ensuring the file has .txt extension
            if (!fileName.toLowerCase().endsWith(".txt")) {
                fileName += ".txt";
            }

            FileWriter fileWriter = new FileWriter(fileName);
            BufferedWriter writer = new BufferedWriter(fileWriter);

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
            writer.write("System Name: " + systemName);
            writer.newLine();
            writer.write("System Purpose: " + systemPurpose);
            writer.newLine();
            writer.newLine();
            
            // Classification results
            writer.write("CLASSIFICATION RESULT");
            writer.newLine();
            writer.write("-------------------");
            writer.newLine();
            writer.write("EU AI Act Classification: " + riskCategory);
            writer.newLine();
            writer.newLine();


            // Rrisk category explanation
            writer.write("Risk Category Explanation:");
            writer.newLine();
            switch (riskCategory) {
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
            }
            writer.newLine();
            writer.newLine();

            // Write recommendations
            writer.write("COMPLIANCE RECOMMENDATIONS");
            writer.newLine();
            writer.write("-------------------------");
            writer.newLine();
            int count = 1;
            for (String recommendation : recommendations) {
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
            
            System.out.println("Results successfully saved to file: " + fileName);

        } catch (IOException e) {
            System.out.println("Error saving results to file: " + e.getMessage());
        }

        
        

    }

    /* Checking whether user's AI system is prohibited.
     * @param scnr To take user input
     * @return true/false -> if prohibited risk/not prohibited risk
     */
    private static boolean checkProhibitedUseCase(Scanner scnr) {
        System.out.println("\n--- PROHIBITED AI PRACTICES ASSESSMENT ---");

        boolean result = false;

        result |= promptYesNo(scnr, "Does your system deploy subliminal or manipulative techniques to distort the behavior or persons?");
        result |= promptYesNo(scnr, "Does your system exploit any vulnerabilities of specific groups based on demographics?");
        result |= promptYesNo(scnr, "Does your system conduct social scoring for general purposes that could lead to detrimental or unfavourable treatment?");
        result |= promptYesNo(scnr, "Does your system use real-time remote biometric identification in publicly accessible spaces for law enforcement?");
        result |= promptYesNo(scnr, "Does your system use emotion recognition in workplaces or educational institutions?");
        result |= promptYesNo(scnr, "Does your system create or expand facial recognition databases through untargeted scraping?");
        result |= promptYesNo(scnr, "Does your system use predictive policing based solely on profiling or assessment of traits?");


        return result;
    }

    /* Checking whether user's AI system is high risk.
     * @param scnr To take user input
     * @return true/false -> if high risk/not high risk
     */
    private static boolean checkHighRiskUseCase(Scanner scnr) {
        System.out.println("\n--- HIGH-RISK AI PRACTICES ASSESSMENT ---");
        
        System.out.println("Is your AI system used in any of these domains?");
        boolean result = false;

        result |= promptYesNo(scnr, "Biometrics where it's intended to be used for identification, categorisation, or emotional recognition systems");
        result |= promptYesNo(scnr, "Critical infrastructure where it poses safety risks?");
        result |= promptYesNo(scnr, "Educational or vocational training with significant impact on access to education?");
        result |= promptYesNo(scnr, "Employment, worker management, or access to self-employment?");
        result |= promptYesNo(scnr, "Access to essential private or public services (e.g., credit scoring, social benefits)?");
        result |= promptYesNo(scnr, "Law enforcement with significant impact on people's lives?");
        result |= promptYesNo(scnr, "Migration, asylum, or border control management?");
        result |= promptYesNo(scnr, "Administration of justice and democratic processes?");

        boolean isSafetyComponent = promptYesNo(scnr, "Is your AI system is a safety component of a product or a product itself covered by the Union harmonisation legislation");

        return result || isSafetyComponent;
    }

    /* Checking whether user's AI system needs transparency requirments.
     * @param scnr To take user input
     * @return true/false -> if transparency requirments are needed/not needed
     */
    private static boolean checkTransparencyRequirements(Scanner scnr) {
        System.out.println("\n--- TRANSPARENCY ASSESSMENT ---");
    
        boolean result = false;

        result |= promptYesNo(scnr, "Does your system interact with humans (e.g. chatbots)?");
        result |= promptYesNo(scnr, "Does your system generate or manipulate content (e.g. deepfakes)?");
        result |= promptYesNo(scnr, "Does your system use emotion recognition or biometric categorization?");
        
        return result;
    }

    /* Printing results of the risk assessment.
     * @param systemName Name of the user's AI system
     * @param systemPurpose Purpose of the user's AI system
     * @param riskCategory (High-Risk, Limited Risk, Minimal Risk)
     */
    private static void displayResult(String systemName, String systemPurpose, String riskCategory) {
        System.out.println("\n===============================================");
        System.out.println("  CLASSIFICATION RESULTS");
        System.out.println("===============================================");
        System.out.println("System: " + systemName);
        System.out.println("Purpose: " + systemPurpose);
        System.out.println("EU AI Act Classification: " + riskCategory);
        
        System.out.println("\nRisk Category Explanation:");
        
        switch (riskCategory) {
            case "High-Risk":
                System.out.println("\nHigh-risk AI systems require substantial compliance measures");
                System.out.println("under the EU AI Act, including risk assessments, technical");
                System.out.println("documentation, and human oversight.");
                break;

            case "Limited Risk":
                System.out.println("\nLimited risk AI systems must meet specific transparency");
                System.out.println("obligations, such as notifying users they are interacting");
                System.out.println("with an AI system or that content is artificially generated.");
                break;

            case "Minimal Risk":
                System.out.println("\nMinimal risk AI systems have few regulatory obligations");
                System.out.println("under the EU AI Act, though voluntary codes of conduct");
                System.out.println("are encouraged.");
                break;

        }
    }


    /* Generating recommendations for AI systems.
     * @param riskCategory
     * @return recommendations The ArrayList of recommendations
     */
    private static List<String> generateRecommendations(String riskCategory) {

        List<String> recommendations = new ArrayList<>();

        switch (riskCategory) {
            case "High-Risk":
                // refer to sections 2-5 of chapter 3 of EU AI Act
                
                // Risk management system
                recommendations.add("Implement a comprehensive risk management system that operates throughout the system lifecycle");
                recommendations.add("Conduct and document thorough risk assessments");
                
                // Data governance
                recommendations.add("Establish data governance measures addressing training, validation, and testing data");
                recommendations.add("Ensure datasets are relevant, representative, and free from errors");
                
                // Technical documentation
                recommendations.add("Maintain detailed technical documentation before market placement");
                recommendations.add("Document system architecture, capabilities, limitations, and performance metrics");
                
                // Record keeping
                recommendations.add("Implement automatic logging of events while the system is operating");
                recommendations.add("Ensure traceability throughout the system lifecycle");
                
                // Transparency
                recommendations.add("Provide clear information to users about capabilities, limitations, and purpose");
                recommendations.add("Document oversight measures and human-AI interaction capabilities");
                
                // Human oversight
                recommendations.add("Design system to allow for effective oversight by humans");
                recommendations.add("Implement 'stop' buttons or similar intervention measures");
                
                // Accuracy and robustness
                recommendations.add("Develop with appropriate levels of accuracy and cybersecurity measures");
                recommendations.add("Test for potential discriminatory impacts and implement mitigations");
                
                // Conformity assessment
                recommendations.add("Undergo formal conformity assessment before deployment");
                recommendations.add("Register in the EU database before putting the system into service");

            break;

            case "Limited Risk":
                // refer to article 50 of chapter 4 of EU AI Act

                recommendations.add("Notify users that they are interacting with an AI system");
                recommendations.add("Clearly label AI-generated or manipulated content");
                recommendations.add("Design notifications to be accessible and difficult to miss");
                recommendations.add("Ensure users can make informed choices based on transparent disclosures");
                recommendations.add("Document transparency measures implemented in the system");
            break;

            case "Minimal Risk":
                // refer to articles 53-56 of chapter 5 of EU AI Act

                recommendations.add("Consider adopting voluntary codes of conduct");
                recommendations.add("Follow AI ethics principles as a matter of good practice");
                recommendations.add("Stay informed of regulatory developments");
                recommendations.add("Consider implementing selected high-risk requirements as best practice");
                recommendations.add("Document your system's purpose and basic functioning");
            break;


        }

        return recommendations;
    }

    /* Printing the recommendations post-risk assessment.
     * @param recommendations
     */
    private static void displayRecommendations(List<String> recommendations) {
        int count = 1;

        for(String recommendation : recommendations) {
            System.out.println(count + ": " + recommendation);
            count++;

        }


    }

    /* Helper method to prompt user with yes or no.
     * @param scnr To take user input
     * @param question To prompt user with question
     * @return true/false if y/n
     */
    private static boolean promptYesNo(Scanner scnr, String question) {
        System.out.print(question + " (y/n): ");
        String response = scnr.nextLine().trim().toLowerCase();
        return response.startsWith("y");

    }
    




}