package com.skillshare.SkillShareApp.dto.request;

import com.skillshare.SkillShareApp.enums.Role;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NonNull;

@Data
public class ScheduledMeetRequestDTO {
    @NonNull
    @NotNull(message = "User Id cannot be null!")
    private Long userId;
    @NonNull
    @NotNull(message = "User Role Cannot be null!")
    private Role userRole;
}
