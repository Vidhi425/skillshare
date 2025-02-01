package com.skillshare.SkillShareApp.advice;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.skillshare.SkillShareApp.dto.response.ResponseDTO;

@RestControllerAdvice
public class ApplicationExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ResponseDTO> handleRuntimeException(RuntimeException e) {
        return ResponseEntity.badRequest().body(ResponseDTO.builder().message(e.getMessage()).success(false).build());
    }
}
