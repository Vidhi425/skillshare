package com.skillshare.SkillShareApp.dto.request;

import com.skillshare.SkillShareApp.enums.Mode;
import lombok.Data;

@Data
public class AppointmentRequestDTO {
    private String title;
    private String description;
    private String topic;
    private Long userId;
    private Long mentorId;
    private Mode mode;
}

