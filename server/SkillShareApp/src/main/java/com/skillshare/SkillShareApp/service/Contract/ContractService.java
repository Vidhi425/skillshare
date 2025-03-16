package com.skillshare.SkillShareApp.service.Contract;

import com.skillshare.SkillShareApp.dto.MeetDetails;
import com.skillshare.SkillShareApp.dto.response.ResponseDTO;
import com.skillshare.SkillShareApp.enums.AppointmentStatus;
import com.skillshare.SkillShareApp.enums.Mode;
import com.skillshare.SkillShareApp.model.Appointment;
import com.skillshare.SkillShareApp.model.Contract;
import com.skillshare.SkillShareApp.model.Mentor;
import com.skillshare.SkillShareApp.model.User;
import com.skillshare.SkillShareApp.repo.AppointmentRepo;
import com.skillshare.SkillShareApp.repo.ContractRepo;
import com.skillshare.SkillShareApp.repo.MentorRepo;
import com.skillshare.SkillShareApp.repo.UserRepo;
import com.skillshare.SkillShareApp.utils.EncryptionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class ContractService {

    @Autowired
    private AppointmentRepo appointmentRepository;

    @Autowired
    private ContractRepo contractRepository;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private MentorRepo mentorRepository;

    /**
     * Creates a contract if the mentor accepts the appointment.
     * Updates the appointment status accordingly.
     */
    public ResponseEntity<ResponseDTO> handleAppointmentResponse(Long appointmentId, boolean isAccepted, MeetDetails mentorDetails) {
        Optional<Appointment> appointmentOptional = appointmentRepository.findById(appointmentId);
        if (appointmentOptional.isEmpty()) {
            return ResponseEntity.badRequest().body(ResponseDTO.builder().success(false).message("Appointment not found").build());
        }

        Appointment appointment = appointmentOptional.get();

        // Ensure appointment is still pending
        if (appointment.getAppointmentStatus() != AppointmentStatus.PENDING) {
            return ResponseEntity.badRequest().body(ResponseDTO.builder().success(false).message("Appointment is not in a pending state").build());
        }

        // Check if user exists
        Optional<User> userOptional = userRepository.findById(appointment.getUserId());
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body(ResponseDTO.builder().success(false).message("User not found").build());
        }

        // Check if mentor exists
        Optional<Mentor> mentorOptional = mentorRepository.findById(appointment.getMentorId());
        if (mentorOptional.isEmpty()) {
            return ResponseEntity.badRequest().body(ResponseDTO.builder().success(false).message("Mentor not found").build());
        }

        if (!isAccepted) {
            // If mentor rejects, update status and return
            appointment.setAppointmentStatus(AppointmentStatus.REJECTED);
            appointmentRepository.save(appointment);
            return ResponseEntity.ok(ResponseDTO.builder().success(false).message("Appointment rejected successfully.").build());
        }

        // Generate meeting details if the mentor accepts
        MeetDetails meetingDetails;
        if (mentorDetails.getMode() == Mode.ONLINE) {
            // Generate encrypted meeting password
            String meetingPassword = UUID.randomUUID().toString().substring(0, 8);
            String encryptedPassword = EncryptionUtil.encrypt(meetingPassword);

            meetingDetails = MeetDetails.builder()
                    .mode(Mode.ONLINE)
                    .onlineMeetUrl(mentorDetails.getOnlineMeetUrl()) // Mentor provides
                    .onlineMeetPassword(encryptedPassword)
                    .build();
        } else {
            // Generate offline access key
            String accessKey = UUID.randomUUID().toString().replace("-", "").substring(0, 10);

            meetingDetails = MeetDetails.builder()
                    .mode(Mode.OFFLINE)
                    .offlineMeetLocation(mentorDetails.getOfflineMeetLocation()) // Mentor provides
                    .offlineMeetCoords(mentorDetails.getOfflineMeetCoords()) // Mentor provides
                    .offlineMeetKey(accessKey)
                    .build();
        }

        // Save contract
        Contract contract = Contract.builder()
                .appointmentId(appointmentId)
                .meetDetails(meetingDetails)
                .build();
        contractRepository.save(contract);

        // Update appointment status to ACCEPTED
        appointment.setAppointmentStatus(AppointmentStatus.ACCEPTED);
        appointmentRepository.save(appointment);

        return ResponseEntity.ok(ResponseDTO.builder().success(false).message("Contract created successfully.").build());
    }
}
