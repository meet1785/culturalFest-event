package com.fsd.event.dto;

import java.time.LocalDate;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EventDTO {
    private Long event_id;
    private String event_name;
    private String event_description;
    private LocalDate event_date;
}