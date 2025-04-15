package com.fsd.event.controller;

import com.fsd.event.dto.VenueDTO;
import com.fsd.event.dto.ActivityDTO;
import com.fsd.event.service.VenueService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/venues")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class VenueController {

    private final VenueService venueService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public VenueDTO create(@RequestBody VenueDTO dto) {
        return venueService.createVenue(dto);
    }

    @GetMapping
    public List<VenueDTO> getAll() {
        return venueService.getAllVenues();
    }

    @GetMapping("/{id}")
    public VenueDTO getById(@PathVariable Long id) {
        return venueService.getVenueById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public VenueDTO update(@PathVariable Long id, @RequestBody VenueDTO dto) {
        return venueService.updateVenue(id, dto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        venueService.deleteVenue(id);
    }

    @GetMapping("/{id}/activities")
    public List<ActivityDTO> getActivities(@PathVariable Long id) {
        return venueService.getActivitiesByVenueId(id);
    }
}
