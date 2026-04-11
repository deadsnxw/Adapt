package com.diploma.adapt.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.diploma.adapt.dto.MealEntryItemCreateDTO;
import com.diploma.adapt.dto.MealEntryItemDTO;
import com.diploma.adapt.model.MealEntry;
import com.diploma.adapt.model.MealEntryItem;
import com.diploma.adapt.model.Product;
import com.diploma.adapt.model.User;

@Mapper(componentModel = "spring")
public interface MealMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", source = "user")
    @Mapping(target = "date", source = "dto.date")
    @Mapping(target = "type", source = "dto.mealType")
    MealEntry toMealEntry(MealEntryItemCreateDTO dto, User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "meal", source = "meal")
    @Mapping(target = "productDetails", source = "product")
    @Mapping(target = "amount", source = "dto.amount")
    MealEntryItem toMealEntryItem(MealEntryItemCreateDTO dto, MealEntry meal, Product product);

    default MealEntryItemDTO toMealEntryItemDTO(MealEntryItem item) {
        Product product = item.getProductDetails();
        Double amount = item.getAmount();

        return new MealEntryItemDTO(
            item.getId(),
            product.getProductName(),
            amount,
            (product.getCalories() / 100.0) * amount,
            (product.getProtein() / 100.0) * amount,
            (product.getFat() / 100.0) * amount,
            (product.getCarbs() / 100.0) * amount
        );
    }
}