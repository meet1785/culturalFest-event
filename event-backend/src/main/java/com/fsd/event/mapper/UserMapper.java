package com.fsd.event.mapper;

import com.fsd.event.dto.UserDTO;
import com.fsd.event.entity.User;

public class UserMapper {

    public static UserDTO toDTO(User user) {
        return UserDTO.builder()
                .user_id(user.getUserId())
                .full_name(user.getFullName())
                .college_name(user.getCollegeName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .build();
    }

    public static User toEntity(UserDTO dto) {
        return User.builder()
                .userId(dto.getUser_id())
                .fullName(dto.getFull_name())
                .collegeName(dto.getCollege_name())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .build();
    }
}