import java.util.*; 

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

    }

    /* Checking whether user's AI system is prohibited.
     * @param scnr to take user input
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
     * @param scnr to take user input
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
     * @param scnr to take user input
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
     * @param systemName name of the user's AI system
     * @param systemPurpose purpose of the user's AI system
     * @param riskCategory (High-Risk, Limited Risk, Minimal Risk)
     */
    private static void displayResult(String systemName, String systemPurpose, String riskCategory) {
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


    private static List<String> generateRecommendations(String riskCategory) {

        List<String> recommendations = new ArrayList<>();

        switch (riskCategory) {
            case "High-Risk":
                // refer to sections 2-5 of chapter 3 of EU AI Act
            break;

            case "Limited Risk":
                // refer to article 50 of chapter 4 of EU AI Act
            break;

            case "Minimal Risk":
                // refer to articles 53-56 of chapter 5 of EU AI Act
            break;


        }

        return recommendations;
    }


    /* Helper method to prompt user with yes or no.
     * @param scnr to take user input
     * @param question to prompt user with question
     * @return true/false if y/n
     */
    private static boolean promptYesNo(Scanner scnr, String question) {
        System.out.print(question + " (y/n): ");
        String response = scnr.nextLine().trim().toLowerCase();
        return response.startsWith("y");

    }
    




}