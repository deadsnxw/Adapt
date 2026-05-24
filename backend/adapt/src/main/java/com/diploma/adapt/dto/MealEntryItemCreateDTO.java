package com.diploma.adapt.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

import com.diploma.adapt.model.MealType;

public record MealEntryItemCreateDTO (

    ProductCreateDTO product,

    @NotNull
    @Min(1)
    Double amount,

    @NotNull
    LocalDate date,

    @NotNull
    MealType mealType
) {}