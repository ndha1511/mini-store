package com.project.miniStore.repositories;

import com.project.miniStore.models.GroupProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupProductRepository extends JpaRepository<GroupProduct, Long> {
}