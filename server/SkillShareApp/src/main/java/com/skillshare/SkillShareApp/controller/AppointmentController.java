package com.skillshare.SkillShareApp.controller;

import com.skillshare.SkillShareApp.dto.request.AppointmentRequestDTO;
import com.skillshare.SkillShareApp.dto.response.AppointmentListResponseDTO;
import com.skillshare.SkillShareApp.dto.response.MentorSearchResponseDTO;
import com.skillshare.SkillShareApp.dto.response.ResponseDTO;
import com.skillshare.SkillShareApp.service.Appointment.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("user")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/mentor-search")
    public ResponseEntity<List<MentorSearchResponseDTO>> searchMentors(@RequestParam("name") String mentorName) {
        return appointmentService.mentorSearch(mentorName);
    }

    @PostMapping("/create-appointment")
    public ResponseEntity<ResponseDTO> createAppointment(@RequestBody AppointmentRequestDTO request) {
        return appointmentService.createAppointment(request);
    }

    @GetMapping("/pending-appointment/{mentorId}")
    public ResponseEntity<AppointmentListResponseDTO> getAppointments(@PathVariable Long mentorId) {
        return appointmentService.getPendingAppointments(mentorId);
    }

    @GetMapping("/all-appointments/{userId}")
    public ResponseEntity<AppointmentListResponseDTO> getAllAppointments(@PathVariable Long userId) {
        return appointmentService.getAllAppointments(userId);
    }
}
