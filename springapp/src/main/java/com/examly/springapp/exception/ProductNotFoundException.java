package com.examly.springapp.exception;

// Custom exception for handling cases where a product is not found
public class ProductNotFoundException extends RuntimeException {
    // Default constructor
    public ProductNotFoundException() {
        super();
    }

    // Constructor with custom message
    public ProductNotFoundException(String message) {
        super(message);
    }
}
