package com.project.miniStore.repositories;

import com.project.miniStore.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}