package com.fsd.event.mapper;

import com.fsd.event.dto.EventDTO;
import com.fsd.event.entity.Event;

public class EventMapper {
    public static EventDTO toDTO(Event event) {
        return EventDTO.builder()
                .event_id(event.getEventId())
                .event_name(event.getEventName())
                .event_description(event.getEventDescription())
                .event_date(event.getEventDate())
                .build();
    }

    public static Event toEntity(EventDTO dto) {
        return Event.builder()
                .eventId(dto.getEvent_id())
                .eventName(dto.getEvent_name())
                .eventDescription(dto.getEvent_description())
                .eventDate(dto.getEvent_date())
                .build();
    }
}