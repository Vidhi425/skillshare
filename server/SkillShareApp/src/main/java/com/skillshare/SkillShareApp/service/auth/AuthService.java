package com.skillshare.SkillShareApp.service.auth;


import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skillshare.SkillShareApp.config.JwtTokenProvider;
import com.skillshare.SkillShareApp.dto.request.LoginRequestDTO;
import com.skillshare.SkillShareApp.dto.request.RegistrationRequestDTO;
import com.skillshare.SkillShareApp.dto.response.LoginResponseDTO;
import com.skillshare.SkillShareApp.dto.response.RegistrationResponseDTO;
import com.skillshare.SkillShareApp.enums.Role;
import com.skillshare.SkillShareApp.model.Mentor;
import com.skillshare.SkillShareApp.model.User;
import com.skillshare.SkillShareApp.repo.MentorRepo;
import com.skillshare.SkillShareApp.repo.UserRepo;

import io.micrometer.common.util.StringUtils;

@Service
@Transactional
public class AuthService {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private MentorRepo mentorRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    public ResponseEntity<LoginResponseDTO> getUserAfterLogin(LoginRequestDTO loginRequestDTO) {
        if (loginRequestDTO.getToken() != null && !loginRequestDTO.getToken().isEmpty()) {
            if (jwtTokenProvider.validateToken(loginRequestDTO.getToken())) {
                String email = jwtTokenProvider.getUsernameFromToken(loginRequestDTO.getToken());
                User user = userRepo.findByEmail(email);
    
                if (user != null) {
                    return ResponseEntity.ok(LoginResponseDTO.builder()
                            .token(loginRequestDTO.getToken())
                            .message("Login successful via token")
                            .success(true)
                            .user(user)
                            .build());
                }
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(LoginResponseDTO.builder()
                                .message("Invalid token: User not found.")
                                .success(false)
                                .build());
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(LoginResponseDTO.builder()
                            .message("Invalid or expired token.")
                            .success(false)
                            .build());
        } else {
            User user = userRepo.findByEmail(loginRequestDTO.getEmail());
            if (user != null && bCryptPasswordEncoder.matches(loginRequestDTO.getPassword(), user.getPassword())) {
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(loginRequestDTO.getEmail(), loginRequestDTO.getPassword())
                );
    
                String token = jwtTokenProvider.generateToken((UserDetails) authentication.getPrincipal());
    
                return ResponseEntity.ok(LoginResponseDTO.builder()
                        .token(token)  // Ensure the generated token is returned
                        .message("Login successful")
                        .success(true)
                        .user(user)
                        .build());
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(LoginResponseDTO.builder()
                            .message("Invalid Credentials")
                            .success(false)
                            .build());
        }
    }

    public ResponseEntity<RegistrationResponseDTO> registerUser(RegistrationRequestDTO registrationRequest) {
        validateRegistrationRequest(registrationRequest);

        if (userRepo.findByEmail(registrationRequest.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }

        // Convert image from Base64 to byte array
        byte[] profileImageBytes = registrationRequest.convertBase64ToHex();

        User newUser = User.builder()
                .firstName(registrationRequest.getFirstName())
                .lastName(registrationRequest.getLastName())
                .userName(registrationRequest.getUserName())
                .email(registrationRequest.getEmail())
                .password(bCryptPasswordEncoder.encode(registrationRequest.getPassword()))
                .profileImage(profileImageBytes)
                .bio(registrationRequest.getBio())
                .role(registrationRequest.getRole())
                .build();

        newUser = userRepo.save(newUser);

        // Handle Mentor-specific logic
        if (Role.MENTOR.equals(registrationRequest.getRole())) {
            if (registrationRequest.getProficiencies() == null || registrationRequest.getProficiencies().isEmpty()) {
                throw new RuntimeException("Mentors must have at least one proficiency.");
            }

            Mentor mentor = Mentor.builder()
                    .proficiencies(registrationRequest.getProficiencies())
                    .rating(0.0) // Initial rating
                    .build();

            Mentor savedMentor = mentorRepo.save(mentor);
            newUser.setMentorId(savedMentor.getMentorId());
            userRepo.save(newUser);
        }

        return ResponseEntity.ok(RegistrationResponseDTO.builder()
                .message("User registered successfully")
                .success(true)
                .build());
    }

    private void validateRegistrationRequest(RegistrationRequestDTO request) {
        if (StringUtils.isEmpty(request.getFirstName())) {
            throw new RuntimeException("First name is required.");
        }

        if (StringUtils.isEmpty(request.getLastName())) {
            throw new RuntimeException("Last name is required.");
        }

        if (StringUtils.isEmpty(request.getUserName())) {
            throw new RuntimeException("Username is required.");
        }

        if (StringUtils.isEmpty(request.getEmail())) {
            throw new RuntimeException("Email is required.");
        }

        if (StringUtils.isEmpty(request.getPassword()) || request.getPassword().length() < 8) {
            throw new RuntimeException("Password must be at least 8 characters long.");
        }

        if (request.getRole() == null) {
            throw new RuntimeException("User role is required.");
        }
    }
    
}