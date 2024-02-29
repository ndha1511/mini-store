package com.project.miniStore.responses;

import com.project.miniStore.models.Product;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProductsResponse {
    private List<Product> products;
    private int totalPage;
}
