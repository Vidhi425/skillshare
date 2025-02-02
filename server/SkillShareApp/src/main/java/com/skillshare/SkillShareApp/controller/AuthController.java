package com.skillshare.SkillShareApp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillshare.SkillShareApp.dto.request.LoginRequestDTO;
import com.skillshare.SkillShareApp.dto.request.RegistrationRequestDTO;
import com.skillshare.SkillShareApp.dto.response.LoginResponseDTO;
import com.skillshare.SkillShareApp.dto.response.RegistrationResponseDTO;
import com.skillshare.SkillShareApp.service.auth.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequestDTO) {
       return authService.getUserAfterLogin(loginRequestDTO);
    }
    
    @PostMapping("/register")
    public ResponseEntity<RegistrationResponseDTO> register(@RequestBody RegistrationRequestDTO registrationRequestDTO) {
       return authService.registerUser(registrationRequestDTO);
    }
}
