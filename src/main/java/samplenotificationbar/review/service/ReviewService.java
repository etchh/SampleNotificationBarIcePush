/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package samplenotificationbar.review.service;

import java.util.List;
import samplenotificationbar.review.domain.Review;

/**
 *
 * @author mostafa
 */
public interface ReviewService {
    public Review getReview(Integer reviewId);
    
    public List<Review> getAllReviewsForProduct(Integer productId);
    
    public List<Review> getUserProductReviews(Integer userId , Integer productId);
    
    public void saveReview(Review review);
    
//    public List getRecentReviews(Integer productId);
    
}
