package com.diploma.adapt.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.diploma.adapt.dto.ProductCreateDTO;
import com.diploma.adapt.dto.ProductDTO;
import com.diploma.adapt.dto.ProductUpdateDTO;
import com.diploma.adapt.model.Product;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(source = "createdBy.username", target = "createdBy", defaultValue = "System")
    ProductDTO toProductDTO(Product product);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "source", source = "source")
    @Mapping(target = "externalId", source = "externalId")
    @Mapping(target = "createdBy", ignore = true)
    Product toProduct(ProductCreateDTO dto);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "source", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    void updateProductFromDto(ProductUpdateDTO dto, @MappingTarget Product product);
}