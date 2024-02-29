package com.project.miniStore.services;

import com.project.miniStore.dtos.ProductDTO;
import com.project.miniStore.dtos.ProductImageDTO;
import com.project.miniStore.exceptions.DataNotFoundException;
import com.project.miniStore.exceptions.InvalidPramException;
import com.project.miniStore.models.Category;
import com.project.miniStore.models.Product;
import com.project.miniStore.models.ProductImage;
import com.project.miniStore.repositories.CategoryRepository;
import com.project.miniStore.repositories.ProductImageRepository;
import com.project.miniStore.repositories.ProductRepository;
import com.project.miniStore.responses.ProductDetailResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService{
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductImageRepository productImageRepository;
    private final CloudinaryService cloudinaryService;
    @Override
    public Page<Product> getAllProducts(PageRequest pageRequest) {
        return productRepository.findAll(pageRequest);
    }

    @Override
    public Product createProduct(ProductDTO productDTO) throws Exception{
        Category category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find category"));
        Product product = Product.builder()
                .name(productDTO.getName())
                .price(productDTO.getPrice())
                .thumbnail(productDTO.getThumbnail())
                .category(category)
                .description(productDTO.getDescription())
                .build();
        productRepository.save(product);
        return product;
    }

    @Override
    public Product updateProduct(long id, ProductDTO productDTO) throws Exception {
        Product existsProduct = findProductById(id);
        existsProduct.setName(productDTO.getName());
        Category category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find category"));
        existsProduct.setCategory(category);
        existsProduct.setPrice(productDTO.getPrice());
        existsProduct.setDescription(productDTO.getDescription());
        existsProduct.setThumbnail(productDTO.getThumbnail());
        List<ProductImageDTO> imageDTOS = productDTO.getImages();
        if(imageDTOS != null) {
            for (ProductImageDTO imageDTO : imageDTOS) {
                productImageRepository.save(ProductImage.builder()
                        .product(existsProduct)
                        .id(imageDTO.getId())
                        .imageUrl(imageDTO.getImageUrl())
                        .publicId(imageDTO.getPublicId())
                        .build());
            }
        }

        return productRepository.save(existsProduct);
    }

    @Override
    public ProductDetailResponse findById(Long id) throws Exception{
        return productRepository.findById(id)
                .map(p -> ProductDetailResponse.builder()
                        .productImages(productImageRepository.findByProductId(p.getId()))
                        .name(p.getName())
                        .price(p.getPrice())
                        .description(p.getDescription())
                        .category(p.getCategory())
                        .thumbnail(p.getThumbnail())
                        .build())
                .orElseThrow(() -> new DataNotFoundException("Cannot found product"));
    }

    private Product findProductById(Long id) {
        return productRepository.findById(id).orElseThrow();
    }
    @Override
    public void deleteProduct(long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if(optionalProduct.isPresent())
            productRepository.deleteById(id);
    }

    @Override
    public boolean existsByName(String name) {
        return productRepository.existsByName(name);
    }

    @Override
    public ProductImage createProductImage(Long productId, ProductImageDTO productImageDTO) throws Exception {
        List<ProductImage> productImages = productImageRepository.findByProductId(productId);
        if(productImages.size() <= 5) {
            Product product = findProductById(productId);
            ProductImage productImage = new ProductImage();
            productImage.setProduct(product);
            productImage.setImageUrl(productImageDTO.getImageUrl());
            productImage.setPublicId(productImageDTO.getPublicId());
            return productImageRepository.save(productImage);
        }
        throw new InvalidPramException("limited number of images");

    }

    @Override
    public List<ProductImage> getImagesByProductId(Long productId) throws Exception {
        return productImageRepository.findByProductId(productId);
    }

    @Override
    public void deleteImgByPublicId(String publicId, Long id) {
        cloudinaryService.destroy(publicId);
        if(id != null) productImageRepository.deleteById(id);

    }


}
