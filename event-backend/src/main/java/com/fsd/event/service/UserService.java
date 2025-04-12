package com.fsd.event.service;

import com.fsd.event.dto.UserDTO;
import com.fsd.event.entity.User;
import com.fsd.event.mapper.UserMapper;
import com.fsd.event.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

public interface UserService {
    UserDTO createUser(UserDTO userDTO);
    UserDTO getUserByEmail(String email);
    List<UserDTO> getAllUsers();

    @Service
    @RequiredArgsConstructor
    class Impl implements UserService {

        private final UserRepository userRepository;

        @Override
        public UserDTO createUser(UserDTO userDTO) {
            User user = UserMapper.toEntity(userDTO);
            return UserMapper.toDTO(userRepository.save(user));
        }

        @Override
        public UserDTO getUserByEmail(String email) {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
            return UserMapper.toDTO(user);
        }

        @Override
        public List<UserDTO> getAllUsers() {
            return userRepository.findAll()
                    .stream()
                    .map(UserMapper::toDTO)
                    .collect(Collectors.toList());
        }
    }
}
