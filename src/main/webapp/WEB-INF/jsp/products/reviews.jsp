<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");//HTTP 1.1
    response.setHeader("Pragma", "no-cache");//HTTP 1.0
    response.setHeader("Expires", "0");//prevents proxy caching
%>
<c:forEach items="${reviews}" var="review">
<div class="comment">
    <strong>${review.user.email}</strong> <span>${review.formatedDate}</span>
    <p>${review.comment}</p>
</div>
<div class="clearfix"></div>
</c:forEach>
<!--<script type="text/javascript">
$('#chatRoomMessages td:first').css('font-style','italic').fadeIn(1000);
</script>-->
