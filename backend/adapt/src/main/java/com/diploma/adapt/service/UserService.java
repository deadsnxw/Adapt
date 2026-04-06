package com.diploma.adapt.service;

import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.diploma.adapt.dto.NutritionDTO;
import com.diploma.adapt.dto.UserProfileDTO;
import com.diploma.adapt.dto.UserUpdateDTO;
import com.diploma.adapt.mapper.UserMapper;
import com.diploma.adapt.model.User;
import com.diploma.adapt.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final CalculatorService calculatorService;

    public UserService(UserRepository userRepository, UserMapper userMapper, CalculatorService calculatorService) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.calculatorService = calculatorService;
    }

    public UserProfileDTO getUserProfile(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException("User not found"));

        UserProfileDTO dto = userMapper.toProfileDTO(user);

        NutritionDTO nutrients = calculatorService.calculateNutrition(user);

        dto.setTargetCalories(nutrients.calories());
        dto.setTargetProtein(nutrients.protein());
        dto.setTargetFat(nutrients.fat());
        dto.setTargetCarbs(nutrients.carbs());

        return dto;
    }

    public UserProfileDTO updateUserProfile(String username, UserUpdateDTO dto) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException("User not found"));

        user.setAge(dto.getAge());
        user.setHeight(dto.getHeight());
        user.setWeight(dto.getWeight());
        user.setGender(dto.getGender());
        user.setActivityLevel(dto.getActivityLevel());
        user.setGoal(dto.getGoal());

        User saved = userRepository.save(user);

        UserProfileDTO responseDto = userMapper.toProfileDTO(saved);

        NutritionDTO nutrients = calculatorService.calculateNutrition(saved);

        responseDto.setTargetCalories(nutrients.calories());
        responseDto.setTargetProtein(nutrients.protein());
        responseDto.setTargetFat(nutrients.fat());
        responseDto.setTargetCarbs(nutrients.carbs());

        return responseDto;
    }

    public void deleteUserProfile(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException("User not found"));

        userRepository.delete(user);
    }
}