package com.fsd.event.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {
    private Long user_id;
    private String full_name;
    private String college_name;
    private String email;
    private String phone;
}