package com.examly.springapp.service;
 
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
 
public interface UserService {
    void createUser(User user);
    User loginUser(LoginDTO loginDTO);
}
 