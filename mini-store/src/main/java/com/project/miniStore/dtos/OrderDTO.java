package com.project.miniStore.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class OrderDTO {
    @Min(value = 1, message = "user ID must be > 0")
    private Long userId;
    private String fullName;
    private String email;
    @NotBlank(message = "phone number is required")
    private String phoneNumber;
    private String address;
    private String note;
    @Min(value = 0, message = "total money must be > 0")
    private Float totalMoney;
    private String shippingMethod;
    private String shippingAddress;
    private String paymentMethod;
}
