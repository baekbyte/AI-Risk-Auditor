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

        
    }

    




}