package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import com.examly.springapp.model.Order;

public interface OrderService {
    void addOrder(Order order);
    Optional<Order> getOrderById(Long orderId);
    List<Order> getAllOrders();
    void updateOrder(Long orderId, Order updatedOrder);
    List<Order> getOrdersByUserId(int userId);
    boolean deleteOrder(Long orderId);
}