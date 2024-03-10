package com.project.miniStore.repositories;

import com.project.miniStore.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsByName(String name);
    Page<Product> getAllByCategoryId(Long categoryId,
                                     Pageable pageable);

}