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
 * @author Gemy
 */
public class JSONView  implements View{

    String [] includes = null;
    Object object = null;
    String [] excludes=null;
    String [] deepSerializes=null;
    
    public JSONView(Object object , List includes) {
        this.object = object;
        this.includes = (String[]) includes.toArray();
    }

    public JSONView(Object object ,String... includes) {
        this.object = object;
        this.includes = includes;
    }
    public JSONView(Object object , String [] excludes,String... includes ){
        this.object = object;
        this.includes = includes;
        this.excludes=excludes;
    }
    
    public JSONView(Object object){
        this.object = object;
    }
    

    @Override
    public String getContentType() {
        return "text/json";
    }

    @Override
    public void render(Map map, HttpServletRequest request, HttpServletResponse response) throws Exception {
        PrintWriter writer = response.getWriter();
        JSONSerializer serializer = new JSONSerializer();

        if (includes != null) {
            for (String include : includes) {
                serializer.include(include);
            }
        }
        
        serializer.exclude("*.class");
        
        if (excludes != null) {
            for (String exclude : excludes) {
                serializer.exclude(exclude);
            }
        }
        
        writer.write(serializer.serialize(this.object));
        writer.close();
    }
    
}
