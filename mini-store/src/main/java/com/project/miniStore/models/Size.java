package com.project.miniStore.models;

import jakarta.persistence.*;
import lombok.*;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
@Entity
@Table(name = "sizes")
public class Size {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "text_size")
    private String textSize;
    @Column(name = "num_size")
    private int numSize;
    @Column(name = "size_type")
    private String sizeType;
}
