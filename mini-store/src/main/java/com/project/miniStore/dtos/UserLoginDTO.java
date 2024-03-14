package com.project.miniStore.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserLoginDTO {
    @NotBlank(message = "phone number is required")
    private String phoneNumber;
    @NotBlank(message = "password number is required")
    private String password;
    private boolean admin;
}
