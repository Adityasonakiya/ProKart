package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Order;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {
    List<Order> findByUserUserId(int userId);
}
