package com.skillshare.SkillShareApp.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginRequestDTO {
    public String email;
    public String password;
    public String token;
}
