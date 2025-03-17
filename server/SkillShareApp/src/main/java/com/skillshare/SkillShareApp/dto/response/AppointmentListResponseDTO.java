package com.skillshare.SkillShareApp.dto.response;

import com.skillshare.SkillShareApp.model.Appointment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class AppointmentListResponseDTO extends ResponseDTO {
    private List<Appointment> appointments;
}
