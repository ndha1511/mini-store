package com.project.miniStore.services;

import com.project.miniStore.dtos.ProductDTO;
import com.project.miniStore.dtos.ProductImageDTO;
import com.project.miniStore.models.Product;
import com.project.miniStore.models.ProductImage;
import com.project.miniStore.responses.ProductDetailResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface IProductService {
    Page<Product> getAllProducts(PageRequest pageRequest);
    Product createProduct(ProductDTO productDTO) throws Exception;
    Product updateProduct(long id, ProductDTO productDTO) throws Exception;
    ProductDetailResponse findById(Long id) throws Exception;
    void deleteProduct(long id);
    boolean existsByName(String name);

    ProductImage createProductImage(Long productId, ProductImageDTO productImageDTO) throws Exception;
    List<ProductImage> getImagesByProductId(Long productId) throws Exception;
    void deleteImgByPublicId(String publicId, Long id);
    Page<Product> getAllByCategoryId(Long categoryId, PageRequest pageRequest);
}
