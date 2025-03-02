package com.examly.springapp.exception;

// Custom exception for handling cases where a review is not found
public class ReviewNotFoundException extends RuntimeException {
    // Default constructor
    public ReviewNotFoundException() {
        super();
    }

    // Constructor with custom message
    public ReviewNotFoundException(String message) {
        super(message);
    }
}
