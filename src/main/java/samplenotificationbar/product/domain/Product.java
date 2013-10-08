/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package samplenotificationbar.product.domain;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import org.hibernate.annotations.ForeignKey;
import samplenotificationbar.review.domain.Review;

/**
 *
 * @author mostafa
 */

@Entity
@Table(name = "product")
public class Product {
    
    Integer productId;
    String name;
    Double price;
    Set<Review> reviews = new HashSet<Review>();
    
    
    public Product(){
        
    }
    public Product(Integer productId , String name , Double price){
        this.productId = productId;
        this.name = name;
        this.price = price;
    }
    public Product(Integer productId , String name , Double price , Set<Review> reviews){
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.reviews = reviews;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    @Column(name = "name", nullable = false, length = 45)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "price", nullable = false)
    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
    
    @ForeignKey(name = "product_id")
    @OneToMany(cascade= {CascadeType.PERSIST, CascadeType.REFRESH},fetch= FetchType.EAGER)
    @JoinColumn(name = "product_id")
    public Set<Review> getReviews() {
        return reviews;
    }

    public void setReviews(Set<Review> reviews) {
        this.reviews = reviews;
    }
    
}
