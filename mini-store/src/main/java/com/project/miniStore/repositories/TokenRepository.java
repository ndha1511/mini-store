package com.project.miniStore.repositories;

import com.project.miniStore.models.Token;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<Token, Long> {
}