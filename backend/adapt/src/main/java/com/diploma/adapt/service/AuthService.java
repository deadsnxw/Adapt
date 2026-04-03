package com.diploma.adapt.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.diploma.adapt.dto.UserRegistrationDTO;
import com.diploma.adapt.repository.UserRepository;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void registerUser(UserRegistrationDTO dto) {
        String user = dto.getUsername();

        if (userRepository.existsByUsername(user)) {
            throw new IllegalArgumentException("Користучач з таким іменем вже існує");
        }
    }
}