package com.project.miniStore.dtos;

import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class OrderDetailDTO {
    @Min(value = 1, message = "order ID must be > 0")
    private Long orderId;
    @Min(value = 1, message = "product ID must be > 0")
    private Long productId;
    @Min(value = 0, message = "price must be >= 0")
    private Float price;
    @Min(value = 1, message = "number must be >= 1")
    private int numberOfProducts;
    @Min(value = 0, message = "total money must be >= 0")
    private Float totalMoney;
    private String color;
}
