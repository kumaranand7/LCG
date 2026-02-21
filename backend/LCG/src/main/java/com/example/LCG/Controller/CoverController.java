package com.example.LCG.Controller;

import com.example.LCG.Service.CoverImageService;
import com.example.LCG.dto.CoverRequest;
import com.example.LCG.dto.CoverResponse;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/covers")
@CrossOrigin
public class CoverController {

    private final CoverImageService service;

    public CoverController(CoverImageService service) {
        this.service = service;
    }

    @PostMapping("/generate")
    public ResponseEntity<CoverResponse> generateCover(
            @RequestBody CoverRequest request) throws Exception {

        String fileName = service.generateCover(request);
        String imageUrl = "/api/covers/image/" + fileName;

        return ResponseEntity.ok(new CoverResponse(imageUrl));
    }

    @GetMapping("/image/{fileName:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get("uploads/generated")
                    .resolve(fileName)
                    .normalize();

            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
