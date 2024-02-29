package com.project.miniStore.dtos;

import lombok.Data;

@Data
public class ProductImageDTO {
    private Long id;
    private Long productId;
    private String imageUrl;
    private String publicId;
}
