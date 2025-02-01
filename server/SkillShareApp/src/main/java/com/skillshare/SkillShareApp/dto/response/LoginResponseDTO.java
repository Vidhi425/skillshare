package com.skillshare.SkillShareApp.dto.response;

import com.skillshare.SkillShareApp.model.User;

import lombok.*;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class LoginResponseDTO extends ResponseDTO {
    private String token;
    private User user;
}

