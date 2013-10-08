/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package samplenotificationbar.review.domain;

import java.text.SimpleDateFormat;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.Transient;
import org.hibernate.annotations.ForeignKey;
import samplenotificationbar.product.domain.Product;
import samplenotificationbar.user.domain.User;

/**
 *
 * @author mostafa
 */
@Entity
@Table(name = "review")
public class Review {

    private Integer reviewId;
    private String comment;
    private Date commentDate;
    private User user;
    private Product product;
    private String formatedDate;

    public Review() {
    }

    public Review(Integer reviewId, String comment, Date commentDate) {
        this.reviewId = reviewId;
        this.comment = comment;
        this.commentDate = commentDate;
    }

    public Review(Integer reviewId, String comment, Date commentDate, User user, Product product) {
        this.reviewId = reviewId;
        this.comment = comment;
        this.commentDate = commentDate;
        this.user = user;
        this.product = product;
    }

    /**
     *
     * @param formatedDate
     */
    public void setFormatedDate(String formatedDate) {
        this.formatedDate = formatedDate;
    }

    /**
     *
     * @return
     */
    @Transient
    public String getFormatedDate() {
        SimpleDateFormat sdf = new SimpleDateFormat("MMMM d, yyyy");
        return sdf.format(commentDate);
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    public Integer getReviewId() {
        return reviewId;
    }

    public void setReviewId(Integer reviewId) {
        this.reviewId = reviewId;
    }

    @Column(name = "comment", nullable = false, length = 45)
    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @Column(name = "comment_date", nullable = false)
    @Temporal(javax.persistence.TemporalType.TIMESTAMP)
    public Date getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(Date commentDate) {
        this.commentDate = commentDate;
    }

    @ForeignKey(name = "product_id")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = true)
    public Product getProduct() {
        return this.product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    @ForeignKey(name = "user_id")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = true)
    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
