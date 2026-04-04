package com.diploma.adapt.dto;

import lombok.*;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResponseDTO {
    private UUID id;
    private String token;
    private String username;
}