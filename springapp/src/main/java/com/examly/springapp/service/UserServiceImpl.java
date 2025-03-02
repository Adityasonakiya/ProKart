package com.examly.springapp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserServiceImpl implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void createUser(User user) {
        if (userRepo.findByUsername(user.getUsername()).isPresent()) {
            logger.error("Username already exists: {}", user.getUsername());
            throw new RuntimeException("Username already exists");
        }
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            logger.error("Email already exists: {}", user.getEmail());
            throw new RuntimeException("Email already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
        logger.info("User created successfully: {}", user.getUsername());
    }

    @Override
    public User loginUser(LoginDTO loginDTO) {
        User user = userRepo.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + loginDTO.getEmail()));

        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            logger.error("Invalid credentials for user: {}", loginDTO.getEmail());
            throw new RuntimeException("Invalid credentials");
        }
        logger.info("User logged in successfully: {}", loginDTO.getEmail());
        return user;
    }
}
