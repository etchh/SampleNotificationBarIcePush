/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package viper.core.viewutil;

import flexjson.JSONSerializer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.View;

/**
 *
 * @author anashat
 */
public class DataViewSerializer implements View {

    String[] includes = null;
    List<Object> objects = null;
    int size = 0;
    int page = 0;

    /**
     *
     * @param collection
     * @param size
     * @param page
     * @param includes
     */
    public DataViewSerializer(List objects, int size, int page, List<String> includes) {
        this.includes = includes.toArray(new String[includes.size()]);
        this.size = size;
        this.page = page;
        this.objects = objects;
    }

    public DataViewSerializer(List objects, int size, int page, String... includes) {
        this.includes = includes;
        this.size = size;
        this.page = page;
        this.objects = objects;
    }

    /**
     *
     * @param collection
     * @param size
     * @param page
     */
    public DataViewSerializer(List objects, int size, int page) {
        this.size = size;
        this.page = page;
        this.objects = objects;
    }

    /**
     *
     * @return
     */
    @Override
    public String getContentType() {
        return "text/json";
    }

    /**
     *
     * @param map
     * @param request
     * @param response
     * @throws Exception
     */
  @Override
    public void render(Map map, HttpServletRequest request, HttpServletResponse response) throws Exception {
        JSONSerializer serializer = new JSONSerializer();
        Map<String, Object> data = new HashMap<String, Object>();
        if (includes != null) {
            for (String include : includes) {
                serializer.include(include);
            }
        }    
        serializer.exclude("*");
        String serialzedData=serializer.serialize(objects);
        String serialzedAll="{\"page\":"+page+",\"total\":"+size+",\"rows\":"+serialzedData+"}";
        response.getWriter().write(serialzedAll);
    }	

}
