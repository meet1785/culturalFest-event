package com.fsd.event.service;

import com.fsd.event.dto.ActivityRegistrationDTO;
import com.fsd.event.entity.*;
import com.fsd.event.mapper.ActivityRegistrationMapper;
import com.fsd.event.repository.ActivityRegistrationRepository;
import com.fsd.event.repository.ActivityRepository;
import com.fsd.event.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ActivityRegistrationService {
    private final ActivityRegistrationRepository registrationRepository;
    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;

    public String register(Long activityId, ActivityRegistrationDTO dto) {
        // 1. Find or create user
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseGet(() -> userRepository.save(User.builder()
                        .fullName(dto.getFull_name())
                        .collegeName(dto.getCollege_name())
                        .email(dto.getEmail())
                        .phone(dto.getPhone())
                        .build()));

        // 2. Check for duplicate registration
        if (registrationRepository.existsByUser_UserIdAndActivity_ActivityId(
            user.getUserId(), activityId // Use activityId from URL
        )) {
            return "Already registered!";
        }

        // 3. Fetch activity from URL path variable
        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new RuntimeException("Activity not found"));

        // 4. Create registration
        ActivityRegistration registration = ActivityRegistrationMapper.toEntity(
            user, activity, dto.getAdditional_info()
        );
        registrationRepository.save(registration);

        return "Registration successful!";
    }
}