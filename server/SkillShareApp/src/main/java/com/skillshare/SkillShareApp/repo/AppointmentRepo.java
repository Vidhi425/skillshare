package com.skillshare.SkillShareApp.repo;

import com.skillshare.SkillShareApp.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepo extends JpaRepository<Appointment, Long> {
    List<Appointment> findByMentorId(Long mentorId);
    List<Appointment> findByUserId(Long userId);
}
