package com.diploma.adapt.dto;

import com.diploma.adapt.model.ProductSource;

import jakarta.validation.constraints.*;

public record ProductCreateDTO(
    
    @NotBlank
    @Size(max = 250)
    String productName,

    @NotNull
    @Min(0)
    @Max(900)
    Double calories,

    @NotNull
    @Min(0)
    @Max(100)
    Double protein,

    @NotNull
    @Min(0)
    @Max(100)
    Double fat,

    @NotNull
    @Min(0)
    @Max(100)
    Double carbs,

    String externalId,

    ProductSource source
) {}