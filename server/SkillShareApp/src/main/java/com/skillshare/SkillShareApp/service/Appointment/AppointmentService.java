package com.skillshare.SkillShareApp.service.Appointment;

import com.skillshare.SkillShareApp.dto.request.AppointmentRequestDTO;
import com.skillshare.SkillShareApp.dto.response.AppointmentListResponseDTO;
import com.skillshare.SkillShareApp.dto.response.MentorSearchResponseDTO;
import com.skillshare.SkillShareApp.dto.response.ResponseDTO;
import com.skillshare.SkillShareApp.enums.AppointmentStatus;
import com.skillshare.SkillShareApp.model.Appointment;
import com.skillshare.SkillShareApp.model.Mentor;
import com.skillshare.SkillShareApp.model.User;
import com.skillshare.SkillShareApp.repo.AppointmentRepo;
import com.skillshare.SkillShareApp.repo.MentorRepo;
import com.skillshare.SkillShareApp.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class AppointmentService {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private MentorRepo mentorRepository;

    @Autowired
    private AppointmentRepo appointmentRepository;

    public ResponseEntity<List<MentorSearchResponseDTO>> mentorSearch(String mentorName) {
        List<User> matchingUsers = userRepository.searchByFirstNameOrLastName(mentorName);

        if (matchingUsers.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<MentorSearchResponseDTO> mentorResponses = matchingUsers.stream().map(user -> {
            Optional<Mentor> mentorOptional = mentorRepository.findById(user.getMentorId());

            if (mentorOptional.isPresent()) {
                Mentor mentor = mentorOptional.get();
                return MentorSearchResponseDTO.builder().mentorId(user.getMentorId()).mentorName(user.getFirstName() + " " + user.getLastName()).mentorRating(String.valueOf(mentor.getRating())).mentorBio(user.getBio()).mentorProficiencies(mentor.getProficiencies()).mentorImageBase64(MentorSearchResponseDTO.convertByteArrayToBase64(user.getProfileImage())).success(true).message("Mentors found").build();
            }
            return null;
        }).filter(Objects::nonNull).collect(Collectors.toList());

        return ResponseEntity.ok(mentorResponses);
    }

    public ResponseEntity<ResponseDTO> createAppointment(AppointmentRequestDTO request) {
        // Check if user exists
        Optional<User> userOptional = userRepository.findById(request.getUserId());
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body(new ResponseDTO("User not found", false));
        }

        // Check if mentor exists
        Optional<Mentor> mentorOptional = mentorRepository.findById(request.getMentorId());
        if (mentorOptional.isEmpty()) {
            return ResponseEntity.badRequest().body(new ResponseDTO("Mentor not found", false));
        }

        // Create and save appointment
        Appointment appointment = Appointment.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .topic(request.getTopic())
                .userId(request.getUserId())
                .mentorId(request.getMentorId())
                .mode(request.getMode())
                .appointmentStatus(AppointmentStatus.PENDING)
                .build();

        appointmentRepository.save(appointment);

        return ResponseEntity.ok(new ResponseDTO("Appointment created successfully", true));
    }

    public ResponseEntity<AppointmentListResponseDTO> getPendingAppointments(Long mentorId) {
        if (mentorId == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(AppointmentListResponseDTO.builder().success(true).message("Pending appoints found").appointments(appointmentRepository.findByMentorId(mentorId).stream().filter(appointment -> appointment.getAppointmentStatus().equals(AppointmentStatus.PENDING)).toList()).build());
    }

    public ResponseEntity<AppointmentListResponseDTO> getAllAppointments(Long userId) {
        if (userId == null) return null;
        return ResponseEntity.ok(AppointmentListResponseDTO.builder().success(true).message("All appoints found").appointments(appointmentRepository.findByUserId(userId)).build());
    }
}
