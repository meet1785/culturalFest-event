package com.fsd.event.controller;

import com.fsd.event.dto.EventDTO;
import com.fsd.event.dto.UserDTO;
import com.fsd.event.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class EventController {

    private final EventService eventService;

    // Create an event
    @PostMapping
    public EventDTO createEvent(@RequestBody EventDTO dto) {
        return eventService.createEvent(dto);
    }

    @GetMapping
    public List<EventDTO> getAllEvents() {
        return eventService.getAllEvents();
    }

    // Get an event by its id
    @GetMapping("/{id}")
    public EventDTO getById(@PathVariable Long id) {
        return eventService.getEventById(id);
    }

    // Get all activities for a given event
    // @GetMapping("/{id}/activities")
    // public List<ActivityDTO> getActivities(@PathVariable Long id) {
    //     return eventService.getActivitiesForEvent(id);
    // }

    // Get all participants (users) registered in any activity of the event
    @GetMapping("/{eventId}/participants")
    public List<UserDTO> getEventParticipants(@PathVariable Long eventId) {
        return eventService.getEventParticipants(eventId);
    }
}
