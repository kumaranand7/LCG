package com.example.LCG.Service;

import com.example.LCG.dto.CoverRequest;
import com.example.LCG.dto.StyleConfig;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;

@Service
public class CoverImageService {

    public String generateCover(CoverRequest request) throws Exception {

        BufferedImage image =
                ImageIO.read(new File(getTemplatePath(request.getTemplateId())));

        Graphics2D g = image.createGraphics();
        g.setRenderingHint(
                RenderingHints.KEY_ANTIALIASING,
                RenderingHints.VALUE_ANTIALIAS_ON
        );

        int width = image.getWidth();
        int height = image.getHeight();

        StyleConfig style = request.getStyle();

        // ================= NAME =================
        g.setColor(Color.decode(style.getName().getColor()));
        g.setFont(new Font(
                "SansSerif",
                Font.BOLD,
                style.getName().getFontSize()
        ));
        drawCenteredText(
                g,
                request.getName(),
                width,
                height / 2 - 40
        );

        // ================= ROLE BADGE =================
        drawCenteredBadge(
                g,
                request.getRole(),
                width,
                height / 2,
                style.getRole()
        );

        // ================= SKILLS =================
        g.setColor(Color.decode(style.getSkills().getColor()));
        g.setFont(new Font("SansSerif", Font.PLAIN, 16));
        drawCenteredText(
                g,
                request.getSkills(),
                width,
                height / 2 + 50
        );

        g.dispose();

        String fileName = "cover_" + System.currentTimeMillis() + ".png";
        File output = new File("uploads/generated/" + fileName);
        ImageIO.write(image, "png", output);

        return fileName;
    }

    // ================= HELPERS =================

    private String getTemplatePath(int templateId) {
        return switch (templateId) {
            case 1 -> "templates/template1.png";
            case 2 -> "templates/template2.png";
            case 3 -> "templates/template3.png";
            default -> "templates/template1.png";
        };
    }

    private void drawCenteredText(Graphics2D g, String text, int width, int y) {
        FontMetrics fm = g.getFontMetrics();
        int x = (width - fm.stringWidth(text)) / 2;
        g.drawString(text, x, y);
    }

    private void drawCenteredBadge(
            Graphics2D g,
            String text,
            int width,
            int y,
            StyleConfig.TextStyle roleStyle
    ) {
        g.setFont(new Font(
                "SansSerif",
                Font.BOLD,
                roleStyle.getFontSize()
        ));
        FontMetrics fm = g.getFontMetrics();

        int textWidth = fm.stringWidth(text);
        int textHeight = fm.getHeight();
        int x = (width - textWidth) / 2;

        // Background pill
        g.setColor(Color.decode(roleStyle.getBackgroundColor()));
        g.fillRoundRect(
                x - 20,
                y - textHeight + 8,
                textWidth + 40,
                textHeight,
                30,
                30
        );

        // Text
        g.setColor(Color.decode(roleStyle.getColor()));
        g.drawString(text, x, y);
    }
}
