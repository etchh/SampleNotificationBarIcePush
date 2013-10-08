/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package samplenotificationbar.review.dao;

import java.util.List;
import samplenotificationbar.product.domain.Product;
import samplenotificationbar.review.domain.Review;

/**
 *
 * @author mostafa
 */
public interface ReviewDao {
    
    /**
     * save Review object
     * @param Review
     * @return
     */
    public Review save(Review review);
    
    /**
     * id must be attached.
     * @param review
     */
    public void update(Review review);
    
    /**
     * delete review
     * @param review
     */
    public void delete(Review review);
    
    /**
     * retrieve review
     * @param id
     * @return
     */
    public Review get(Integer id);
    
    public List<Review> getUserProductReviews(Integer userId , Integer productId);
    
    public List<Review> getAllProductReviews(Integer productId);
}
