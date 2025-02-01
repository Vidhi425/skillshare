package com.skillshare.SkillShareApp.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

import com.skillshare.SkillShareApp.enums.Role;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users") // Renamed table to avoid reserved keyword conflict
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(nullable = false, name = "first_name")
    private String firstName;

    @Column(nullable = false, name = "last_name")
    private String lastName;

    @Column(nullable = false, name = "user_name")
    private String userName;

    @Column(nullable = false, unique = true, name = "email")
    private String email;

    @Column(nullable = false, name = "password")
    private String password;

    @Lob 
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "profile_image", columnDefinition = "TEXT")
    private byte[] profileImage;

    @Column(length = 500, name = "bio")
    private String bio;

    @Temporal(TemporalType.TIMESTAMP) // Specify temporal precision
    @Column(nullable = false, updatable = false, name = "created_at")
    private Date createdAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "user_role")
    private Role role;

    @Column(name = "mentor_id")
    private Long mentorId;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date(); // Set creation timestamp
    }
}
