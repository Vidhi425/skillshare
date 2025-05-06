package com.skillshare.SkillShareApp.repo;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.skillshare.SkillShareApp.dto.response.ScheduledMeetResponseDTO;

@Repository
public interface MeetRepository {
    @Query("SELECT new com.skillshare.SkillShareApp.dto.response.ScheduledMeetResponseDTO.ScheduledMeetDTO(" +
    "CONCAT(u.first_name, ' ', u.last_name) as menteeName, " +
    "a.title, " +
    "a.description, " +
    "a.topic, " +
    "c.meet_details.mode, " +
    "CONCAT('data:image/jpeg;base64,', encode(u.profileImage, 'base64')) as mentorProfileImg, " +
    "c.meet_details.onlineMeetUrl as meetLink, " +
    "c.meet_details.meetDate) " +
    "FROM Contract c " +
    "JOIN Appointment a ON c.appointmentId = a.id " +
    "JOIN User u ON a.user_id = u.user_id " +
    "WHERE a.mentor_id = :mentorId")
    List<ScheduledMeetResponseDTO.ScheduledMeetDTO> findScheduledMeetsUsingMentorId(Long mentorId);

    @Query("SELECT new com.skillshare.SkillShareApp.dto.response.ScheduledMeetResponseDTO.ScheduledMeetDTO(" +
    "CONCAT(u.first_name, ' ', u.last_name) as mentorName, " +
    "a.title, " +
    "a.description, " +
    "a.topic, " +
    "c.meet_details.mode, " +
    "CONCAT('data:image/jpeg;base64,', encode(u.profile_image, 'base64')) as mentorProfileImg, " +
    "c.meet_details.onlineMeetUrl as meetLink, " +
    "c.meet_details.meetDate) " +
    "FROM Contract c " +
    "JOIN Appointment a ON c.appointmentId = a.id " +
    "JOIN User u ON a.mentor_id = u.mentor_id " +
    "WHERE a.user_id = :userId")
    List<ScheduledMeetResponseDTO.ScheduledMeetDTO> findScheduledMeetsUsingUserId(Long userId);
}
