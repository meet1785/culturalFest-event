package com.fsd.event.mapper;

import com.fsd.event.dto.ActivityDTO;
import com.fsd.event.entity.Activity;
import com.fsd.event.entity.Event;
import com.fsd.event.entity.Venue;

public class ActivityMapper {

    public static ActivityDTO toDTO(Activity activity) {
    return ActivityDTO.builder()
            .activity_id(activity.getActivityId())
            .venue_id(activity.getVenue().getVenueId())
            .activity_name(activity.getActivityName())
            .activity_description(activity.getActivityDescription())
            .start_time(activity.getStartTime())
            .end_time(activity.getEndTime())
            .build();
}

     public static Activity toEntity(ActivityDTO dto, Event event, Venue venue) {
        return Activity.builder()
                .activityId(dto.getActivity_id())
                .event(event) // Use event from parameter (not DTO)
                .venue(venue)
                .activityName(dto.getActivity_name())
                .activityDescription(dto.getActivity_description())
                .startTime(dto.getStart_time())
                .endTime(dto.getEnd_time())
                .build();
    }
}