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
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/classify")
@CrossOrigin(origins = "https://ai-risk-auditor.vercel.app") // Allow requests from deployed Vercel frontend
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

    @PostMapping("/download")
    public ResponseEntity<Resource> downloadResults(@RequestBody ClassificationResponse response, @RequestParam(defaultValue = "EUAIAct_Results.txt") String fileName) {
        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            OutputStreamWriter writer = new OutputStreamWriter(baos, StandardCharsets.UTF_8);

            // Header
            writer.write("=================================================\n");
            writer.write("EU AI ACT RISK CLASSIFICATION ASSESSMENT\n");
            writer.write("=================================================\n\n");

            // System details
            writer.write("SYSTEM INFORMATION\n");
            writer.write("-----------------\n");
            writer.write("System Name: " + response.getSystemName() + "\n");
            writer.write("System Purpose: " + response.getSystemPurpose() + "\n\n");

            // Classification results
            writer.write("CLASSIFICATION RESULT\n");
            writer.write("-------------------\n");
            writer.write("EU AI Act Classification: " + response.getRiskCategory() + "\n\n");

            // Risk category explanation
            writer.write("Risk Category Explanation:\n");
            switch (response.getRiskCategory()) {
                case "High-Risk":
                    writer.write("High-risk AI systems require substantial compliance measures \n");
                    writer.write("under the EU AI Act, including risk assessments, technical \n");
                    writer.write("documentation, and human oversight.\n");
                    break;
                case "Limited Risk":
                    writer.write("Limited risk AI systems must meet specific transparency \n");
                    writer.write("obligations, such as notifying users they are interacting \n");
                    writer.write("with an AI system or that content is artificially generated.\n");
                    break;
                case "Minimal Risk":
                    writer.write("Minimal risk AI systems have few regulatory obligations \n");
                    writer.write("under the EU AI Act, though voluntary codes of conduct \n");
                    writer.write("are encouraged.\n");
                    break;
                case "PROHIBITED":
                    writer.write("This AI system falls under prohibited practices according to the EU AI Act.\n");
                    writer.write("Consider consulting with a legal expert specializing in AI regulation.\n");
                    break;
            }
            writer.write("\n\n");

            // Recommendations
            writer.write("COMPLIANCE RECOMMENDATIONS\n");
            writer.write("-------------------------\n");
            int count = 1;
            for (String recommendation : response.getRecommendations()) {
                writer.write(count + ". " + recommendation + "\n");
                count++;
            }
            writer.write("\n");

            // Disclaimer
            writer.write("=================================================\n");
            writer.write("DISCLAIMER: This assessment is provided for informational purposes only \n");
            writer.write("and should not be considered legal advice. Consult with legal experts \n");
            writer.write("for a comprehensive compliance assessment with the EU AI Act.\n");
            writer.write("=================================================\n");

            writer.flush();
            writer.close();

            ByteArrayResource resource = new ByteArrayResource(baos.toByteArray());
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                    .contentType(MediaType.TEXT_PLAIN)
                    .contentLength(resource.contentLength())
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
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