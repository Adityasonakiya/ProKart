package com.examly.springapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.exception.DuplicateProductException;
import com.examly.springapp.exception.ProductNotFoundException;
import com.examly.springapp.model.Product;
import com.examly.springapp.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductService productService;

    @PostMapping
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        try {
            productService.addProduct(product);
            logger.info("Product added successfully: {}", product.getProductName());
            return new ResponseEntity<>(product, HttpStatus.CREATED);
        } catch (DuplicateProductException e) {
            logger.error("Duplicate product exception: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        } catch (Exception e) {
            logger.error("Error adding product: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{productId}")
    @PreAuthorize("hasAnyAuthority('user', 'admin')")
    public ResponseEntity<?> getProductById(@PathVariable Long productId) {
        try {
            Optional<Product> product = productService.getProductById(productId);
            if (product.isPresent()) {
                logger.info("Product retrieved: {}", productId);
                return new ResponseEntity<>(product.get(), HttpStatus.OK);
            } else {
                throw new ProductNotFoundException("Product not found with ID: " + productId);
            }
        } catch (ProductNotFoundException e) {
            logger.error("Product not found exception: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            logger.error("Error retrieving product: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('user', 'admin')")
    public ResponseEntity<?> getAllProducts() {
        try {
            List<Product> products = productService.getAllProducts();
            logger.info("All products retrieved");
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error retrieving all products: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{productId}")
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<?> updateProduct(@PathVariable Long productId, @RequestBody Product product) {
        try {
            productService.updateProduct(productId, product);
            logger.info("Product updated successfully: {}", productId);
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (ProductNotFoundException e) {
            logger.error("Product not found exception: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            logger.error("Error updating product: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{productId}")
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<?> deleteProduct(@PathVariable Long productId) {
        try {
            boolean isDeleted = productService.deleteProduct(productId);
            if (isDeleted) {
                logger.info("Product deleted successfully: {}", productId);
                return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
            } else {
                throw new ProductNotFoundException("Product not found with ID: " + productId);
            }
        } catch (ProductNotFoundException e) {
            logger.error("Product not found exception: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            logger.error("Error deleting product: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
