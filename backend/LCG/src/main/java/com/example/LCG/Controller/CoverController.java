package com.example.LCG.Controller;
import com.example.LCG.dto.CoverResponse;
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
    public ResponseEntity<CoverResponse> generateCover(
            @RequestBody CoverRequest request) throws Exception {

        String fileName = service.generateCover(request);
        String imageUrl = "/generated/" + fileName;

        return ResponseEntity.ok(new CoverResponse(imageUrl));

    }

}
