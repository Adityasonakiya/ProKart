package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exception.ReviewNotFoundException;
import com.examly.springapp.model.Review;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.ReviewRepo;
import com.examly.springapp.repository.UserRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class ReviewServiceImpl implements ReviewService {

    private static final Logger logger = LoggerFactory.getLogger(ReviewServiceImpl.class);

    @Autowired
    private ReviewRepo reviewRepository;

    @Autowired
    private UserRepo userRepository;

    @Override
    public void addReview(Review review) {
        Optional<User> optionalUser = userRepository.findById(review.getUser().getUserId());
        User user = optionalUser.orElseGet(() -> userRepository.save(review.getUser()));
        review.setUser(user);
        reviewRepository.save(review);
        logger.info("Review added successfully for user: {}", user.getEmail());
    }

    @Override
    public Optional<Review> getReviewById(Long reviewId) {
        logger.info("Fetching review with ID: {}", reviewId);
        return reviewRepository.findById(reviewId);
    }

    @Override
    public List<Review> getAllReviews() {
        logger.info("Fetching all reviews");
        return reviewRepository.findAll();
    }

    @Override
    public List<Review> getReviewsByUserId(Long userId) {
        logger.info("Fetching reviews for user with ID: {}", userId);
        return reviewRepository.findByUserUserId(userId);
    }

    @Override
    public List<Review> getReviewsByProductId(Long productId) {
        logger.info("Fetching reviews for product with ID: {}", productId);
        return reviewRepository.findByProductProductId(productId);
    }

    @Override
    public boolean deleteReview(Long reviewId) {
        Optional<Review> review = reviewRepository.findById(reviewId);
        if (review.isPresent()) {
            reviewRepository.delete(review.get());
            logger.info("Review deleted successfully with ID: {}", reviewId);
            return true;
        } else {
            logger.error("Review not found with ID: {}", reviewId);
            throw new ReviewNotFoundException("Review not found with ID: " + reviewId);
        }
    }
}
