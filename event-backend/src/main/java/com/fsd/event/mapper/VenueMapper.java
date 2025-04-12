package com.fsd.event.mapper;

import com.fsd.event.dto.VenueDTO;
import com.fsd.event.entity.Venue;

public class VenueMapper {
    public static VenueDTO toDTO(Venue venue) {
        return VenueDTO.builder()
                .venue_id(venue.getVenueId())
                .venue_name(venue.getVenueName())
                .location(venue.getLocation())
                .capacity(venue.getCapacity())
                .build();
    }

    public static Venue toEntity(VenueDTO dto) {
        return Venue.builder()
                .venueId(dto.getVenue_id())
                .venueName(dto.getVenue_name())
                .location(dto.getLocation())
                .capacity(dto.getCapacity())
                .build();
    }
}