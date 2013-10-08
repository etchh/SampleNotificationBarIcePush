/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package samplenotificationbar.user.dao.hpmImp;

import java.util.List;
import org.springframework.stereotype.Repository;
import samplenotificationbar.user.dao.UserDao;
import samplenotificationbar.user.domain.User;
import samplenotificationbar.util.dao.GenericDao;

/**
 *
 * @author mostafa
 */
@Repository("userDao")
public class UserDaoImp extends GenericDao<User> implements UserDao{
    
    {
        super.setClass(User.class);
    }

    @Override
    public List<User> getAllUsers() {
        return super.findAllByOrder("order by name ASC");
    }
}
