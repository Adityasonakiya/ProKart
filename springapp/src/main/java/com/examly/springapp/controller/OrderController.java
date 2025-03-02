package com.examly.springapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.exception.OrderNotFoundException;
import com.examly.springapp.exception.DuplicateProductException;
import com.examly.springapp.model.Order;
import com.examly.springapp.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrderController {

    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private OrderService orderService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('user', 'admin')")
    public ResponseEntity<?> addOrder(@RequestBody Order order) {
        try {
            orderService.addOrder(order);
            logger.info("Order placed successfully: {}", order.getOrderId());
            return new ResponseEntity<>("Order Placed Successfully!", HttpStatus.CREATED);
        } catch (DuplicateProductException e) {
            logger.error("Duplicate product exception: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        } catch (Exception e) {
            logger.error("Error placing order: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{orderId}")
    @PreAuthorize("hasAnyAuthority('user', 'admin')")
    public ResponseEntity<?> getOrderById(@PathVariable Long orderId) {
        try {
            Optional<Order> order = orderService.getOrderById(orderId);
            if (order.isPresent()) {
                logger.info("Order retrieved: {}", orderId);
                return new ResponseEntity<>(order.get(), HttpStatus.OK);
            } else {
                throw new OrderNotFoundException("Order not found with ID: " + orderId);
            }
        } catch (OrderNotFoundException e) {
            logger.error("Order not found exception: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            logger.error("Error retrieving order: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAuthority('user')")
    public ResponseEntity<?> getOrdersByUserId(@PathVariable int userId) {
        try {
            List<Order> orders = orderService.getOrdersByUserId(userId);
            if (orders.isEmpty()) {
                logger.warn("Orders not found for user: {}", userId);
                return new ResponseEntity<>("Orders not found", HttpStatus.NOT_FOUND);
            } else {
                logger.info("Orders retrieved for user: {}", userId);
                return new ResponseEntity<>(orders, HttpStatus.OK);
            }
        } catch (Exception e) {
            logger.error("Error retrieving orders for user: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<?> getAllOrders() {
        try {
            List<Order> orders = orderService.getAllOrders();
            logger.info("All orders retrieved");
            return new ResponseEntity<>(orders, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error retrieving all orders: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{orderId}")
    @PreAuthorize("hasAnyAuthority('user', 'admin')")
    public ResponseEntity<?> updateOrder(@PathVariable Long orderId, @RequestBody Order order) {
        try {
            orderService.updateOrder(orderId, order);
            logger.info("Order updated successfully: {}", orderId);
            return new ResponseEntity<>(order, HttpStatus.OK);
        } catch (OrderNotFoundException e) {
            logger.error("Order not found exception: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            logger.error("Error updating order: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{orderId}")
    @PreAuthorize("hasAnyAuthority('user', 'admin')")
    public ResponseEntity<?> deleteOrder(@PathVariable Long orderId) {
        try {
            boolean isDeleted = orderService.deleteOrder(orderId);
            if (isDeleted) {
                logger.info("Order deleted successfully: {}", orderId);
                return new ResponseEntity<>("Order deleted successfully", HttpStatus.OK);
            } else {
                throw new OrderNotFoundException("Order not found with ID: " + orderId);
            }
        } catch (OrderNotFoundException e) {
            logger.error("Order not found exception: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            logger.error("Error deleting order: {}", e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
