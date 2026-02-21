package com.example.LCG.dto;

public class CoverRequest {

    private String name;
    private String role;
    private String skills;
    private int templateId;

    private StyleConfig style;

    // ===== GETTERS =====

    public String getName() {
        return name;
    }

    public String getRole() {
        return role;
    }

    public String getSkills() {
        return skills;
    }

    public int getTemplateId() {
        return templateId;
    }

    public StyleConfig getStyle() {
        return style;
    }

    // ===== SETTERS =====

    public void setName(String name) {
        this.name = name;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public void setTemplateId(int templateId) {
        this.templateId = templateId;
    }

    public void setStyle(StyleConfig style) {
        this.style = style;
    }
}
