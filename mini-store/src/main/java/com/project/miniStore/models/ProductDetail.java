package com.project.miniStore.models;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "product_details")
@IdClass(ProductDetailId.class)
public class ProductDetail {
    @Id
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
    @Id
    @ManyToOne
    @JoinColumn(name = "size_id")
    private Size size;
    @Id
    @ManyToOne
    @JoinColumn(name = "color_id")
    private Color color;
    private int quantity;
}
