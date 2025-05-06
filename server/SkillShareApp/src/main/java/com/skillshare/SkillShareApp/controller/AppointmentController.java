package com.skillshare.SkillShareApp.controller;

import com.skillshare.SkillShareApp.dto.request.AppointmentRequestDTO;
import com.skillshare.SkillShareApp.dto.request.ScheduledMeetRequestDTO;
import com.skillshare.SkillShareApp.dto.response.AppointmentListResponseDTO;
import com.skillshare.SkillShareApp.dto.response.MentorSearchResponseDTO;
import com.skillshare.SkillShareApp.dto.response.ResponseDTO;
import com.skillshare.SkillShareApp.dto.response.ScheduledMeetResponseDTO;
import com.skillshare.SkillShareApp.service.Appointment.AppointmentService;
import com.skillshare.SkillShareApp.service.meet.MeetService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("user")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private MeetService meetService;

    @GetMapping("/mentor-search")
    public ResponseEntity<List<MentorSearchResponseDTO>> searchMentors(@RequestParam("name") String mentorName) {
        return appointmentService.mentorSearch(mentorName);
    }

    @PostMapping("/create-appointment")
    public ResponseEntity<ResponseDTO> createAppointment(@RequestBody AppointmentRequestDTO request) {
        return appointmentService.createAppointment(request);
    }

    @GetMapping("/all-appointments/{userId}")
    public ResponseEntity<AppointmentListResponseDTO> getAllAppointments(@PathVariable Long userId) {
        return appointmentService.getAllAppointments(userId);
    }

    @GetMapping("/get-meets")
    public ResponseEntity<ScheduledMeetResponseDTO> getMeets(@Valid ScheduledMeetRequestDTO scheduledMeetRequestDTO) {
       return meetService.getScheduledAppointmentDetails(scheduledMeetRequestDTO);
    }
}
