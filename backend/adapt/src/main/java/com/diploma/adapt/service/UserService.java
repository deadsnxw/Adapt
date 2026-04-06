package com.diploma.adapt.service;

import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.diploma.adapt.dto.UserProfileDTO;
import com.diploma.adapt.dto.UserUpdateDTO;
import com.diploma.adapt.mapper.UserMapper;
import com.diploma.adapt.model.User;
import com.diploma.adapt.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public UserProfileDTO getUserProfile(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException("User not found"));

        return userMapper.toProfileDTO(user);
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

        return userMapper.toProfileDTO(saved);
    }

    public void deleteUserProfile(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException("User not found"));

        userRepository.delete(user);
    }
}