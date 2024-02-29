package com.project.miniStore.services;

import com.project.miniStore.dtos.TokenRequest;
import com.project.miniStore.dtos.UserDTO;
import com.project.miniStore.models.User;
import com.project.miniStore.responses.UserLoginResponse;
import com.project.miniStore.responses.UserResponse;

public interface IUserService {
    User createUser(UserDTO userDTO) throws Exception;
    UserLoginResponse login(String phoneNumber, String password) throws Exception;
    UserResponse findByPhoneNumber(String phoneNumber) throws Exception;
    UserLoginResponse checkInvalidToken(TokenRequest tokenRequest) throws Exception;

}
