package com.euaiact.classifier.controller;

import com.euaiact.classifier.model.ClassificationRequest;
import com.euaiact.classifier.model.ClassificationResponse;
import com.euaiact.classifier.service.ClassificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/classify")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
public class ClassificationController {

    private final ClassificationService classificationService;

    @Autowired
    public ClassificationController(ClassificationService classificationService) {
        this.classificationService = classificationService;
    }

    @PostMapping
    public ClassificationResponse classify(@RequestBody ClassificationRequest request) {
        return classificationService.classify(request);
    }
} 