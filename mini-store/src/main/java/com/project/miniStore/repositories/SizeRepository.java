package com.project.miniStore.repositories;

import com.project.miniStore.models.Size;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SizeRepository extends JpaRepository<Size, Long> {
}