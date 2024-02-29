package com.project.miniStore.dtos;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserDTO {
    private String fullName;
    @NotBlank(message = "phone number is required")
    private String phoneNumber;
    private String address;
    @NotBlank(message = "password is required")
    private String password;
    private String retypePassword;
    private LocalDate dateOfBirth;
    private int facebookAccountId;
    private int googleAccountId;
    @NotNull(message = "role is required")
    private Long roleId;

}
