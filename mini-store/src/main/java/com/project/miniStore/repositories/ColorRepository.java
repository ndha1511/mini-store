package com.project.miniStore.repositories;

import com.project.miniStore.models.Color;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColorRepository extends JpaRepository<Color, Long> {
}