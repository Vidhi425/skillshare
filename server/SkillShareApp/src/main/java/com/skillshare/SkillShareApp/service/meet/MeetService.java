package com.skillshare.SkillShareApp.service.meet;

import java.lang.ProcessBuilder.Redirect;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.skillshare.SkillShareApp.dto.request.ScheduledMeetRequestDTO;
import com.skillshare.SkillShareApp.dto.response.ScheduledMeetResponseDTO;
import com.skillshare.SkillShareApp.enums.Role;
import com.skillshare.SkillShareApp.repo.AppointmentRepo;
import com.skillshare.SkillShareApp.repo.ContractRepo;
import com.skillshare.SkillShareApp.repo.MeetRepository;
import com.skillshare.SkillShareApp.repo.MentorRepo;
import com.skillshare.SkillShareApp.repo.UserRepo;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class MeetService {
    
    @Autowired
    private ContractRepo contractRepo;

    @Autowired
    private AppointmentRepo appointmentRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private MentorRepo mentorRepo;

    @Autowired
    private MeetRepository meetRepo;

    public ResponseEntity<ScheduledMeetResponseDTO> getScheduledAppointmentDetails(ScheduledMeetRequestDTO scheduledMeetRequestDTO) {

        if (scheduledMeetRequestDTO == null) return ResponseEntity.badRequest().body(ScheduledMeetResponseDTO.builder().success(false).message("Invalid Request body.").build());

        if (!Arrays.stream(Role.values()).toList().contains(scheduledMeetRequestDTO.getUserRole())) {
            return ResponseEntity.badRequest().body(ScheduledMeetResponseDTO.builder().success(false).message("Invalid Request body.").build());
        }

        List<ScheduledMeetResponseDTO.ScheduledMeetDTO> scheduledMeets = scheduledMeetRequestDTO.getUserRole().equals(Role.USER) ? meetRepo.findScheduledMeetsUsingUserId(scheduledMeetRequestDTO.getUserId()) : meetRepo.findScheduledMeetsUsingMentorId(scheduledMeetRequestDTO.getUserId());

        if (scheduledMeets == null) throw new RuntimeException("Some error occured while fetching the scheduled meets");

        System.out.println("Scheduled Meets: " + scheduledMeets);

        return ResponseEntity.ok().body(ScheduledMeetResponseDTO.builder().success(true).message("Meets found.").scheduledMeets(scheduledMeets).build());
    }
}
