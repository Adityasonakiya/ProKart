package com.examly.springapp.service;

import com.examly.springapp.model.Order;
import com.examly.springapp.model.OrderItem;
import com.examly.springapp.model.Product;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.OrderRepo;
import com.examly.springapp.repository.ProductRepo;
import com.examly.springapp.repository.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
    
    @Autowired
    private OrderRepo orderRepository;

    @Autowired
    private ProductRepo productRepository;

    @Autowired
    private UserRepo userRepository;

    private static final Logger logger = LoggerFactory.getLogger(OrderServiceImpl.class);

    @Override
    public void addOrder(Order order) {
        Optional<User> optionalUser = userRepository.findById(order.getUser().getUserId());
        User user = optionalUser.orElseGet(() -> userRepository.save(order.getUser()));
        order.setUser(user);
        logger.info("Adding order for user: {}", user.getEmail());

        double totalAmount = 0;

        for (OrderItem item : order.getOrderItems()) {
            item.setOrder(order);
            Product product = item.getProduct();
            int orderedQuantity = item.getQuantity();
            totalAmount += product.getPrice() * orderedQuantity;

            int newStock = product.getStockQuantity() - orderedQuantity;
            if (newStock < 0) {
                logger.error("Not enough stock for product: {}", product.getProductName());
                throw new RuntimeException("Not enough stock for product: " + product.getProductName());
            }
            product.setStockQuantity(newStock);
            productRepository.save(product);
        }

        order.setTotalAmount(totalAmount);
        orderRepository.save(order);
        logger.info("Order added successfully for user: {}", user.getEmail());
    }

    @Override
    public Optional<Order> getOrderById(Long orderId) {
        logger.info("Fetching order with ID: {}", orderId);
        return orderRepository.findById(orderId);
    }

    @Override
    public List<Order> getAllOrders() {
        logger.info("Fetching all orders");
        return orderRepository.findAll();
    }

    @Override
    public void updateOrder(Long orderId, Order updatedOrder) {
        Optional<Order> existingOrderOptional = orderRepository.findById(orderId);
        if (existingOrderOptional.isPresent()) {
            Order existingOrder = existingOrderOptional.get();

            existingOrder.setTotalAmount(updatedOrder.getTotalAmount());
            existingOrder.setOrderStatus(updatedOrder.getOrderStatus());

            orderRepository.save(existingOrder);
            logger.info("Order updated successfully with ID: {}", orderId);
        } else {
            logger.error("Order not found with ID: {}", orderId);
            throw new RuntimeException("Order not found with ID: " + orderId);
        }
    }

    @Override
    public List<Order> getOrdersByUserId(int userId) {
        logger.info("Fetching orders for user with ID: {}", userId);
        return orderRepository.findByUserUserId(userId);
    }

    @Override
    public boolean deleteOrder(Long orderId) {
        Optional<Order> order = orderRepository.findById(orderId);
        if (order.isPresent()) {
            orderRepository.delete(order.get());
            logger.info("Order deleted successfully with ID: {}", orderId);
            return true;
        } else {
            logger.error("Order not found with ID: {}", orderId);
            throw new RuntimeException("Order not found with ID: " + orderId);
        }
    }
}
