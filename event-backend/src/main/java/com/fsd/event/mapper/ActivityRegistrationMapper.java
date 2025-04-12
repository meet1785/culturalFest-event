package com.fsd.event.mapper;

import com.fsd.event.entity.Activity;
import com.fsd.event.entity.ActivityRegistration;
import com.fsd.event.entity.User;

public class ActivityRegistrationMapper {

    public static ActivityRegistration toEntity(User user, Activity activity, String additionalInfo) {
        return ActivityRegistration.builder()
                .user(user)
                .activity(activity)
                .additionalInfo(additionalInfo)
                .build();
    }
}
