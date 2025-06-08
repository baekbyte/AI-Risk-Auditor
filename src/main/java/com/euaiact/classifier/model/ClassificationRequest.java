package com.euaiact.classifier.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Request object for AI system classification")
public class ClassificationRequest {
    @Schema(
        description = "Name of the AI system",
        example = "Customer Service Chatbot",
        required = true
    )
    @NotBlank(message = "System name is required")
    @Size(min = 3, max = 100, message = "System name must be between 3 and 100 characters")
    private String systemName;

    @Schema(
        description = "Detailed description of the AI system's purpose and functionality",
        example = "AI-powered chatbot for handling customer service inquiries, using natural language processing to understand and respond to customer questions",
        required = true
    )
    @NotBlank(message = "System purpose is required")
    @Size(min = 20, max = 1000, message = "System purpose must be between 20 and 1000 characters")
    private String systemPurpose;

    // Prohibited AI Practices Assessment
    @Schema(description = "Does your system deploy subliminal or manipulative techniques to distort the behavior or persons?")
    private Boolean usesSubliminalTechniques;

    @Schema(description = "Does your system exploit any vulnerabilities of specific groups based on demographics?")
    private Boolean exploitsVulnerabilities;

    @Schema(description = "Does your system conduct social scoring for general purposes that could lead to detrimental or unfavourable treatment?")
    private Boolean conductsSocialScoring;

    @Schema(description = "Does your system use real-time remote biometric identification in publicly accessible spaces for law enforcement?")
    private Boolean usesRealTimeBiometric;

    @Schema(description = "Does your system use emotion recognition in workplaces or educational institutions?")
    private Boolean usesEmotionRecognition;

    @Schema(description = "Does your system create or expand facial recognition databases through untargeted scraping?")
    private Boolean createsFacialRecognitionDB;

    @Schema(description = "Does your system use predictive policing based solely on profiling or assessment of traits?")
    private Boolean usesPredictivePolicing;

    // High-Risk AI Practices Assessment
    @Schema(description = "Is your system used in biometrics for identification, categorization, or emotional recognition?")
    private Boolean usedInBiometrics;

    @Schema(description = "Is your system used in critical infrastructure where it poses safety risks?")
    private Boolean usedInCriticalInfrastructure;

    @Schema(description = "Is your system used in educational or vocational training with significant impact on access to education?")
    private Boolean usedInEducation;

    @Schema(description = "Is your system used in employment, worker management, or access to self-employment?")
    private Boolean usedInEmployment;

    @Schema(description = "Is your system used in access to essential private or public services (e.g., credit scoring, social benefits)?")
    private Boolean usedInEssentialServices;

    @Schema(description = "Is your system used in law enforcement with significant impact on people's lives?")
    private Boolean usedInLawEnforcement;

    @Schema(description = "Is your system used in migration, asylum, or border control management?")
    private Boolean usedInMigration;

    @Schema(description = "Is your system used in administration of justice and democratic processes?")
    private Boolean usedInJustice;

    @Schema(description = "Is your AI system a safety component of a product or a product itself covered by the Union harmonisation legislation?")
    private Boolean isSafetyComponent;

    // Transparency Requirements Assessment
    @Schema(description = "Does your system interact with humans (e.g. chatbots)?")
    private Boolean interactsWithHumans;

    @Schema(description = "Does your system generate or manipulate content (e.g. deepfakes)?")
    private Boolean generatesContent;

    @Schema(description = "Does your system use emotion recognition or biometric categorization?")
    private Boolean usesEmotionOrBiometric;

    // Getters and Setters
    public String getSystemName() {
        return systemName;
    }

    public void setSystemName(String systemName) {
        this.systemName = systemName;
    }

    public String getSystemPurpose() {
        return systemPurpose;
    }

    public void setSystemPurpose(String systemPurpose) {
        this.systemPurpose = systemPurpose;
    }

    public Boolean getUsesSubliminalTechniques() {
        return usesSubliminalTechniques;
    }

    public void setUsesSubliminalTechniques(Boolean usesSubliminalTechniques) {
        this.usesSubliminalTechniques = usesSubliminalTechniques;
    }

    public Boolean getExploitsVulnerabilities() {
        return exploitsVulnerabilities;
    }

