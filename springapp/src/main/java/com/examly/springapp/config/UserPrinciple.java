package com.examly.springapp.config;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.*;

import com.examly.springapp.model.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@NoArgsConstructor
@Slf4j
public class UserPrinciple implements UserDetails {

    @Getter @Setter
    private String email; // Updated variable name from username to email

    @Getter @Setter
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    public UserPrinciple(User user) {
        this.email = user.getEmail(); // Email is used for validation
        this.password = user.getPassword();
        List<GrantedAuthority> auths = new ArrayList<>();
        auths.add(new SimpleGrantedAuthority(user.getUserRole()));
        this.authorities = auths;
        log.info("UserPrinciple created for user: {}", email);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() { // Method required by UserDetails interface
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
