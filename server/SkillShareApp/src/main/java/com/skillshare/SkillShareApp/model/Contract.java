package com.skillshare.SkillShareApp.model;

import com.skillshare.SkillShareApp.dto.MeetDetails;
import com.skillshare.SkillShareApp.utils.MeetingDetailsConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "contracts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contract_id")
    private Long contractId;

    @Column(nullable = false, name = "appointment_id")
    private Long appointmentId;

    @Convert(converter = MeetingDetailsConverter.class)
    @Column(nullable = false, name = "meet_details")
    private MeetDetails meetDetails;

    @PrePersist
    protected void onCreate() {
        Date createdAt = new Date();
    }

}
