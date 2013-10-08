/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package samplenotificationbar.user.domain;

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
@Table(name = "user")
public class User {
    
    Integer userId;
    String name;
    String email;
    Set<Review> reviews = new HashSet<Review>();
    
    public User(){
        
    }

    public User(Integer userId, String name, String email) {
        this.userId = userId;
        this.name = name;
        this.email = email;
    }
    public User(Integer userId, String name, String email,Set<Review> reviews) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.reviews = reviews;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Column(name = "name", nullable = false, length = 45)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "email", nullable = false, length = 45)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    @ForeignKey(name = "user_id")
    @OneToMany(cascade= {CascadeType.PERSIST, CascadeType.REFRESH},fetch= FetchType.EAGER)
    @JoinColumn(name = "user_id")
    public Set<Review> getReviews() {
        return reviews;
    }

    public void setReviews(Set<Review> reviews) {
        this.reviews = reviews;
    }

    
    
    
}
