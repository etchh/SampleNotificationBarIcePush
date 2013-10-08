/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package samplenotificationbar.entry.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author mostafa
 */
@Controller
public class Index {
    
    @RequestMapping({"/index.html", "/", "/home.html"})
    public String home( HttpServletRequest request, HttpServletResponse response) {
        //ayyad
        return "index";
    }
    
}
