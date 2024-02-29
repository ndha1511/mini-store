package com.project.miniStore.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 350)
    private String name;
    private Float price;
    @Column(length = 300)
    private String thumbnail;
    @Column(length = 300)
    private String description;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
