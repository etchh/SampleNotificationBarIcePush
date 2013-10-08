/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package samplenotificationbar.product.dao.hpmImp;

import java.util.List;
import org.springframework.stereotype.Repository;
import samplenotificationbar.product.dao.ProductDao;
import samplenotificationbar.product.domain.Product;
import samplenotificationbar.util.dao.GenericDao;

/**
 *
 * @author mostafa
 */
@Repository("productDao")
public class ProductDaoImp extends GenericDao<Product> implements ProductDao{
    
    {
        super.setClass(Product.class);
    }

    @Override
    public List<Product> getAllProducts() {
        return super.findAllByOrder("order by name ASC");
    }
}
