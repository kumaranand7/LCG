package com.example.LCG.dto;

import lombok.Data;

@Data
public class CoverRequest {
    private String name;
    private String role;
    private String skills;

    public String getName() {
        return name;
    }

    public String getRole() {
        return role;
    }

    public String getSkills() {
        return skills;
    }
}
