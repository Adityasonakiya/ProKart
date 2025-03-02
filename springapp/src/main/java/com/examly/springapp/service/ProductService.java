package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import com.examly.springapp.model.Product;

public interface ProductService {
    void addProduct(Product product);
    Optional<Product> getProductById(Long productId);
    List<Product> getAllProducts();
    void updateProduct(Long productId, Product product);
    boolean deleteProduct(Long productId);
}
