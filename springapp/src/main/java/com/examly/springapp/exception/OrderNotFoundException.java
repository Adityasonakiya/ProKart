package com.examly.springapp.exception;

// Custom exception for handling cases where an order is not found
public class OrderNotFoundException extends RuntimeException {
    // Default constructor
    public OrderNotFoundException() {
    }

    // Constructor with custom message
    public OrderNotFoundException(String msg) {
        super(msg);
    }
}
