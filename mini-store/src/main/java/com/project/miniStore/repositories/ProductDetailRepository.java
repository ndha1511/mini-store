package com.project.miniStore.repositories;

import com.project.miniStore.models.ProductDetail;
import com.project.miniStore.models.ProductDetailId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductDetailRepository extends JpaRepository<ProductDetail, ProductDetailId> {
}