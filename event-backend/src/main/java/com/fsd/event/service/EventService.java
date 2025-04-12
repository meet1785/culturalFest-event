package com.fsd.event.service;

import com.fsd.event.dto.EventDTO;
import com.fsd.event.dto.ActivityDTO;
import com.fsd.event.dto.UserDTO;
import com.fsd.event.entity.Event;
import com.fsd.event.entity.User;
import com.fsd.event.entity.Activity;
import com.fsd.event.entity.ActivityRegistration;
import com.fsd.event.mapper.EventMapper;
import com.fsd.event.mapper.ActivityMapper;
import com.fsd.event.mapper.UserMapper;
import com.fsd.event.repository.EventRepository;
import com.fsd.event.repository.ActivityRepository;
import com.fsd.event.repository.ActivityRegistrationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

public interface EventService {
    EventDTO createEvent(EventDTO dto);
    List<EventDTO> getAllEvents();
    EventDTO getEventById(Long id);
    List<ActivityDTO> getActivitiesForEvent(Long eventId);
    List<UserDTO> getEventParticipants(Long eventId);

    @Service
    @RequiredArgsConstructor
    class Impl implements EventService {

        private final EventRepository eventRepository;
        private final ActivityRepository activityRepository;
        private final ActivityRegistrationRepository registrationRepository;

        @Override
        public EventDTO createEvent(EventDTO dto) {
            Event event = EventMapper.toEntity(dto);
            return EventMapper.toDTO(eventRepository.save(event));
        }

        @Override
        public List<EventDTO> getAllEvents() {
            return eventRepository.findAll()
                    .stream()
                    .map(EventMapper::toDTO)
                    .collect(Collectors.toList());
        }

        @Override
        public EventDTO getEventById(Long id) {
            Event event = eventRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
            return EventMapper.toDTO(event);
        }

        @Override
        public List<ActivityDTO> getActivitiesForEvent(Long eventId) {
            // Requires custom repository method in ActivityRepository: findByEvent_EventId(Long eventId)
            List<Activity> activities = activityRepository.findByEvent_EventId(eventId);
            return activities.stream()
                    .map(ActivityMapper::toDTO)
                    .collect(Collectors.toList());
        }

        // In the getEventParticipants method:
        @Override
        public List<UserDTO> getEventParticipants(Long eventId) {
        List<Activity> activities = activityRepository.findByEvent_EventId(eventId);
        Set<User> participants = new HashSet<>();
        for (Activity activity : activities) {
            List<ActivityRegistration> regs = registrationRepository
                .findAllByActivity_ActivityId(activity.getActivityId());
            regs.forEach(reg -> participants.add(reg.getUser()));
        }
        return participants.stream()
            .map(UserMapper::toDTO)
            .collect(Collectors.toList());
    }
        
    }
}
