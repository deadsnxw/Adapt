package com.diploma.adapt.controller;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.diploma.adapt.dto.MealEntryDTO;
import com.diploma.adapt.dto.MealEntryItemCreateDTO;
import com.diploma.adapt.dto.MealEntryItemUpdateDTO;
import com.diploma.adapt.service.MealService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/diary")
public class MealController {
    private final MealService mealService;

    public MealController(MealService mealService) {
        this.mealService = mealService;
    }

    @PostMapping("/items")
    @ResponseStatus(HttpStatus.CREATED)
    public MealEntryDTO addFoodToDiary(@RequestBody @Valid MealEntryItemCreateDTO dto, Principal principal) {
        return mealService.addFoodToDiary(dto, principal.getName());
    }

    @GetMapping
    public List<MealEntryDTO> getAllMealEntries(@RequestParam LocalDate date, Principal principal) {
        return mealService.getAllMealEntries(date, principal.getName());
    }

    @PutMapping("/items/{id}")
    public MealEntryDTO updateFoodInEntry(@RequestBody @Valid MealEntryItemUpdateDTO dto, @PathVariable UUID id, Principal principal) {
        return mealService.updateFoodInEntry(dto, principal.getName(), id);
    }

    @DeleteMapping("/items/{id}")
    public MealEntryDTO deleteFoodFromEntry(@PathVariable UUID id, Principal principal) {
        return mealService.deleteFoodFromEntry(id, principal.getName());
    }
}