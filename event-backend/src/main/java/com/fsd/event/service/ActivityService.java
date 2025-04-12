package com.fsd.event.service;

import com.fsd.event.dto.ActivityDTO;
import com.fsd.event.dto.UserDTO;
import com.fsd.event.entity.Activity;
import com.fsd.event.entity.ActivityRegistration;
import com.fsd.event.entity.Event;
import com.fsd.event.entity.Venue;
import com.fsd.event.mapper.ActivityMapper;
import com.fsd.event.mapper.UserMapper;
import com.fsd.event.repository.ActivityRepository;
import com.fsd.event.repository.ActivityRegistrationRepository;
import com.fsd.event.repository.EventRepository;
import com.fsd.event.repository.VenueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

public interface ActivityService {
    ActivityDTO createActivity(Long eventId, ActivityDTO dto); // Added eventId parameter
    List<ActivityDTO> getAllActivitiesByEventId(Long eventId); // New method
    ActivityDTO getActivityById(Long id);
    void deleteActivity(Long id);
    List<UserDTO> getActivityParticipants(Long activityId);


    @Service
    @RequiredArgsConstructor
    class Impl implements ActivityService {

        private final ActivityRepository activityRepository;
        private final EventRepository eventRepository;
        private final VenueRepository venueRepository;
        private final ActivityRegistrationRepository registrationRepository;

        @Override
        public ActivityDTO createActivity(Long eventId , ActivityDTO dto) {
            Event event = eventRepository.findById(eventId)
                    .orElseThrow(() -> new RuntimeException("Event not found"));

            Venue venue = venueRepository.findById(dto.getVenue_id())
                    .orElseThrow(() -> new RuntimeException("Venue not found"));

            Activity activity = ActivityMapper.toEntity(dto, event, venue);
            return ActivityMapper.toDTO(activityRepository.save(activity));
        }

        @Override
public List<ActivityDTO> getAllActivitiesByEventId(Long eventId) {
    List<Activity> activities = activityRepository.findByEvent_EventId(eventId);
    return activities.stream()
            .map(ActivityMapper::toDTO)
            .collect(Collectors.toList());
}

        @Override
        public ActivityDTO getActivityById(Long id) {
            Activity activity = activityRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Activity not found"));
            return ActivityMapper.toDTO(activity);
        }

        @Override
        public void deleteActivity(Long id) {
            activityRepository.deleteById(id);
        }

        @Override
        public List<UserDTO> getActivityParticipants(Long activityId) {
            // Requires custom repository method in ActivityRegistrationRepository:
            // findAllByActivity_ActivityId(Long activityId)
            List<ActivityRegistration> regs = registrationRepository.findAllByActivity_ActivityId(activityId);
            return regs.stream()
                    .map(reg -> UserMapper.toDTO(reg.getUser()))
                    .collect(Collectors.toList());
        }
    }
}
