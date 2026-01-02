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
                .getResourceAsStream("templates/cover.png");

        BufferedImage image = ImageIO.read(is);
        Graphics2D g = image.createGraphics();

        //Makes text much smoother
        g.setRenderingHint(
                RenderingHints.KEY_TEXT_ANTIALIASING,
                RenderingHints.VALUE_TEXT_ANTIALIAS_ON
        );

        // Load custom font
        InputStream fontStream = getClass()
                .getClassLoader()
                .getResourceAsStream("fonts/Montserrat-Bold.ttf");

        if (fontStream == null) {
            throw new RuntimeException("Font file not found");
        }

        Font baseFont = Font.createFont(Font.TRUETYPE_FONT, fontStream);
        Font nameFont = baseFont.deriveFont(Font.BOLD, 40f);
        Font roleFont = baseFont.deriveFont(Font.PLAIN, 28f);
        Font skillsFont = baseFont.deriveFont(Font.PLAIN, 22f);


        // NAME
        g.setColor(Color.BLACK);
        //g.setFont(new Font("Arial", Font.BOLD, 40));
        g.setFont(nameFont);

        String nameText = request.getName();
        FontMetrics nameFm = g.getFontMetrics();
        int nameX = (image.getWidth() - nameFm.stringWidth(nameText)) / 2;
        int nameY = 150;

        g.drawString(nameText, nameX, nameY);

        // ROLE
//        g.setColor(new Color(3, 152, 158));
//
//        //g.setFont(new Font("Arial", Font.PLAIN, 28));
//        g.setFont(roleFont);
//
//        String roleText = request.getRole();
//        FontMetrics roleFm = g.getFontMetrics();
//        int roleX = (image.getWidth() - roleFm.stringWidth(roleText)) / 2;
//        int roleY = 200;
//
//        g.drawString(roleText, roleX, roleY);
        g.setFont(roleFont);

        String roleText = request.getRole();
        FontMetrics roleFm = g.getFontMetrics();

        int textWidth = roleFm.stringWidth(roleText);
        int textHeight = roleFm.getHeight();

        int paddingX = 20;
        int paddingY = 10;

        int rectX = (image.getWidth() - textWidth) / 2 - paddingX;
        int rectY = 200 - textHeight + paddingY;

        int rectWidth = textWidth + paddingX * 2;
        int rectHeight = textHeight + paddingY;

        int arc = rectHeight;

        g.setColor(Color.decode("#ff5757"));
        g.fillRoundRect(rectX, rectY, rectWidth, rectHeight, arc, arc);

        g.setColor(Color.WHITE);
        int textX = (image.getWidth() - textWidth) / 2;
        int textY = 200;

        g.drawString(roleText, textX, textY);


        // SKILLS
        g.setColor(Color.BLACK);
        //g.setFont(new Font("Arial", Font.PLAIN, 22));
        g.setFont(skillsFont);

        String skillsText = request.getSkills();
        FontMetrics skillsFm = g.getFontMetrics();
        int skillsX = (image.getWidth() - skillsFm.stringWidth(skillsText)) / 2;
        int skillsY = 250;

        g.drawString(skillsText, skillsX, skillsY);

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
