package com.euaiact.classifier.model;

import java.util.List;

public class ClassificationResponse {
    private String systemName;
    private String systemPurpose;
    private String riskCategory;
    private List<String> recommendations;
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
