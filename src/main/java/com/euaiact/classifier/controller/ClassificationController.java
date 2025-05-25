package com.euaiact.classifier.controller;

import com.euaiact.classifier.model.ClassificationRequest;
import com.euaiact.classifier.model.ClassificationResponse;
import com.euaiact.classifier.service.ClassificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/classify")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
@Tag(name = "AI Classification", description = "API for classifying AI systems according to EU AI Act")
public class ClassificationController {

    private final ClassificationService classificationService;

    @Autowired
    public ClassificationController(ClassificationService classificationService) {
        this.classificationService = classificationService;
    }

    @Operation(
        summary = "Classify an AI system",
        description = "Analyzes an AI system's characteristics and determines its risk category according to the EU AI Act"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Classification successful",
            content = @Content(schema = @Schema(implementation = ClassificationResponse.class))
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Invalid input",
            content = @Content(schema = @Schema(implementation = Map.class))
        )
    })
    @PostMapping
    public ResponseEntity<ClassificationResponse> classify(@Valid @RequestBody ClassificationRequest request) {
        ClassificationResponse response = classificationService.classify(request);
        return ResponseEntity.ok(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.badRequest().body(errors);
    }
} 