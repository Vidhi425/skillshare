package com.skillshare.SkillShareApp.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillshare.SkillShareApp.model.Mentor;

public interface MentorRepo extends JpaRepository<Mentor, Long> {
    Optional<Mentor> findByMentorId(Long mentorId);
}
