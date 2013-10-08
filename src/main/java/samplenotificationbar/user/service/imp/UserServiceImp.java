/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package samplenotificationbar.user.service.imp;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Service;
import samplenotificationbar.review.event.AddReviewEvent;
import samplenotificationbar.user.dao.UserDao;
import samplenotificationbar.user.domain.User;
import samplenotificationbar.user.service.UserService;


/**
 *
 * @author mostafa
 */
@Service("userService")
public class UserServiceImp implements UserService, ApplicationListener<AddReviewEvent> {

    UserDao userDao;

    @Autowired
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public List<User> getAllUsers() {
        return userDao.getAllUsers();
    }

    @Override
    public User getUser(Integer userId) {
        return userDao.get(userId);
    }

    @Override
    public void onApplicationEvent(AddReviewEvent e) {
        for (int i = 0; i < 10; i++) {
            System.out.println("I added a review , HAHAHAHAHAAH");
        }

    }

}
