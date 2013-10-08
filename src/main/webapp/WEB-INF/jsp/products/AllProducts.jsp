<%-- 
    Document   : AllProducts
    Created on : Oct 2, 2013, 4:47:55 PM
    Author     : ayyad
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <link rel="stylesheet" href="/assets/frontend/css/jquery-ui.css" />
        <script src="/assets/frontend/js/jquery-1.8.2.js"></script>
        <script>
 $(function(){
    
            $("#productsForm").submit(function(){
//                alert('hello');
                document.location.href = "/products/"+$("#products :selected").val()+".html?userId=" +$("#users :selected").val();
            return false;
    });
 });
        </script>
    </head>
    <body>
        <h1>Hello World!</h1>
        
        <br/>
        <form id="productsForm" >
        <select id ="products">
            <c:forEach items="${products}" var="product">
                
                <option value="${product.productId}">${product.name}</option>
            </c:forEach>
        </select>
        
        <select id ="users">
            <c:forEach items="${users}" var="user">
                
                <option value="${user.userId}">${user.name}</option>
            </c:forEach>
        </select>
        <input type="submit" value="Submit" />    
        </form>
    </body>
</html>
