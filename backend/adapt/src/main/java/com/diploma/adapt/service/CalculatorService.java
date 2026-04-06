package com.diploma.adapt.service;

import org.springframework.stereotype.Service;

import com.diploma.adapt.dto.NutritionDTO;
import com.diploma.adapt.model.ActivityLevel;
import com.diploma.adapt.model.Gender;
import com.diploma.adapt.model.Goal;
import com.diploma.adapt.model.User;

@Service
public class CalculatorService {
    public NutritionDTO calculateNutrition(User user) {
        double bmr = calculateBMR(user.getWeight(), user.getHeight(), user.getAge(), user.getGender());
        double tdee = calculateTDEE(bmr, user.getActivityLevel());
        Integer calories = calculateFinalCalories(tdee, user.getGoal());

        double proteinMultiplier = switch (user.getGoal()) {
            case LOSS   -> 2.2;
            case GAIN   -> 1.9;
            case MAINTAIN -> 1.7;
        };

        double fatMultiplier = switch (user.getGoal()) {
            case LOSS   -> 0.9;
            case GAIN   -> 1.1;
            case MAINTAIN -> 1.0; 
        };

        int targetProtein = (int) Math.round(user.getWeight() * proteinMultiplier);
        int proteinCalories = targetProtein * 4;

        int targetFat = (int) Math.round(user.getWeight() * fatMultiplier);
        int fatCalories = targetFat * 9;

        int carbsCalories = calories - (fatCalories + proteinCalories);
        int targetCarbs =  Math.max(100, (int) Math.round(carbsCalories / 4));

        int targetCalories = (targetCarbs == 100)
            ? proteinCalories + fatCalories + 400
            : calories;

        return new NutritionDTO(targetCalories, targetProtein, targetFat, targetCarbs);
    }

    public double calculateBMR(double weight, int height, int age, Gender gender) {
        double bmr = 0.0;

        if (gender == Gender.MALE) {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }

        return bmr;
    }

    public double calculateTDEE(double bmr, ActivityLevel activityLevel) {
        double tdee = 0.0;

        switch (activityLevel) {
            case SEDENTARY ->
                tdee = bmr * 1.2;
            
            case LIGHT ->
                tdee = bmr * 1.375;

            case MODERATE ->
                tdee = bmr * 1.55;

            case ACTIVE ->
                tdee = bmr * 1.725;

            case VERY_ACTIVE ->
                tdee = bmr * 1.9;
        }

        return tdee;
    }

    public Integer calculateFinalCalories(double tdee, Goal goal) {
        double calories = tdee;
        
        switch (goal) {
            case LOSS ->
                calories = tdee - (0.20 * tdee);

            case MAINTAIN ->
                calories = tdee;

            case GAIN ->
                calories = tdee + (0.15 * tdee);
        }

        return (int) Math.round(calories);
    }
}