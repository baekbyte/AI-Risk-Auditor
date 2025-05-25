package com.euaiact.classifier.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ClassificationRequest {
    @NotBlank(message = "System name is required")
    @Size(min = 3, max = 100, message = "System name must be between 3 and 100 characters")
    private String systemName;

    @NotBlank(message = "System purpose is required")
    @Size(min = 10, max = 1000, message = "System purpose must be between 10 and 1000 characters")
    private String systemPurpose;

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
} 