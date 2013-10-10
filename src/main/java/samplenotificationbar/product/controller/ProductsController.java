/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package samplenotificationbar.product.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.icepush.PushContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import samplenotificationbar.product.service.ProductService;
import samplenotificationbar.review.service.ReviewService;
import samplenotificationbar.user.service.UserService;

/**
 *
 * @author ayyad
 */
@Controller
@RequestMapping("/products")
public class ProductsController {

    private ProductService productService;
    private UserService userService;
    private ReviewService reviewService;

    
    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    public void setReviewService(ReviewService reviewService) {
        this.reviewService = reviewService;
    }
    
    @Autowired
    public void setProductService(ProductService productService) {
        this.productService = productService;
    }
    
    
    
    @RequestMapping("/{productId}.html")
    public String getProduct(@PathVariable Integer productId,@RequestParam("userId") Integer userId, Model model, HttpServletRequest request, HttpServletResponse response) {
        model.addAttribute("product",productService.getProduct(productId));
        model.addAttribute("userId",userId);
        model.addAttribute("user",userService.getUser(userId));
//        model.addAttribute("reviews",reviewService.getAllReviewsForProduct(productId));
        model.addAttribute("reviewsSize",reviewService.getAllReviewsForProduct(productId).size());
        PushContext pushContext = PushContext.getInstance(request.getSession().getServletContext());
        // Generate a push ID for our session
       String currentPushId = pushContext.createPushId(request, response);

        // Generate a unique group name for our session
       String groupName = ""+productId;
        // Add ourselves to a push group
        pushContext.addGroupMember(groupName, currentPushId);
        return "/products/products";
    }
    
    @RequestMapping("/allProducts.html")
    public String getAllProducts( Model model, HttpServletRequest request, HttpServletResponse response) {
        model.addAttribute("products",productService.getAllProducts());
        model.addAttribute("users",userService.getAllUsers());
        return "/products/AllProducts";
    }
}