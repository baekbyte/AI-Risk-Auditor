package com.euaiact.classifier.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(description = "Response object containing the classification results and recommendations")
public class ClassificationResponse {
    @Schema(
        description = "Name of the AI system",
        example = "Customer Service Chatbot"
    )
    private String systemName;

    @Schema(
        description = "Purpose of the AI system",
        example = "AI-powered chatbot for handling customer service inquiries"
    )
    private String systemPurpose;

    @Schema(
        description = "Risk category assigned to the AI system",
        example = "High-Risk",
        allowableValues = {"High-Risk", "Limited Risk", "Minimal Risk", "PROHIBITED"}
    )
    private String riskCategory;

    @Schema(
        description = "List of recommendations based on the risk category",
        example = "[\"Implement a comprehensive risk management system\", \"Conduct thorough risk assessments\"]"
    )
    private List<String> recommendations;

    @Schema(
        description = "Indicates if the AI system falls under prohibited practices",
        example = "false"
    )
    @JsonProperty("isProhibited")
    private boolean isProhibited;

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

    public String getRiskCategory() {
        return riskCategory;
    }

    public void setRiskCategory(String riskCategory) {
        this.riskCategory = riskCategory;
    }

    public List<String> getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(List<String> recommendations) {
        this.recommendations = recommendations;
    }

    public boolean isProhibited() {
        return isProhibited;
    }

    public void setProhibited(boolean prohibited) {
        isProhibited = prohibited;
    }
} 
