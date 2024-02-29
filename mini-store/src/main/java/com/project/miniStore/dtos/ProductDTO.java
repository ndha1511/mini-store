package com.project.miniStore.dtos;


import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProductDTO {
    @NotBlank(message = "name is required")
    @Size(min = 3, max = 200, message = "name must be between 3 and 200 character")
    private String name;
    @Min(value = 0, message = "price must be greater than or equal to 0")
    @Max(value = 10000000, message = "price must be less than or equal to 10.000.000")
    private float price;
    private String thumbnail;
    private String description;
    private Long categoryId;
    private List<ProductImageDTO> images;
}
