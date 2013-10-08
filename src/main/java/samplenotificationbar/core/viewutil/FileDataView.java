/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package viper.core.viewutil;

import flexjson.JSONSerializer;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.View;

/**
 *
 * @author shawary
 */
public class FileDataView implements View {

    List<String> includes = null;
    Object object = null;

    /**
     * 
     * @param object
     * @param includes
     */
    public FileDataView(Object object , List includes) {
        this.object = object;
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
        PrintWriter writer = response.getWriter();
        JSONSerializer serializer = new JSONSerializer();

        serializer.exclude("*.class");
        serializer.include("rows");

        if (includes != null) {
            for (String include : includes) {
                serializer.include(include);
            }
        }

        writer.write(serializer.serialize(this.object));
        writer.close();
        response.setContentType("application/json");
    }
}
