/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package samplenotificationbar.review.dao.hpmImp;

import java.sql.SQLException;
import java.util.List;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.stereotype.Repository;
import samplenotificationbar.review.dao.ReviewDao;
import samplenotificationbar.review.domain.Review;
import samplenotificationbar.util.dao.GenericDao;

/**
 *
 * @author mostafa
 */
@Repository("reviewDao")
public class ReviewDaoImp extends GenericDao<Review> implements ReviewDao {

    {
        super.setClass(Review.class);
    }

    

    @Override
    public List<Review> getUserProductReviews(final Integer userId, final Integer productId) {
        return getHibernateTemplate().executeFind(new HibernateCallback<List<Review>>() {

            @Override
            public List<Review> doInHibernate(Session sn) throws HibernateException, SQLException {
                Query q = sn.createQuery("from Review where userId = :userId and productId = :productId order by commentDate desc");
                q.setInteger("userId", userId);
                q.setInteger("productId", productId);
                return q.list();
            }
        });
    }

    @Override
    public List<Review> getAllProductReviews(final Integer productId) {
        return getHibernateTemplate().executeFind(new HibernateCallback<List<Review>>() {

            @Override
            public List<Review> doInHibernate(Session sn) throws HibernateException, SQLException {
                Query q = sn.createQuery("from Review where product.productId = :productId order by commentDate desc");
                q.setInteger("productId", productId);
                return q.list();
            }
        });
    }

    

   
   
}
