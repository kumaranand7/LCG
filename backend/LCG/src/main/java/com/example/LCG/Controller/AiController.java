package com.example.LCG.Controller;

import com.example.LCG.Service.AiService;
import com.example.LCG.dto.AiRequest;
import com.example.LCG.dto.AiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/extract")
    public ResponseEntity<AiResponse> extract(@RequestBody AiRequest request) throws Exception {
        AiResponse response = aiService.extractFromSummary(request.getSummary());
        return ResponseEntity.ok(response);
    }
}