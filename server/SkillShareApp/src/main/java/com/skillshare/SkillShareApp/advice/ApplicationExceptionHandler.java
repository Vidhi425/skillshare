package com.skillshare.SkillShareApp.advice;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.skillshare.SkillShareApp.dto.response.ResponseDTO;

@RestControllerAdvice
public class ApplicationExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ResponseDTO> handleRuntimeException(RuntimeException e) {
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setMessage(e.getMessage());
        responseDTO.setSuccess(false);
        return ResponseEntity.badRequest().body(responseDTO);
    }
}
