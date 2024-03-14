package com.project.miniStore.services;

import com.project.miniStore.configs.UserDetailConfig;
import com.project.miniStore.dtos.TokenRequest;
import com.project.miniStore.dtos.UserDTO;
import com.project.miniStore.exceptions.DataNotFoundException;
import com.project.miniStore.models.Role;
import com.project.miniStore.models.Token;
import com.project.miniStore.models.User;
import com.project.miniStore.repositories.RoleRepository;
import com.project.miniStore.repositories.TokenRepository;
import com.project.miniStore.repositories.UserRepository;
import com.project.miniStore.responses.UserLoginResponse;
import com.project.miniStore.responses.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder encoder;
    private final TokenRepository tokenRepository;

    @Override
    public User createUser(UserDTO userDTO) throws Exception {
        String phoneNumber = userDTO.getPhoneNumber();
        if (userRepository.existsByPhoneNumber(phoneNumber))
            throw new DataIntegrityViolationException("Phone number already exists");
        User user = User.builder()
                .fullName(userDTO.getFullName())
                .phoneNumber(userDTO.getPhoneNumber())
                .address(userDTO.getAddress())
                .dateOfBirth(userDTO.getDateOfBirth())
                .facebookAccountId(userDTO.getFacebookAccountId())
                .googleAccountId(userDTO.getGoogleAccountId())
                .active(true)
                .build();
        Role role = roleRepository.findById(userDTO.getRoleId())
                .orElseThrow(() -> new DataNotFoundException("Role not found"));
        user.setRole(role);
        if (userDTO.getGoogleAccountId() == 0 && userDTO.getFacebookAccountId() == 0) {
            String password = userDTO.getPassword();
            user.setPassword(encoder.encode(password));
        }
        userRepository.save(user);
        return user;
    }

    @Override
    public UserLoginResponse login(String phoneNumber, String password, boolean isAdmin) throws Exception {
        Optional<User> optionalUser = userRepository.findByPhoneNumber(phoneNumber);
        if (optionalUser.isEmpty()) {
            throw new DataNotFoundException("user not found");
        } else {

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(phoneNumber, password)
            );
            User user = optionalUser.get();
            if(isAdmin) {
                if (user.getRole().getId() != 2)
                    throw new Exception("role must be admin");
            } else {
                if (user.getRole().getId() != 1)
                    throw new Exception("role must be user");
            }
            UserLoginResponse userLoginResponse = new UserLoginResponse();
            var jwt = jwtService.generateToken(new UserDetailConfig(user));
            var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), new UserDetailConfig(user));
            userLoginResponse.setAccessToken(jwt);
            userLoginResponse.setRefreshToken(refreshToken);
            return userLoginResponse;
        }

    }

    @Override
    public UserResponse findByPhoneNumber(String phoneNumber) throws Exception {
        Optional<User> optionalUser = userRepository.findByPhoneNumber(phoneNumber);
        return optionalUser.map(user -> UserResponse.builder()
                        .id(user.getId())
                        .phoneNumber(user.getPhoneNumber())
                        .fullName(user.getFullName())
                        .dateOfBirth(user.getDateOfBirth())
                        .address(user.getAddress())
                        .role(user.getRole())
                        .build())
                .orElseThrow(() -> new DataNotFoundException("not found"));
    }

    @Override
    public UserLoginResponse checkInvalidToken(TokenRequest tokenRequest) throws Exception {
        String phoneNumber = jwtService.extractUsername(tokenRequest.getRefreshToken());
        User user = userRepository.findByPhoneNumber(phoneNumber).orElseThrow(() -> new UsernameNotFoundException("not found"));
        UserDetailConfig userDetailConfig = new UserDetailConfig(user);

        UserLoginResponse userLoginResponse = new UserLoginResponse();


        String newToken = jwtService.generateToken(userDetailConfig);
        userLoginResponse.setAccessToken(newToken);
        userLoginResponse.setRefreshToken(tokenRequest.getRefreshToken());


        return userLoginResponse;
    }

    @Override
    public UserLoginResponse refreshToken(String refreshToken) throws Exception {

            String phoneNumber = jwtService.extractUsername(refreshToken);
            User user = userRepository.findByPhoneNumber(phoneNumber)
                    .orElseThrow(() -> new UsernameNotFoundException("not found"));
            UserDetailConfig userDetailConfig = new UserDetailConfig(user);
            String newToken = jwtService.generateToken(userDetailConfig);

            return UserLoginResponse.builder()
                    .accessToken(newToken)
                    .refreshToken(refreshToken)
                    .build();
    }
}
