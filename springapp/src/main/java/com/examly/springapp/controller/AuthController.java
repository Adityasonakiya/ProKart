package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import com.examly.springapp.config.JwtUtils;
import com.examly.springapp.model.AuthUser;
import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;

import jakarta.annotation.security.PermitAll;

import com.examly.springapp.repository.UserRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtils jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepo ur;

    @PostMapping("/register")
    @PermitAll
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            userService.createUser(user);
            logger.info("User registered successfully: {}", user.getEmail());
            return new ResponseEntity<>(user, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error registering user: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/login")
    @PermitAll
    public ResponseEntity<AuthUser> authenticateAndGetToken(@RequestBody User user) {
        AuthUser authUser = null;
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
            if (authentication.isAuthenticated()) {
                User u = ur.findByEmail(user.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
                authUser = new AuthUser();
                String token = jwtService.generateToken(user.getEmail());
                authUser.setToken(token);
                authUser.setUserId(u.getUserId());
                authUser.setRole(u.getUserRole());
                authUser.setUsername(u.getUsername());
                logger.info("User authenticated successfully: {}", user.getEmail());
                logger.info("Token generated for user {}: {}", user.getEmail(), token);
                return new ResponseEntity<>(authUser, HttpStatus.OK);
            } else {
                throw new UsernameNotFoundException("Invalid user request");
            }
        } catch (Exception e) {
            logger.error("Authentication failed: {}", e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }
}
