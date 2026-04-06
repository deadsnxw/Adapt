package com.diploma.adapt.dto;

import java.util.UUID;

import com.diploma.adapt.model.ActivityLevel;
import com.diploma.adapt.model.Gender;
import com.diploma.adapt.model.Goal;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserProfileDTO {
    private UUID id;
    private String username;
    private Integer age;
    private Integer height;
    private Double weight;
    private Gender gender;
    private ActivityLevel activityLevel;
    private Goal goal;
    private Integer targetCalories;
}