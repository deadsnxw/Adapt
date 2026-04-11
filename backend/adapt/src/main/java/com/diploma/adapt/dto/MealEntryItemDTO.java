package com.diploma.adapt.dto;

import java.util.UUID;

public record MealEntryItemDTO (
    UUID id,
    String productName,
    Double amount,
    Double calories,
    Double protein,
    Double fat,
    Double carbs
) {}