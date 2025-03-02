package com.examly.springapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product,Long> {
    Optional<Product> findByProductName(String name);
}
