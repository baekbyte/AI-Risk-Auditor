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

        
        boolean isHighRisk = checkHighRiskUseCase(scnr);
        
        // Determine if the system is prohibited
        boolean isProhibited = checkProhibitedUseCase(scnr);
        
        if (isProhibited) {
            System.out.println("WARNING: Your AI system may fall under PROHIBITED practices!");
            System.out.println("According to the EU AI Act, this type of AI system is not permitted.");
            System.out.println("Consider consulting with a legal expert specializing in AI regulation.");
            return;
        }

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
    }

    /* Checking whether user's AI system is prohibited
     * @param scnr to take user input
     * @return true/false -> if prohibited risk/not prohibited risk
     */
    private static boolean checkProhibitedUseCase(Scanner scnr) {
        System.out.println("--- PROHIBITED AI PRACTICES ASSESSMENT ---");

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

    /* Checking whether user's AI system is high risk
     * @param scnr to take user input
     * @return true/false -> if high risk/not high risk
     */
    private static boolean checkHighRiskUseCase(Scanner scnr) {

        return false;
    }

    /* Checking whether user's AI system needs transparency requirments
     * @param scnr to take user input
     * @return true/false -> if transparency requirments are needed/not needed
     */
    private static boolean checkTransparencyRequirements(Scanner scnr) {
        return false;
    }

    /*
     * 
     */
    private static boolean promptYesNo(Scanner scnr, String question) {
        System.out.print(question + " (y/n): ");
        String response = scnr.nextLine().trim().toLowerCase();
        return response.startsWith("y");

    }
    




}