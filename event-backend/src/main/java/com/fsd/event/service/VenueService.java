package com.fsd.event.service;

import com.fsd.event.dto.VenueDTO;
import com.fsd.event.entity.Venue;
import com.fsd.event.mapper.VenueMapper;
import com.fsd.event.repository.VenueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VenueService {

    private final VenueRepository venueRepository;

    public VenueDTO createVenue(VenueDTO dto) {
        Venue venue = VenueMapper.toEntity(dto);
        return VenueMapper.toDTO(venueRepository.save(venue));
    }

    public List<VenueDTO> getAllVenues() {
        return venueRepository.findAll().stream()
                .map(VenueMapper::toDTO)
                .collect(Collectors.toList());
    }

    public VenueDTO getVenueById(Long id) {
        Venue venue = venueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venue not found with id: " + id));
        return VenueMapper.toDTO(venue);
    }
}
