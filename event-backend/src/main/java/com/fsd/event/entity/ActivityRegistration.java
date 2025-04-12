package com.fsd.event.entity;

import javax.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "activity_registrations", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "activity_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityRegistration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "registration_id")
    private Long registrationId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "activity_id", nullable = false)
    private Activity activity;

    @Column(name = "registration_date")
    @Builder.Default
    private LocalDateTime registrationDate = LocalDateTime.now();

    @Column(name = "additional_info")
    private String additionalInfo;
}