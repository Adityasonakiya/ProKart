package com.examly.springapp.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.examly.springapp.repository.UserRepo;
import com.examly.springapp.model.User;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        logger.debug("Entering in loadUserByUsername Method...");
        
        // Find user by email
        User user = userRepo.findByEmail(email).orElseThrow(() -> {
            logger.error("User not found with email: {}", email);
            return new UsernameNotFoundException("Invalid username");
        });
        
        logger.info("User authenticated successfully: {}", user.getEmail());
        return new CustomUserDetails(user);
    }
}
