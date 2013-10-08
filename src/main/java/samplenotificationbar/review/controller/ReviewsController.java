/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package samplenotificationbar.review.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.icepush.PushContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.ModelAndView;
import samplenotificationbar.icepush.util.BasePushRequestContext;
import samplenotificationbar.icepush.util.PushRequestManager;
import samplenotificationbar.product.service.ProductService;
import samplenotificationbar.review.domain.Review;
import samplenotificationbar.review.service.ReviewService;
import samplenotificationbar.user.service.UserService;
import viper.core.viewutil.JSONView;

/**
 *
 * @author mostafa
 */
@Controller
@RequestMapping("/reviews")
public class ReviewsController {
    
    PushRequestManager pushRequestManager;
    ReviewService reviewService;
    ProductService productService;
    UserService userService;
    Review currentReview;
    @Autowired
    public void setPushRequestManager(PushRequestManager pushRequestManager) {
        this.pushRequestManager = pushRequestManager;
    }
    
    
    
    
    @Autowired
    public void setReviewService(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @Autowired
    public void setProductService(ProductService productService) {
        this.productService = productService;
    }
    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }
    
    
    @RequestMapping(value="/reviewNotifier.htm",method = RequestMethod.POST)
    public String notifyAllUsers(@RequestParam("userId")Integer userId , @RequestParam("productId") Integer productId,@RequestParam("text")String comment,HttpServletRequest request,HttpServletResponse response, Model model, SessionStatus status){
        Review review = new Review();
        
        review.setComment(comment);
        review.setCommentDate(new Date());
        review.setProduct(productService.getProduct(productId));
        review.setUser(userService.getUser(userId));
        currentReview = review;
        reviewService.saveReview(review);
        
        model.addAttribute("review",review);
        status.setComplete();
       
        PushContext pushContext= PushContext.getInstance(request.getSession()
				.getServletContext());
//	String currentPushId = pushContext.createPushId(request, response);
        pushContext.push(""+productId);
        return "/products/reviews";
    }
    @RequestMapping(value="/getRecentReviews.htm")
    public String getRecentReviews(@RequestParam("group") String productId ,HttpServletRequest request,HttpServletResponse response,Model model){
        
//         return new ModelAndView("results", "chat", chatFormData);
        
//        return new ModelAndView(new JSONView((productService.getRecentReviews(productId) == null)?new ArrayList<Review>():productService.getRecentReviews(productId)));
//         PushContext.getInstance(request.getSession()
//				.getServletContext()).push(productId);
//        
        model.addAttribute("reviews",reviewService.getAllReviewsForProduct(Integer.parseInt(productId)));
        return "/products/reviews";
    } 
    
    @RequestMapping(value="/getRecentReviewsSize.htm")
    public String getRecentReviewsSize(@RequestParam("group") String productId ,HttpServletRequest request,HttpServletResponse response,Model model) throws IOException{
        
//         return new ModelAndView("results", "chat", chatFormData);
        
//        return new ModelAndView(new JSONView((productService.getRecentReviews(productId) == null)?new ArrayList<Review>():productService.getRecentReviews(productId)));
//         PushContext.getInstance(request.getSession()
//				.getServletContext()).push(productId);
//        
      model.addAttribute("reviewsSize", reviewService.getAllReviewsForProduct(Integer.parseInt(productId)).size());
      return "/products/reviewsSize";
      
    }   
}
