/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package samplenotificationbar.review.service.imp;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.ApplicationEventPublisherAware;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import samplenotificationbar.product.event.GetReviewEvent;
import samplenotificationbar.product.service.ProductService;
import samplenotificationbar.review.dao.ReviewDao;
import samplenotificationbar.review.domain.Review;
import samplenotificationbar.review.event.AddReviewEvent;
import samplenotificationbar.review.service.ReviewService;
import samplenotificationbar.user.service.UserService;

/**
 *
 * @author mostafa
 */
@Service("reviewService")
public class ReviewServiceImp implements  ReviewService {

    ReviewDao reviewDao;
    ApplicationEventPublisher applicationEventPublisher;
    UserService userService;
    ProductService productService;
   

    @Autowired
    public void setProductService(ProductService productService) {
        this.productService = productService;
    }

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    public void setReviewDao(ReviewDao reviewDao) {
        this.reviewDao = reviewDao;
    }

    @Override
    public List<Review> getAllReviewsForProduct(Integer productId) {
        return reviewDao.getAllProductReviews(productId);
    }

    @Override
    public List<Review> getUserProductReviews(Integer userId, Integer productId) {
        return reviewDao.getUserProductReviews(userId, productId);
    }

    

    @Override
    @Transactional
    public void saveReview(Review review) {
        reviewDao.save(review);
       
    }

    

    @Override
    public Review getReview(Integer reviewId) {
        return reviewDao.get(reviewId);
    }

   
}
