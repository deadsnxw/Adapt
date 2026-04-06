package com.diploma.adapt.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.NoSuchElementException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.io.DecodingException;

import org.springframework.web.bind.MethodArgumentNotValidException;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(NoSuchElementException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public ApiError handleNotFoundException(NoSuchElementException ex) {
		return new ApiError(404, ex.getMessage());
	}

	@ExceptionHandler(ConstraintViolationException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ApiError handleBadRequestException(ConstraintViolationException ex) {
		return new ApiError(400, "You missed a mandatory field");
	}

	@ExceptionHandler(IllegalArgumentException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ApiError handleIllegalArgumentException(IllegalArgumentException ex) {
		return new ApiError(400, ex.getMessage());
	}

	@ExceptionHandler(MethodArgumentTypeMismatchException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ApiError handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException ex) {
		return new ApiError(400, "Wrong parameter type in URL");
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ApiError handleNotValid(MethodArgumentNotValidException ex) {
		return new ApiError(400, ex.getBindingResult().getFieldError().getDefaultMessage());
	}

	@ExceptionHandler(DecodingException.class)
	@ResponseStatus(HttpStatus.FORBIDDEN)
	public ApiError handleDecoding(DecodingException ex) {
		return new ApiError(403, "Wrong or expired token");
	}

	@ExceptionHandler(ExpiredJwtException.class)
	@ResponseStatus(HttpStatus.FORBIDDEN)
	public ApiError handleExpired(ExpiredJwtException ex) {
		return new ApiError(403, "Wrong or expired token");
	}
}