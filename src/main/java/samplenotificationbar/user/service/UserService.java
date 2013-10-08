/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package samplenotificationbar.user.service;

import java.util.List;
import samplenotificationbar.user.domain.User;

/**
 *
 * @author mostafa
 */
public interface UserService {
    public User getUser(Integer userId);
    
    public List<User> getAllUsers();
    
}
