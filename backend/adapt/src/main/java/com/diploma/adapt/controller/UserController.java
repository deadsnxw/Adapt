package com.diploma.adapt.controller;

import java.security.Principal;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.diploma.adapt.dto.UserProfileDTO;
import com.diploma.adapt.dto.UserUpdateDTO;
import com.diploma.adapt.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public UserProfileDTO getUserProfile(Principal principal) {
        return userService.getUserProfile(principal.getName());
    }

    @PutMapping("/me")
    public UserProfileDTO updateUserProfile(Principal principal, @Valid @RequestBody UserUpdateDTO dto) {
        return userService.updateUserProfile(principal.getName(), dto);
    }

    @DeleteMapping("/me")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUserProfile(Principal principal) {
        userService.deleteUserProfile(principal.getName());
    }
}