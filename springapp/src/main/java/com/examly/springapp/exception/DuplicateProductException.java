package com.examly.springapp.exception;

public class DuplicateProductException extends RuntimeException {
    public DuplicateProductException() {
    }

    public DuplicateProductException(String msg) {
        super(msg);
    }
}