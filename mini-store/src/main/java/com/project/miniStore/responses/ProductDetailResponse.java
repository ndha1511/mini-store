package com.project.miniStore.responses;

import com.project.miniStore.models.Category;
import com.project.miniStore.models.ProductImage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDetailResponse {
    private String name;
    private String thumbnail;
    private double price;
    private String description;
    private Category category;
    private List<ProductImage> productImages;
}
