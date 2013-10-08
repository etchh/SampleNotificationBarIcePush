/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package samplenotificationbar.util.dao;

import java.io.Serializable;
import java.sql.SQLException;
import java.util.List;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

/**
 *
 * @author ahmed
 */
public abstract class GenericDao<T> extends HibernateDaoSupport {

    private Class clazz;

    @Autowired
    public void GenericcDAO(HibernateTemplate hibernateTemplate) {
        super.setHibernateTemplate(hibernateTemplate);
    }

    protected void setClass(Class clazz) {
        this.clazz = clazz;
    }

    public void update(T object) {
        getHibernateTemplate().saveOrUpdate(object);
    }

    /**
     * 
     * @param t
     */
    public T save(T t) {
        getHibernateTemplate().saveOrUpdate(t);
        return t;
    }

    public void delete(T t) {
        getHibernateTemplate().delete(t);
    }

    /**
     * simple find All elements by class name function 
     * @param entityClass 
     * @param filter 
     * @param orderBy 
     * @param pageNumber 
     * @param itemsPerPage 
     * @return List of entities or null
     */
    protected List<T> findAllFilter(String filter, int pageNumber, final int itemsPerPage, String orderBy) {
        if (filter != null && !filter.isEmpty()) {
            filter = " WHERE " + filter;
        } else {
            filter = "";
        }
        if (orderBy != null && !orderBy.isEmpty()) {
            orderBy = " ORDER BY " + orderBy;
        }

        final String q = "FROM " + clazz.getName() + filter + " " + orderBy;
        final int start = (((pageNumber - 1) * itemsPerPage)) < 0 ? 0 : ((pageNumber - 1) * itemsPerPage);
        List list = getHibernateTemplate().execute(
                new HibernateCallback<List>() {

                    @Override
                    public List<T> doInHibernate(Session session) throws HibernateException, SQLException {
                        return session.createQuery(q).setFirstResult(start).setMaxResults(itemsPerPage).list();
                    }
                });
        return list;
    }

    /**
     * 
     * @param entityClass
     * @param filter
     * @param pageNumber
     * @param itemsPerPage
     * @return 
     */
    protected List<T> findAllFilter(String filter, int pageNumber, int itemsPerPage) {
        return this.findAllFilter(filter, pageNumber, itemsPerPage, "");
    }

    /**
     * 
     * @param entityClass
     * @param filter
     * @return 
     */
    protected List<T> findAllFilter(String filter) {
        if (filter != null && !filter.isEmpty()) {
            filter = " WHERE " + filter;
        }
        String q = "FROM " + clazz.getName() + filter + " ";
        List list = getHibernateTemplate().find(q);
        return list;
    }

    /**
     * find All support the pagination
     * @param entityClass
     * @return List of entities or null
     */
    public List<T> findAll() {
        return getHibernateTemplate().find("from " + clazz.getName());
    }

    /**
     * 
     * @param entityClass
     * @param pageNumber
     * @param itemsPerPage
     * @return 
     */
    protected List<T> findAll(int pageNumber, int itemsPerPage) {
        return this.findAll(pageNumber, itemsPerPage, "");
    }

    /**
     * 
     * @param entityClass
     * @param pageNumber
     * @param itemsPerPage
     * @param orderBy
     * @return 
     */
    protected List<T> findAll(int pageNumber, int itemsPerPage, String orderBy) {
        return findAllFilter("", pageNumber, itemsPerPage, orderBy);
    }

    protected long allItemsSize() {
        return getHibernateTemplate().execute(new HibernateCallback<Long>() {

            @Override
            public Long doInHibernate(Session sn) throws HibernateException, SQLException {
                return (Long) sn.createQuery("select count(id) from " + clazz.getName()).list().get(0);
            }
        });
    }
     /**
     * 
     * @param languageId
     * @return  long
     */
    protected long allItemsSize(final int languageId,final String qtype,final String query) {
        return getHibernateTemplate().execute(new HibernateCallback<Long>() {

            @Override
            public Long doInHibernate(Session sn) throws HibernateException, SQLException {
                String q="";
                if(!qtype.isEmpty()&&!query.isEmpty()) q=" and "+qtype+" like '%"+ query+"%'";
                return (Long) sn.createQuery("select count(id) from " + clazz.getName()+" where language.id = :languageId "+q).setInteger("languageId", languageId).list().get(0);
            }
        });
    }
     /**
     * 
     * @param languageId
     * @return  long
     */
    protected long allItemsSize(final int languageId) {
        return getHibernateTemplate().execute(new HibernateCallback<Long>() {

            @Override
            public Long doInHibernate(Session sn) throws HibernateException, SQLException {
                return (Long) sn.createQuery("select count(id) from " + clazz.getName()+" where language.id = :languageId ").setInteger("languageId", languageId).list().get(0);
            }
        });
    }

    /**
     * 
     * @param entityClass
     * @param id
     */
    protected void delete(Serializable id) {
        Object obj = this.getObject(id);
        getHibernateTemplate().delete(obj);
    }

    /**
     * get object by id
     * @param entityClass
     * @param id
     * @return object or null
     */
    protected T getObject(Serializable id) {
        return (T) getHibernateTemplate().get(clazz.getName(), id);
    }

    /**
     * 
     * @param entityClass
     * @param id
     * @return 
     */
    public T get(Integer id) {
        return (T) getHibernateTemplate().get(clazz.getName(), id);
    }

    /**
     * 
     * @param entityClass
     * @param filter
     * @param order
     * @return 
     */
    protected List findAllByOrder(String filter, String order) {
        if (filter != null && !filter.isEmpty()) {
            filter = " WHERE " + filter;
        }
        if (order != null && !order.isEmpty()) {
            order = " ORDER BY " + order;
        }
        String q = "FROM " + clazz.getName() + filter + " " + order;
        List list = getHibernateTemplate().find(q);

        return list;
    }

    /**
     * 
     * @param entityClass
     * @param order
     * @return 
     */
    protected List findAllByOrder(String order) {
        return getHibernateTemplate().find("FROM " + clazz.getName() + " " + ((order != null && !order.isEmpty()) ? order : ""));
    }

    /**
     * 
     * @param entityClass
     * @param order
     * @return 
     */
    protected long allItemsSize(String filter) {
        if (filter != null && !filter.isEmpty()) {
            filter = " WHERE " + filter;
        } else {
            filter = "";
        }
        final String querySt = "select count(id) from " + clazz.getName() + filter;
        return getHibernateTemplate().execute(new HibernateCallback<Long>() {

            @Override
            public Long doInHibernate(Session sn) throws HibernateException, SQLException {
                Query query = sn.createQuery(querySt);
                return (Long) query.list().get(0);
            }
        });
    }
}
