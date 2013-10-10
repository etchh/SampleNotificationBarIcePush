<%-- 
    Document   : ProductPage
    Created on : Aug 22, 2012, 11:53:11 AM
    Author     : Gemy
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib  prefix="icep" uri="http://www.icepush.org/icepush/jsp/icepush.tld" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

        <link rel="stylesheet" href="/assets/frontend/css/jquery-ui.css" />
        <script src="/assets/frontend/js/jquery-1.8.2.js"></script>
        <script src="code.icepush"></script>
        <script>
            var text;

            var reviewsSize = ${reviewsSize}
            $(function() {
                $(".review-next, .review-prev").click(function(e) {
                    e.preventDefault();
                    var page = parseInt($(this).attr('href').substr(1));
                    if (page == 0) {
                        return;
                    }
                    $(".review-prev").attr('href', "#" + (page - 1));
                    $(".review-next").attr('href', "#" + (page + 1));
                    //get the href attributes which contains the page number.
                    if (page > 1) {
                        $(".review-prev").show();
                    } else {
                        $(".review-prev").hide();
                    }
                    if (reviewsSize <= page * 5) {

                        $(".review-next").hide();
                    } else {
                        $(".review-next").show();
                    }
                    callService(page)
                });

                var callService = function(page) {
                    var sort;
                    var sortType;

                    $.getJSON(
                            '/eshop/json/productReviews/${product.productId}.html',
                            {
                                page: page,
                                items: 5

                            },
                    function(sdata) {
                        generateProductsView(sdata)
                    })
                }
                var generateProductsView = function(list) {
                    $(".comment-box").html("");

                    for (var i = 0; i < list.length; i++) {

                        var divItem = document.createElement("div");
                        //divItem.setAttribute("class", "item f");
                        $(divItem).addClass("comment");
                        $(divItem).append("<strong>" + list[i].user.email + "</strong> <span>" + list[i].formatedDate + "</span><p>" + list[i].text + "</p> ");
                        // divItem.setAttribute("id", "productItemDiv");

                        $(".comment-box").append(divItem);
                    }
                }

                $('#addReview').click(function() {
                    var user = "${userId}";
                    if (user == '' || user == null) {
                        user = 0;
                    }
                    if (user == 0) {
                        window.location.href = "/accounts/login.html";
                    }
                    $('#addReviewTextArea').show();
                });

                $('#addReviewButton').click(function() {
                    text = $('#addReviewText').val();


                    var user = "${userId}";
                    if (user == '' || user == null) {
                        user = 0;
                    }
                    if (user == 0) {
                        document.location = "/products/allProducts.html";
                    }
                    else
                        $.post("/reviews/reviewNotifier.htm",
                                {productId:${product.productId}, userId: user, text: text}, "json")


                });


//                setInterval(function() {
//                    $.getJSON("/reviews/getRecentReviews.htm",
//                                {productId:${product.productId} },
//                        function(result) {
////                            jalert("Reviewed ajax successfully ");
//                           
//
//
//                        })
//                                .error(function(XMLHttpRequest, textStatus, errorThrown) {
//                            jalert("Something went wrong. please try again.");
//                        })
//                }, 10000);


            });







        </script>
        <link rel="stylesheet" type="text/css" href="/assets/frontend/css/basic-jquery-slider.css" />
        <script type="text/javascript" src="/assets/backend/lib/jquery.validate.1.9/jquery.validate.js"></script>
        <script type="text/javascript" src="/assets/backend/viper/ajax.submit.js"></script>

        <script type="text/javascript" src="/assets/frontend/js/basic-jquery-slider.js"></script>
        <!-- include jQuery + carouFredSel plugin -->
        <script type="text/javascript" language="javascript" src="/assets/frontend/js/jquery.carouFredSel-6.1.0-packed.js"></script>
        <meta property="og:title" content="${product.name}"/>

        <meta property="og:site_name" content="Canaries official store"/>
        <!-- fire plugin onDocumentReady -->

        <title>${product.name}</title>
    </head>
    <body>
        <div class="main-container">

            <div class="center-container"><!-- zoom -->
                <div class="main-column f" style="padding-left: 5px">

                    <article>   
                        <header> <h1> ${product.name}</h1></header>

                        <div class="f product-column">
                            <div class="f thumbs">

                                <div class="list_carousel">

                                    <a id="prev2" class="smallPrev" href="#"><img src="/assets/frontend/images/collection-prev_1.jpg"/></a>
                                    <a id="next2" class="smallNext" href="#"><img src="/assets/frontend/images/collection-next_1.jpg"/></a>

                                </div>
                            </div>

                            <div class="f followContainer"  >
                                <div class="follow f-r" style="width:130px;margin-top: 5px;margin-right: 18px;">
                                    <div class="f">Share &nbsp;</div>
                                    <nav>
                                        <a id="facebookShare" href="https://www.facebook.com/sharer/sharer.php?u="><img src="/assets/frontend/images/facebook-bw.jpg" longdesc="/assets/frontend/images/facebook.jpg" alt="facebook" /></a>
                                        <a id="twitterShare"  href="https://www.twitter.com/officialsaints"><img src="/assets/frontend/images/twitterBirdIcon_bw.png" longdesc="/assets/frontend/images/twitterBirdIcon.png" alt="twitter" /></a>
                                        <div class="g-plus" id="googleShare" data-action="share" data-annotation="none" data-height="15" data-href=""></div>

                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div class="kit-details f">
                            <article>
                                <header>
                                    <a class="f-r greenFont" id="TellFriend"><font style="color:#00a94e">Tell a friend</font></a>
                                    <div class="">

                                        <h3>${product.name}</h3>
                                        ${product.name}
                                    </div>
                                </header>
                                <br />
                        </div>
                        <div class="row">


                            <a class="greenFont" id="sizeGuideLink">Size guide</a>
                            <label style="color:red;display: none;width:300px;padding-left: 100px;" id="sizeErrorMsg">Please select a size</label>
                        </div> 

                        <div class="row">
                            <label>Quantity</label>
                            <input type="text" class="quantity required number" value="1" maxlength="4" name="amount" id="quantity" />
                            <div class="error"></div>

                        </div>

                    </article>
                    <div class="clearfix"></div>

                </div>

                <input type="button" style="cursor: pointer;" id="addToCart" value="Add To Basket" class="f-r basket-icon" />



                <br /><br />

            </div>
            <c:if test="${fn:length(reviews) ne 0}">
                <div class="main-column f row" style="padding-left: 5px">
                    <article>
                        <header>
                            <h1>Customer Reviews <icep:region group="${product.productId}" page="/reviews/getRecentReviewsSize.htm" evalJS="false"/> <a class="f-r greenFont" id="addReview">Add review</a></h1>
                        </header>
                    </c:if>
                    <div id="addReviewTextArea" style="display: none">
                        <textarea id="addReviewText"> >Add Your Review</textarea>
                        <div class="ta-r button-cont"><input type="submit" value="submit"  id="addReviewButton"  /></div>

                    </div>
                    <div class="comment-box">
                        <icep:region group="${product.productId}" page="/reviews/getRecentReviews.htm" evalJS="false"/>
                    </div>
                    <c:choose>         
                        <c:when test="${fn:length(reviews) ne 0}">           <%-- user reviews postponed --%>

                            <div id="afterReview">
                                <a class="review-prev" style="float: left;display: none;" href="#0"><img src="/assets/frontend/images/prev_arrow.png"/><font style="color:#00a94e;font-weight: bold">&nbsp;Back</font></a>       
                                <a class="review-next" style="float: right<c:if test="${reviewsSize le 5}">;display: none;</c:if>" href="#2" ><font style="color:#00a94e;font-weight: bold">Next&nbsp;</font><img src="/assets/frontend/images/next_arrow.png"/></a>

                                </div>

                            <%--  --%>

                        </article>
                    </div>
                </c:when>
                <c:otherwise>
                    <div class="main-column f row" style="padding-left: 5px;">
                        <article>
                            <header>
                                <h1>Customer Reviews (${fn:length(reviews)}) <a class="f-r greenFont" id="addReview">Add review</a></h1>

                            </header>
                            <div class="comment-box" id="afterReview"></div>

                            <%--  --%>

                        </article>
                    </div> 
                </c:otherwise>
            </c:choose>
            <!-- side column -->
            <%-- will be called via portlets  --%>


            <div class="side-column f-r">


                <div id="recommendation">
                </div>
                <div id="newCollections">
                </div>
            </div>
        </div>
        <div id="tellFriendPopup" class="popupDivTellFriend" style="z-index: 1101;position: absolute;display: none;left: 34%;top:20%;height:auto;">
            <h2>Tell a friend
                <div style="float:right" class="closeDiv"><a id="closePopupTellFriend"><img src="/assets/frontend/images/close.png"/></a></div>
            </h2>
            <form action="/service/tellfriend.html" method="post" class="validate" id="tellFriendForm" name="tellFriendForm">
                <input type="hidden" name="productUrl" value=""/>
                <div style="padding-left: 65px;padding-top: 10px;width:300px;padding-bottom: 10px;">
                    <div class="row" >
                        <label >Your Name</label>
                        <input name="sendername" class="required" type="text" />
                    </div>
                    <c:choose>
                        <c:when test="${userId eq null}">
                            <div class="row" >
                                <label >From</label>
                                <input name="fromName" class="required" type="text" />
                            </div>
                        </c:when>
                        <c:otherwise>
                            <input name="fromName" class="required" type="hidden" value="${loggedUserMail}"/>    
                        </c:otherwise>
                    </c:choose>
                    <div class="row">
                        <label >Friend's Name</label>
                        <input name="recievername" class="required" type="text" />
                    </div>
                    <div class="row">
                        <label >Friend's Email</label>
                        <input name="recieveremail" class="required email" type="text" />
                    </div>
                    <div class="row" style="text-align: right;padding-right: 5px;">
                        <input style="width:51px;height:19px" type="submit" value="Send"/>
                    </div>
                </div>
            </form>
        </div>

        <div id="sizeGuidePopup" class="popupDivTellFriend popupDivSizeGuide" style="z-index: 1101;position: absolute;display: none;left: 20%;top:20%;">
            <h2 style="margin-bottom: 0;margin-bottom: 0">Size guide
                <div style="float:right" class="closeDiv"><a id="closePopupSizeGuide"><img src="/assets/frontend/images/close.png"/></a></div>
            </h2>


            <div>

            </div>
            <div id="tabs">
                <ul style="margin-top: 0;border-bottom: 1px solid #e8e8e8;height:30px">
                    <li><a href="#tabs-1"><font style="color:white">Mini Kit</font></a></li>
                    <li><a href="#tabs-2"><font style="color:white">Children's Shirt</font></a></li>
                    <li><a href="#tabs-3"><font style="color:white">Children's Shorts</font></a></li>
                    <li><a href="#tabs-4"><font style="color:white">Adult Shirt</font></a></li>
                    <li><a href="#tabs-5"><font style="color:white">Adult Shorts</font></a></li>
                    <li><a href="#tabs-6"><font style="color:white">Socks</font></a></li>
                </ul>
                <div id="tabs-1">
                    <table style="border:1px solid #e8e8e8" width="100%" cellpadding="5" cellspacing="0" border="0">
                        <tr>
                            <th >Size</th>
                            <th>Age</th>


                        </tr>
                        <tr>
                            <td class="ta-c">24</td>
                            <td class="ta-c">1-2</td>

                        </tr>
                        <tr>
                            <td class="ta-c">26</td>
                            <td class="ta-c">2-3</td>

                        </tr>

                        <tr>
                            <td class="ta-c">28</td>
                            <td class="ta-c">3-4</td>

                        </tr>




                    </table> 
                </div>
                <div id="tabs-2">
                    <table style="border:1px solid #e8e8e8" width="100%" cellpadding="5" cellspacing="0" border="0">
                        <tr>
                            <th >Size</th>
                            <th>Age</th>
                            <th> 1/2 chest shirt measurement</th>

                        </tr>
                        <tr>
                            <td class="ta-c">34</td>
                            <td class="ta-c">5/6</td>
                            <td class="ta-c">36cms</td>

                        </tr>
                        <tr>
                            <td class="ta-c">36</td>
                            <td class="ta-c">7/8</td>
                            <td class="ta-c">38cms</td>

                        </tr>

                        <tr>
                            <td class="ta-c">38</td>
                            <td class="ta-c">9/10</td>
                            <td class="ta-c">39cms</td>
                        </tr>

                        <tr>
                            <td  class="ta-c">40</td>
                            <td class="ta-c">11/12</td>
                            <td class="ta-c">40cms</td>
                        </tr>


                    </table>   
                </div>
                <div id="tabs-3">
                    <table style="border:1px solid #e8e8e8" width="100%" cellpadding="5" cellspacing="0" border="0">
                        <tr>
                            <th >Size</th>
                            <th>Age</th>
                            <th> 1/2 Waist short measurement</th>

                        </tr>
                        <tr>
                            <td class="ta-c">34</td>
                            <td class="ta-c">5/6</td>
                            <td class="ta-c">27cms</td>

                        </tr>
                        <tr>
                            <td class="ta-c">36</td>
                            <td class="ta-c">7/8</td>
                            <td class="ta-c">29cms</td>

                        </tr>

                        <tr>
                            <td class="ta-c">38</td>
                            <td class="ta-c">9/10</td>
                            <td class="ta-c">30cms</td>
                        </tr>




                    </table>   
                </div>
                <div id="tabs-4">
                    <table style="border:1px solid #e8e8e8" width="100%" cellpadding="5" cellspacing="0" border="0">
                        <tr>
                            <th >Size</th>
                            <th>Age</th>
                            <th> 1/2 chest shirt measurement</th>

                        </tr>
                        <tr>
                            <td class="ta-c">36</td>
                            <td class="ta-c">S</td>
                            <td class="ta-c">44cms</td>

                        </tr>
                        <tr>
                            <td class="ta-c">38</td>
                            <td class="ta-c">M</td>
                            <td class="ta-c">47cms</td>

                        </tr>

                        <tr>
                            <td class="ta-c">40</td>
                            <td class="ta-c">L</td>
                            <td class="ta-c">48cms</td>
                        </tr>
                        <tr>
                            <td class="ta-c">42</td>
                            <td class="ta-c">XL</td>
                            <td class="ta-c">49cms</td>
                        </tr>
                        <tr>
                            <td class="ta-c">44</td>
                            <td class="ta-c">XXL</td>
                            <td class="ta-c">50cms</td>
                        </tr>
                        <tr>
                            <td class="ta-c">46</td>
                            <td class="ta-c">XXXL</td>
                            <td class="ta-c">54cms</td>
                        </tr>
                        <tr>
                            <td class="ta-c">48</td>
                            <td class="ta-c">XXXXL</td>
                            <td class="ta-c">55cms</td>
                        </tr>



                    </table>   
                </div>
                <div id="tabs-5">
                    <table style="border:1px solid #e8e8e8" width="100%" cellpadding="5" cellspacing="0" border="0">
                        <tr>
                            <th >Size</th>
                            <th>Age</th>
                            <th>1/2 Waist short measurement
                            </th>

                        </tr>
                        <tr>
                            <td class="ta-c">32</td>
                            <td class="ta-c">S</td>
                            <td class="ta-c">35cms</td>

                        </tr>
                        <tr>
                            <td class="ta-c">34</td>
                            <td class="ta-c">M</td>
                            <td class="ta-c">37cms</td>

                        </tr>

                        <tr>
                            <td class="ta-c">36</td>
                            <td class="ta-c">L</td>
                            <td class="ta-c">39cms</td>
                        </tr>
                        <tr>
                            <td class="ta-c">38</td>
                            <td class="ta-c">XL</td>
                            <td class="ta-c">40cms</td>
                        </tr>
                        <tr>
                            <td class="ta-c">40</td>
                            <td class="ta-c">XXL</td>
                            <td class="ta-c">41cms</td>
                        </tr>




                    </table>   
                </div>
                <div id="tabs-6">
                    <table style="border:1px solid #e8e8e8" width="100%" cellpadding="5" cellspacing="0" border="0">
                        <tr>
                            <th >Size</th>
                            <th>Shoe Size</th>


                        </tr>
                        <tr>
                            <td class="ta-c">Kids</td>
                            <td class="ta-c">12-3</td>


                        </tr>
                        <tr>
                            <td class="ta-c">Junior</td>
                            <td class="ta-c">4-6</td>


                        </tr>

                        <tr>
                            <td class="ta-c">Adult</td>
                            <td class="ta-c">6-11</td>

                        </tr>





                    </table> 
                </div>
            </div>
        </div>

    </div>
    <script type="text/javascript">
        $(function() {
            $("#TellFriend").click(function() {
                $('input[name="productUrl"]').val(document.URL);
                $('#tellFriendPopup').show();
                $("#tellfriend_overlay").show();
            }),
                    $('#sizeGuideLink').click(function() {
                $('#sizeGuidePopup').show();
                $("#tellfriend_overlay").show();
            });
            $("#closePopupTellFriend").click(function() {
                $("#tellfriend_overlay").hide();
                $("#tellFriendPopup").hide();
            });

            $("#closePopupSizeGuide").click(function() {
                $('#sizeGuidePopup').hide();
                $("#tellfriend_overlay").hide();
            });
        })

        // function sendMail(){
        //   $("#tellfriend").html('<a class="addthis_button_email">Tell friend.</a>');
        // addthis.toolbox("#toolbox");
        //}
        //sendMail();
        // })
    </script>
    <!--[if IE 8]> <div class="ie8"> <![endif]--> 
    <div id="tellfriend_overlay" class="transparentPopup" style="display: none; left: 0px; position: fixed; top: 0px; z-index: 1100; width: 100%; height: 100%; "></div>
    <!--[if IE 8]></div><![endif]--> 
</body>
</html>