package com.example.LCG.dto;

public class StyleConfig {

    private String textAlign;
    private TextStyle name;
    private TextStyle role;
    private SkillsStyle skills;

    // ---------- getters & setters ----------

    public String getTextAlign() {
        return textAlign;
    }

    public void setTextAlign(String textAlign) {
        this.textAlign = textAlign;
    }

    public TextStyle getName() {
        return name;
    }

    public void setName(TextStyle name) {
        this.name = name;
    }

    public TextStyle getRole() {
        return role;
    }

    public void setRole(TextStyle role) {
        this.role = role;
    }

    public SkillsStyle getSkills() {
        return skills;
    }

    public void setSkills(SkillsStyle skills) {
        this.skills = skills;
    }

    // ---------- INNER CLASSES ----------

    public static class TextStyle {
        private String color;
        private int fontSize;
        private String backgroundColor;

        public String getColor() {
            return color;
        }

        public void setColor(String color) {
            this.color = color;
        }

        public int getFontSize() {
            return fontSize;
        }

        public void setFontSize(int fontSize) {
            this.fontSize = fontSize;
        }

        public String getBackgroundColor() {
            return backgroundColor;
        }

        public void setBackgroundColor(String backgroundColor) {
            this.backgroundColor = backgroundColor;
        }
    }

    public static class SkillsStyle {
        private String color;

        public String getColor() {
            return color;
        }

        public void setColor(String color) {
            this.color = color;
        }
    }
}
