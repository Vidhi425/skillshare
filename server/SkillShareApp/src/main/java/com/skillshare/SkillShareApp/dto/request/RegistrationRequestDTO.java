package com.skillshare.SkillShareApp.dto.request;

import java.util.List;

import com.skillshare.SkillShareApp.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationRequestDTO {
    private String firstName;
    private String lastName;
    private String userName;
    private String email;
    private String password;
    private String profileImageBase64;
    private String bio;
    private Role role;
    private List<String> proficiencies;
    private String certificateBase64;

    // Helper method to convert Base64 image to Hexadecimal string
    public byte[] convertBase64ToHex() {
        if (profileImageBase64 == null || profileImageBase64.isEmpty()) {
            return null;
        }
        byte[] imageBytes = java.util.Base64.getDecoder().decode(profileImageBase64);
        return imageBytes;
    }
}
