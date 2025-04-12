package com.fsd.event.dto;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ActivityDTO {
    private Long activity_id;
    private Long venue_id;
    private String activity_name;
    private String activity_description;
    private LocalDateTime start_time;
    private LocalDateTime end_time;
}