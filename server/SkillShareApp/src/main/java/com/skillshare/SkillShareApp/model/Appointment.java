package com.skillshare.SkillShareApp.model;

import com.skillshare.SkillShareApp.enums.AppointmentStatus;
import com.skillshare.SkillShareApp.enums.Mode;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "appointments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appointment_id")
    private Long appointmentId;

    @Column(nullable = false, name = "title")
    private String title;

    @Column(nullable = false, name = "description", length = 500)
    private String description;

    @Column(nullable = false, name = "topic")
    private String topic;

    @Column(nullable = false, name = "user_id")
    private Long userId;

    @Column(nullable = false, name = "mentor_id")
    private Long mentorId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "mode")
    private Mode mode;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "appointment_status")
    private AppointmentStatus appointmentStatus;

    @PrePersist
    protected void onCreate() {
        Date createdAt = new Date();
    }
}
