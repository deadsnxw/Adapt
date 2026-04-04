package com.diploma.adapt.exception;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ApiError {
	private int status;
	private String message;
}