package com.fsd.event.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VenueDTO {
    private Long venue_id;
    private String venue_name;
    private String location;
    private Integer capacity;
}
