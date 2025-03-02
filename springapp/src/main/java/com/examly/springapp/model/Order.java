package com.examly.springapp.model;

import java.time.LocalDate;
import java.util.*;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "temporary_order")
@Data 
@NoArgsConstructor 
@AllArgsConstructor 
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Column(nullable = false)
    private LocalDate orderDate;

    @Column(nullable = false)
    private String orderStatus;

    @Column(nullable = false)
    private String shippingAddress;

    @Column(nullable = false)
    private String billingAddress;

    @Column(nullable = false)
    private Double totalAmount;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems;
}
