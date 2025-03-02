package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.exception.ReviewNotFoundException;
import com.examly.springapp.model.Review;
import com.examly.springapp.service.ReviewService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin
public class ReviewController {

    private static final Logger logger = LoggerFactory.getLogger(ReviewController.class);

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    @PreAuthorize("hasAuthority('user')")
    public ResponseEntity<String> addReview(@RequestBody Review review) {
        try {
            reviewService.addReview(review);
            logger.info("Review added successfully");
            return ResponseEntity.status(HttpStatus.CREATED).body("Review added successfully!");
        } catch (Exception e) {
            logger.error("Failed to add review: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to add review: " + e.getMessage());
        }
    }

    @GetMapping("/{reviewId}")
    @PreAuthorize("hasAnyAuthority('user', 'admin')")
    public ResponseEntity<?> viewReviewById(@PathVariable Long reviewId) {
        try {
            Optional<Review> review = reviewService.getReviewById(reviewId);
            if (review.isPresent()) {
                logger.info("Review retrieved with ID: {}", reviewId);
                return ResponseEntity.ok(review.get());
            } else {
                throw new ReviewNotFoundException("Review not found with ID: " + reviewId);
            }
        } catch (ReviewNotFoundException e) {
            logger.error("Review not found exception: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            logger.error("Error retrieving review: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error retrieving review: " + e.getMessage());
        }
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('user', 'admin')")
    public ResponseEntity<?> viewAllReviews() {
        try {
            List<Review> reviews = reviewService.getAllReviews();
            logger.info("All reviews retrieved");
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            logger.error("Failed to retrieve reviews: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to retrieve reviews: " + e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAuthority('user')")
    public ResponseEntity<?> viewReviewsByUserId(@PathVariable Long userId) {
        try {
            List<Review> reviews = reviewService.getReviewsByUserId(userId);
            logger.info("Reviews retrieved for user with ID: {}", userId);
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            logger.error("Reviews not found for user: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reviews not found for user");
        }
    }

    @GetMapping("/product/{productId}")
    @PreAuthorize("hasAnyAuthority('user', 'admin')")
    public ResponseEntity<?> viewReviewsByProductId(@PathVariable Long productId) {
        try {
            List<Review> reviews = reviewService.getReviewsByProductId(productId);
            logger.info("Reviews retrieved for product with ID: {}", productId);
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            logger.error("Reviews not found for product: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reviews not found for product");
        }
    }

    @DeleteMapping("/{reviewId}")
    @PreAuthorize("hasAnyAuthority('user', 'admin')")
    public ResponseEntity<String> deleteReview(@PathVariable Long reviewId) {
        try {
            reviewService.deleteReview(reviewId);
            logger.info("Review deleted with ID: {}", reviewId);
            return ResponseEntity.ok("Review deleted successfully");
        } catch (ReviewNotFoundException e) {
            logger.error("Review not found exception: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            logger.error("Error deleting review: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error deleting review: " + e.getMessage());
        }
    }
}
