package com.diploma.adapt.service;

import org.springframework.stereotype.Service;
import com.diploma.adapt.model.ActivityLevel;
import com.diploma.adapt.model.Gender;
import com.diploma.adapt.model.Goal;
import com.diploma.adapt.model.User;

@Service
public class CalculatorService {
    public Integer calculateTargetCalories(User user) {
        double bmr = calculateBMR(user.getWeight(), user.getHeight(), user.getAge(), user.getGender());
        double tdee = calculateTDEE(bmr, user.getActivityLevel());
        return calculateFinalCalories(tdee, user.getGoal());
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
            case SEDENTARY:
                tdee = bmr * 1.2;
                break;
            
            case LIGHT:
                tdee = bmr * 1.375;
                break;

            case MODERATE:
                tdee = bmr * 1.55;
                break;

            case ACTIVE:
                tdee = bmr * 1.725;
                break;

            case VERY_ACTIVE:
                tdee = bmr * 1.9;
                break;
        }

        return tdee;
    }

    public Integer calculateFinalCalories(double tdee, Goal goal) {
        double calories = tdee;
        
        switch (goal) {
            case LOSS:
                calories = tdee - (0.20 * tdee);
                break;

            case MAINTAIN:
                calories = tdee;
                break;

            case GAIN:
                calories = tdee + (0.15 * tdee);
                break;
        }

        return (int) Math.round(calories);
    }
}