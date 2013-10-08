/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package samplenotificationbar.product.dao;

import java.util.List;
import samplenotificationbar.product.domain.Product;

/**
 *
 * @author mostafa
 */
public interface ProductDao {
    /**
     * save Product object
     * @param Product
     * @return
     */
    public Product save(Product product);
    
    /**
     * id must be attached.
     * @param product
     */
    public void update(Product product);
    
    /**
     * delete product
     * @param product
     */
    public void delete(Product product);
    
    /**
     * retrieve product
     * @param id
     * @return
     */
    public Product get(Integer id);
    
    public List<Product> getAllProducts();
    
}
