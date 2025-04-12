package com.fsd.event.repository;

import com.fsd.event.entity.ActivityRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ActivityRegistrationRepository extends JpaRepository<ActivityRegistration, Long> {
    boolean existsByUser_UserIdAndActivity_ActivityId(Long userId, Long activityId);
    List<ActivityRegistration> findAllByActivity_ActivityId(Long activityId);
}