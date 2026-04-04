package com.diploma.adapt.dto;

import lombok.*;
import jakarta.validation.constraints.*;

import com.diploma.adapt.model.Gender;
import com.diploma.adapt.model.ActivityLevel;
import com.diploma.adapt.model.Goal;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRegistrationDTO {
    
    @NotBlank
    @Size(max = 16)
    private String username;

    @NotBlank
    @Size(min = 8, max = 32)
    private String password;

    @NotNull
    @Min(1)
    @Max(120)
    private Integer age;

    @NotNull
    @Min(1)
    @Max(300)
    private Integer height;

    @NotNull
    @Min(1)
    @Max(200)
    private Double weight;

    @NotNull
    private Gender gender;

    @NotNull
    private ActivityLevel activityLevel;

    @NotNull
    private Goal goal;
}