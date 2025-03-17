package com.skillshare.SkillShareApp.controller;

import com.skillshare.SkillShareApp.dto.request.AppointmentResponseRequestDTO;
import com.skillshare.SkillShareApp.dto.response.AppointmentListResponseDTO;
import com.skillshare.SkillShareApp.repo.AppointmentRepo;
import com.skillshare.SkillShareApp.service.Appointment.AppointmentService;
import com.skillshare.SkillShareApp.service.Contract.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("mentor")
public class MentorController {

    @Autowired
    private ContractService contractService;

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/appointment-respond")
    public ResponseEntity<?> handleAppointmentResponse(@RequestBody AppointmentResponseRequestDTO request) {
        System.out.println(request);
        return contractService.handleAppointmentResponse(request.getAppointmentId(), request.getIsAccepted(), request.getMeetingDetails());
    }

    @GetMapping("/pending-appointment/{mentorId}")
    public ResponseEntity<AppointmentListResponseDTO> getAppointments(@PathVariable Long mentorId) {
        return appointmentService.getPendingAppointments(mentorId);
    }
}
