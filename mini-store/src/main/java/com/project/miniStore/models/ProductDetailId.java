package com.project.miniStore.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class ProductDetailId implements Serializable {
    private Product product;
    private Color color;
    private Size size;
}
