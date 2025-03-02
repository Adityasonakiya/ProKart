package com.examly.springapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthUser {

    private String username;
    private String token;
    private String role;
    private int userId;
}
