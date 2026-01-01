package com.example.LCG.Controller;

import com.example.LCG.dto.CoverRequest;
import com.example.LCG.Service.CoverImageService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;

@RestController
@RequestMapping("/api/covers")
@CrossOrigin
public class CoverController {

    private final CoverImageService service;

    public CoverController(CoverImageService service) {
        this.service = service;
    }

    @PostMapping("/generate")
    public ResponseEntity<Resource> generateCover(@RequestBody CoverRequest request) throws Exception {

        String imagePath = service.generateCover(request);
        File file = new File(imagePath);

        Resource resource = new FileSystemResource(file);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + file.getName() + "\"")
                .body(resource);
    }
}