    public void setExploitsVulnerabilities(Boolean exploitsVulnerabilities) {
        this.exploitsVulnerabilities = exploitsVulnerabilities;
    }

    public Boolean getConductsSocialScoring() {
        return conductsSocialScoring;
    }

    public void setConductsSocialScoring(Boolean conductsSocialScoring) {
        this.conductsSocialScoring = conductsSocialScoring;
    }

    public Boolean getUsesRealTimeBiometric() {
        return usesRealTimeBiometric;
    }

    public void setUsesRealTimeBiometric(Boolean usesRealTimeBiometric) {
        this.usesRealTimeBiometric = usesRealTimeBiometric;
    }

    public Boolean getUsesEmotionRecognition() {
        return usesEmotionRecognition;
    }

    public void setUsesEmotionRecognition(Boolean usesEmotionRecognition) {
        this.usesEmotionRecognition = usesEmotionRecognition;
    }

    public Boolean getCreatesFacialRecognitionDB() {
        return createsFacialRecognitionDB;
    }

    public void setCreatesFacialRecognitionDB(Boolean createsFacialRecognitionDB) {
        this.createsFacialRecognitionDB = createsFacialRecognitionDB;
    }

    public Boolean getUsesPredictivePolicing() {
        return usesPredictivePolicing;
    }

    public void setUsesPredictivePolicing(Boolean usesPredictivePolicing) {
        this.usesPredictivePolicing = usesPredictivePolicing;
    }

    public Boolean getUsedInBiometrics() {
        return usedInBiometrics;
    }

    public void setUsedInBiometrics(Boolean usedInBiometrics) {
        this.usedInBiometrics = usedInBiometrics;
    }

    public Boolean getUsedInCriticalInfrastructure() {
        return usedInCriticalInfrastructure;
    }

    public void setUsedInCriticalInfrastructure(Boolean usedInCriticalInfrastructure) {
        this.usedInCriticalInfrastructure = usedInCriticalInfrastructure;
    }

    public Boolean getUsedInEducation() {
        return usedInEducation;
    }

    public void setUsedInEducation(Boolean usedInEducation) {
        this.usedInEducation = usedInEducation;
    }

    public Boolean getUsedInEmployment() {
        return usedInEmployment;
    }

    public void setUsedInEmployment(Boolean usedInEmployment) {
        this.usedInEmployment = usedInEmployment;
    }

    public Boolean getUsedInEssentialServices() {
        return usedInEssentialServices;
    }

    public void setUsedInEssentialServices(Boolean usedInEssentialServices) {
        this.usedInEssentialServices = usedInEssentialServices;
    }

    public Boolean getUsedInLawEnforcement() {
        return usedInLawEnforcement;
    }

    public void setUsedInLawEnforcement(Boolean usedInLawEnforcement) {
        this.usedInLawEnforcement = usedInLawEnforcement;
    }

    public Boolean getUsedInMigration() {
        return usedInMigration;
    }

    public void setUsedInMigration(Boolean usedInMigration) {
        this.usedInMigration = usedInMigration;
    }

    public Boolean getUsedInJustice() {
        return usedInJustice;
    }

    public void setUsedInJustice(Boolean usedInJustice) {
        this.usedInJustice = usedInJustice;
    }

    public Boolean getIsSafetyComponent() {
        return isSafetyComponent;
    }

    public void setIsSafetyComponent(Boolean isSafetyComponent) {
        this.isSafetyComponent = isSafetyComponent;
    }

    public Boolean getInteractsWithHumans() {
        return interactsWithHumans;
    }

    public void setInteractsWithHumans(Boolean interactsWithHumans) {
        this.interactsWithHumans = interactsWithHumans;
    }

    public Boolean getGeneratesContent() {
        return generatesContent;
    }

    public void setGeneratesContent(Boolean generatesContent) {
        this.generatesContent = generatesContent;
    }

    public Boolean getUsesEmotionOrBiometric() {
        return usesEmotionOrBiometric;
    }

    public void setUsesEmotionOrBiometric(Boolean usesEmotionOrBiometric) {
        this.usesEmotionOrBiometric = usesEmotionOrBiometric;
    }
} 