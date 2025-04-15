package com.fsd.event.controller;

import com.fsd.event.dto.ActivityDTO;
import com.fsd.event.dto.UserDTO;
import com.fsd.event.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/events/{eventId}/activities") // Changed base URL
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ActivityController {

    private final ActivityService activityService;

    // Create an activity under a specific event
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ActivityDTO create(
            @PathVariable Long eventId, // Get eventId from URL
            @RequestBody ActivityDTO dto) {
        return activityService.createActivity(eventId, dto); // Pass eventId to service
    }

    // Get all activities
    @GetMapping
    public List<ActivityDTO> getAll(@PathVariable long eventId) {
        return activityService.getAllActivitiesByEventId(eventId);
    }

    // Get an activity by id
    @GetMapping("/{id}")
    public ActivityDTO getById(@PathVariable Long id) {
        return activityService.getActivityById(id);
    }

    // Delete an activity by id
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        activityService.deleteActivity(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{activityId}/participants")
    public List<UserDTO> getActivityParticipants(
            @PathVariable Long activityId // Get from URL
    ) {
        return activityService.getActivityParticipants(activityId);
    }
}
