package com.project.miniStore.controllers;

import com.project.miniStore.dtos.TokenRequest;
import com.project.miniStore.dtos.UserDTO;
import com.project.miniStore.dtos.UserLoginDTO;
import com.project.miniStore.responses.UserLoginResponse;
import com.project.miniStore.services.IUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/users")
@RequiredArgsConstructor
public class UserController {
    private final IUserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserDTO userDTO, BindingResult result) {
        try {
            if(result.hasErrors()) {
                List<String> errMessages = result.getFieldErrors()
                        .stream()
                        .map(DefaultMessageSourceResolvable::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errMessages);
            }
            if(!userDTO.getPassword().equals(userDTO.getRetypePassword()))
                return ResponseEntity.badRequest().body("retype password not like password");
            return ResponseEntity.ok(userService.createUser(userDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> register(@Valid @RequestBody UserLoginDTO userLoginDTO,
                                      BindingResult result) throws Exception {
        if(result.hasErrors()) {
            List<String> errMessages = result.getFieldErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .toList();
        }
        return ResponseEntity.ok(userService.login(userLoginDTO.getPhoneNumber(), userLoginDTO.getPassword()));
    }

    @GetMapping("/{phoneNumber}")
    public ResponseEntity<?> findByPhoneNumber(@PathVariable String phoneNumber) {
        try {
            return ResponseEntity.ok(userService.findByPhoneNumber(phoneNumber));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("not found");
        }
    }

    @PostMapping("/invalidToken")
    public ResponseEntity<?> checkInvalidToken(@RequestBody TokenRequest tokenRequest) throws Exception {

        UserLoginResponse userLoginResponse = userService.checkInvalidToken(tokenRequest);
        if(userLoginResponse != null)
            return ResponseEntity.ok(userLoginResponse);
        return ResponseEntity.badRequest().body("token expired");
    }

}