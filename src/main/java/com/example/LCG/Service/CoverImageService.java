package com.example.LCG.Service;

import com.example.LCG.dto.CoverRequest;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.InputStream;

@Service
public class CoverImageService {

    public String generateCover(CoverRequest request) throws Exception {

        // Load base image
        InputStream is = getClass()
                .getClassLoader()
                .getResourceAsStream("templates/img2.png");

        BufferedImage image = ImageIO.read(is);
        Graphics2D g = image.createGraphics();

        // Text styling
        g.setColor(Color.WHITE);
        g.setFont(new Font("Arial", Font.BOLD, 40));
        g.drawString(request.getName(), 100, 150);

        g.setFont(new Font("Arial", Font.PLAIN, 28));
        g.drawString(request.getRole(), 100, 200);

        g.setFont(new Font("Arial", Font.PLAIN, 22));
        g.drawString(request.getSkills(), 100, 250);

        g.dispose();

        // Save image
        File outputDir = new File("generated");
        if (!outputDir.exists()) outputDir.mkdirs();

        String fileName = "cover_" + System.currentTimeMillis() + ".png";
        File outputFile = new File(outputDir, fileName);
        ImageIO.write(image, "png", outputFile);

        return outputFile.getAbsolutePath();
    }
}
