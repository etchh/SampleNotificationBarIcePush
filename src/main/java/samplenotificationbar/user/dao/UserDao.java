/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package samplenotificationbar.user.dao;

import java.util.List;
import samplenotificationbar.product.domain.Product;
import samplenotificationbar.review.domain.Review;
import samplenotificationbar.user.domain.User;

/**
 *
 * @author mostafa
 */
public interface UserDao {
    /**
     * save User object
     * @param User
     * @return
     */
    public User save(User user);
    
    /**
     * id must be attached.
     * @param user
     */
    public void update(User user);
    
    /**
     * delete user
     * @param user
     */
    public void delete(User user);
    
    /**
     * retrieve user
     * @param id
     * @return
     */
    public User get(Integer id);
    
    public List<User> getAllUsers();
    
}
