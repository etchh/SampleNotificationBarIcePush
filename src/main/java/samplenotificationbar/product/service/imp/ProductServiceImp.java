/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package samplenotificationbar.product.service.imp;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.ApplicationEventPublisherAware;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Service;
import samplenotificationbar.product.dao.ProductDao;
import samplenotificationbar.product.domain.Product;
import samplenotificationbar.product.event.GetReviewEvent;
import samplenotificationbar.product.service.ProductService;
import samplenotificationbar.review.domain.Review;

/**
 *
 * @author mostafa
 */
@Service("productService")
public class ProductServiceImp implements ProductService {

    ProductDao productDao;
    ApplicationEventPublisher applicationEventPublisher;
    HashMap<Integer, ArrayList<Review>> reviews = new HashMap<Integer, ArrayList<Review>>();
    ArrayList<Review> revList = new ArrayList<Review>();

    @Override
    public HashMap<Integer, ArrayList<Review>> getReviews() {
        return reviews;
    }

    @Override
    public void setReviews(HashMap<Integer, ArrayList<Review>> reviews) {
        this.reviews = reviews;
    }

    @Override
    public ArrayList<Review> getRevList() {

        return revList;
    }

    @Autowired
    public void setProductDao(ProductDao productDao) {
        this.productDao = productDao;
    }

    @Override
    public List<Product> getAllProducts() {
        return productDao.getAllProducts();
    }

    @Override
    public Product getProduct(Integer productId) {
        return productDao.get(productId);
    }

    
        

        
    

    @Override
    public ArrayList<Review> getRecentReviews(Integer productId) {
        revList = reviews.remove(productId);
        
        ArrayList<Review> newList = ((revList == null )? new ArrayList<Review>():(ArrayList<Review>)revList.clone());
        
//        this.publishGetReviewEvent();
        
        return newList;
    }

  
}
