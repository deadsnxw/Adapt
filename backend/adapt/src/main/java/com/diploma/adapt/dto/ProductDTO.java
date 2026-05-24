package com.diploma.adapt.dto;

import java.util.UUID;

import com.diploma.adapt.model.ProductSource;

public record ProductDTO(
    UUID id,
    String productName,
    Double calories,
    Double protein,
    Double fat,
    Double carbs,
    ProductSource source,
    String createdBy,
    String externalId
) {}