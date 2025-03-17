package com.skillshare.SkillShareApp.dto.request;


import com.skillshare.SkillShareApp.dto.MeetDetails;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentResponseRequestDTO {
    private Long appointmentId;
    private Boolean isAccepted;
    private MeetDetails meetingDetails;
}
