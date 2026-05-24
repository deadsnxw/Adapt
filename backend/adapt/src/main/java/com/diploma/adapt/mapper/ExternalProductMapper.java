package com.diploma.adapt.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.diploma.adapt.dto.ApiProductResponseDTO;
import com.diploma.adapt.dto.ProductDTO;

@Mapper(componentModel = "spring")
public interface ExternalProductMapper {

    @Mapping(source = "nutriments.calories", target = "calories")
    @Mapping(source = "nutriments.protein", target = "protein")
    @Mapping(source = "nutriments.fat", target = "fat")
    @Mapping(source = "nutriments.carbs", target = "carbs")
    @Mapping(target = "source", constant = "EXTERNAL")
    @Mapping(source = "code", target = "externalId")
    ProductDTO toProductDTO(ApiProductResponseDTO apiProduct);
}