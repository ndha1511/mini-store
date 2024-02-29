package com.project.miniStore.controllers;

import com.github.javafaker.Faker;
import com.project.miniStore.dtos.ProductDTO;
import com.project.miniStore.dtos.ProductImageDTO;
import com.project.miniStore.models.Product;
import com.project.miniStore.models.ProductImage;
import com.project.miniStore.responses.ProductsResponse;
import com.project.miniStore.services.IProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;
import java.util.UUID;


@RestController
@RequestMapping("${api.prefix}/products")
@RequiredArgsConstructor
public class ProductController {
    private final IProductService productService;


    @PostMapping("")
    public ResponseEntity<?> create(@Valid @RequestBody ProductDTO productDTO, BindingResult result) {
        try {
            if (result.hasErrors()) {
                List<String> errMessages = result.getFieldErrors()
                        .stream()
                        .map(DefaultMessageSourceResolvable::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errMessages);
            }
//            List<MultipartFile> files = productDTO.getFiles();
            Product product = productService.createProduct(productDTO);
//            if (files != null) {
//                for (MultipartFile file : files) {
//                    if(file.getSize() == 0)
//                        continue;
//                    if (file.getSize() > 10 * 1024 * 1024) {
//                        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
//                                .body("file is too large! Maximum size is 10MB");
//                    }
//                    String contentType = file.getContentType();
//                    if (contentType == null || !contentType.startsWith("image/")) {
//                        return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
//                                .body("file must be an image");
//                    }
//                    String filename = saveFile(file);
//                    ProductImageDTO productImageDTO = new ProductImageDTO();
//                    productImageDTO.setProductId(product.getId());
//                    productImageDTO.setImgUrl(filename);
//                    productService.createProductImage(product.getId(), productImageDTO);
//                }
//            }
            List<ProductImageDTO> productImages = productDTO.getImages();
            if(productImages != null) {
                for(ProductImageDTO imageDTO : productImages) {
                    imageDTO.setProductId(product.getId());
                    productService.createProductImage(product.getId(), imageDTO);
                }
            }

            return ResponseEntity.ok("created product successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }

    }
    private String saveFile(MultipartFile file) throws IOException {
        String filename = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        String uniqueFilename = UUID.randomUUID().toString() + "_" + filename;

        // link to folder want save file
        Path uploadDir = Paths.get("uploads");
        if(!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }

        Path destination = Paths.get(uploadDir.toString(), uniqueFilename);
        Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
        return uniqueFilename;
    }

    @GetMapping("")
    public ResponseEntity<?> getAll(@RequestParam("page") int page,
                                    @RequestParam("limit") int limit) {
        PageRequest pageRequest = PageRequest.of(page, limit,
                Sort.by("createdAt").descending());
        Page<Product> productsPage = productService.getAllProducts(pageRequest);
        int totalPage = productsPage.getTotalPages();
        List<Product> products = productsPage.getContent();
        ProductsResponse productsResponse = ProductsResponse.builder()
                .products(products)
                .totalPage(totalPage)
                .build();
        return ResponseEntity.ok(productsResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") long id) {

        try {
            return ResponseEntity.ok(productService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("not found");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") long id) {
        productService.deleteProduct(id);
        return ResponseEntity.status(HttpStatus.OK).body("delete successfully");
    }

    @PostMapping("/generateProducts")
    public ResponseEntity<?> generateProducts() throws Exception {
        Faker faker = new Faker();
        for(int i = 0; i < 1000; i++) {
            ProductDTO productDTO = ProductDTO.builder()
                    .name(faker.commerce().productName())
                    .price((float) faker.number().numberBetween(10, 90_000_000))
                    .description(faker.lorem().sentence())
                    .categoryId((long)faker.number().numberBetween(2, 5))
                    .thumbnail("")
                    .build();
            productService.createProduct(productDTO);
        }
        return ResponseEntity.ok("generate products successfully");

    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        try {
            productService.updateProduct(id, productDTO);
            return ResponseEntity.ok("update successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("not found product with id " + id);
        }
    }

    @DeleteMapping("/deleteImage")
    public ResponseEntity<?> destroyImages(@RequestBody List<ProductImage> productImages) {
        for (ProductImage productImage : productImages) {
            productService.deleteImgByPublicId(productImage.getPublicId(), productImage.getId());
        }
        return ResponseEntity.ok("delete product images successfully");
    }


}
