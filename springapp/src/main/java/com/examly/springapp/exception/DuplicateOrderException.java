package com.examly.springapp.exception;


public class DuplicateOrderException extends RuntimeException {
   public DuplicateOrderException(){
        
    }   

    public DuplicateOrderException(String msg){
        super(msg);
    }    
}