package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exception.DuplicateProductException;
import com.examly.springapp.exception.ProductNotFoundException;
import com.examly.springapp.model.Product;
import com.examly.springapp.repository.ProductRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class ProductServiceImpl implements ProductService {

    private static final Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);

    @Autowired
    private ProductRepo productRepository;

    @Override
    public void addProduct(Product product) throws DuplicateProductException {
        if (productRepository.findByProductName(product.getProductName()).isPresent()) {
            logger.error("Product already exists: {}", product.getProductName());
            throw new DuplicateProductException("Product already exists");
        }
        productRepository.save(product);
        logger.info("Product added successfully: {}", product.getProductName());
    }

    @Override
    public Optional<Product> getProductById(Long productId) {
        logger.info("Fetching product with ID: {}", productId);
        return productRepository.findById(productId);
    }

    @Override
    public List<Product> getAllProducts() {
        logger.info("Fetching all products");
        return productRepository.findAll();
    }

    @Override
    public void updateProduct(Long productId, Product product) {
        Optional<Product> existingProduct = productRepository.findById(productId);
        existingProduct.ifPresent(prod -> {
            prod.setProductName(product.getProductName());
            prod.setPrice(product.getPrice());
            prod.setCategory(product.getCategory());
            prod.setBrand(product.getBrand());
            prod.setDescription(product.getDescription());
            prod.setStockQuantity(product.getStockQuantity());
            prod.setCoverImage(product.getCoverImage());
            productRepository.save(prod);
            logger.info("Product updated successfully: {}", productId);
        });
        if (!existingProduct.isPresent()) {
            logger.error("Product not found: {}", productId);
            throw new ProductNotFoundException("Product not found with ID: " + productId);
        }
    }

    @Override
    public boolean deleteProduct(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isPresent()) {
            productRepository.delete(product.get());
            logger.info("Product deleted successfully: {}", productId);
            return true;
        } else {
            logger.error("Product not found: {}", productId);
            throw new ProductNotFoundException("Product not found with ID: " + productId);
        }
    }
}
