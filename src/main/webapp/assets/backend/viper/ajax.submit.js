/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 * supmitting the form in ajax request.
 */
var versionId= Math.floor(Math.random() * 100000000000);
var regex = /(<([^>]+)>)/ig;
var jconfirmedId = 'jconfirmed_'+versionId,jdelete_popupId='jdelete_popup_'+versionId,
joverlayId= 'joverlay_'+versionId,jmessage_deleteId='jmessage_delete_'+versionId,
jcancelId='jcancel_'+versionId,jloading_overlayId='jloading_overlay_'+versionId;
var radiosValue = function(radios){
    for(i=0; i< radios.length;i ++){
        if(radios[i].checked){
            return radios[i].value;
        }
    }
    return null;
}
var fitchArrayValues = function(paramName,array){
    var data = ""
    for(var a=0 ;a < array.length; a++){
        data+=paramName +"="+encodeURIComponent(array[a])+"&";
    }
    return data;
}
var submitMe=function(form,message,complete,loadingmessage){
    jloading(loadingmessage);
    try{
        var data=$(form).serialize();
        var methodType = $(form).attr("method") == null ? "POST":$(form).attr("method") ;
        $.ajax({
            url:$(form).attr('action'),
            type:methodType,
            data:data,
            cache:false,
            complete:function(jqXHR, textStatus){
                if(complete){
                    complete(jqXHR, textStatus);
                    return;
                }
                if(jqXHR && jqXHR.status == 200){
                    if(jqXHR.responseText.length > 200){
                        if(message)
                            jalert(message);
                        else
                            jalert("Something went wrong , check your application and try again. ");
                        return;
                    }
                    window.location.href=jqXHR.responseText;
                }else{
                    if(message)
                        jalert(message);
                    else
                        jalert("Something went wrong , check your application and try again. ");
                }
            }
        });
    }catch(e){
        if(message)
            jalert(message);
        else
            jalert("Something went wrong , check your application and try again. ");
    }
    return false;
}
var jproductPopup = function(html){
    if($('#'+joverlayId).length == 0){
        buildHTML();
    }
    $("html, body").animate({
        scrollTop: 0
    }, "fast");
    $('#'+jdelete_popupId).css({
        left: '45%', 
        marginLeft: ($('#'+jdelete_popupId).outerWidth() / 2) * -1
       
    });
    $('#'+jdelete_popupId).css({
        top: '20%', 
        marginBottom: ($('#'+jdelete_popupId).outerHeight() / 2) * -1
    });
    $("#"+jcancelId).hide();
    $('#'+jloading_overlayId).hide();
    $('#'+jconfirmedId).hide();
    $('#'+jmessage_deleteId).html(html);
    $('#'+joverlayId).fadeIn('fast',function(){
        $('#'+jdelete_popupId).show();
    });
}
var jalert = function(message,loader){
    if (navigator.appVersion.indexOf("MSIE 7.") != -1){
        alert(message.replace(regex, ""));
        if(loader)
            loader();
        loader = null;
        return;
    }
    if($('#'+joverlayId).length == 0){
        buildHTML();
    }
    $("html, body").animate({
        scrollTop: 0
    }, "fast");
    $('#'+jdelete_popupId).css({
        left: '50%', 
        marginLeft: ($('#'+jdelete_popupId).outerWidth() / 2) * -1
    });
    $('#'+jdelete_popupId).css({
        top: '50%', 
        marginBottom: ($('#'+jdelete_popupId).outerHeight() / 2) * -1
    });
    $("#"+jcancelId).hide();
    $('#'+jloading_overlayId).hide();
    $('#'+jmessage_deleteId).html(message);
    $('#'+joverlayId).css('filter', 'alpha(opacity=90); BACKGROUND-COLOR: white');
    $('#'+joverlayId).fadeIn('fast',function(){
        $('#'+jdelete_popupId).show();
    });
    $('#'+jconfirmedId).click(function(){
        $('#'+joverlayId).hide();
        $('#'+jdelete_popupId).hide(function(){
            $('#'+joverlayId).hide();
            if(loader)
                loader();
            loader = null;
        });
    });
}
var jloading = function(message){
    if (navigator.appVersion.indexOf("MSIE 7.") != -1){
        return;
    }
    if($('#'+joverlayId).length == 0){
        buildHTML();
    }
    if ($(window).height() < $(document).height()) {
        $('#'+joverlayId).css({
            height: $(document).height() + 'px'
        });
    } else {
        $('#'+joverlayId).css({
            height: '100%'
        });
    }
    if(message)
        $('#'+jloading_overlayId).html(message);
    message = null;
    $('#'+jloading_overlayId).show();
    $('#'+joverlayId).css('filter', 'alpha(opacity=90); BACKGROUND-COLOR: white');
    $('#'+joverlayId).fadeIn('fast',function(){});
}

var buildHTML = function(loadingMessage,cancelLabel,OkLabel,addCancel){
    $("div#"+joverlayId).remove().next("div#"+jdelete_popupId).remove();
    var joverlay =document.createElement("div");
    joverlay.setAttribute("id",joverlayId);
    joverlay.setAttribute("style", "background-color: black;left: 0;position: fixed;top: 0;z-index: 1100;width:100%;height:100%;filter:alpha(opacity=70);opacity:0.75;display:none;");
    var jloading = document.createElement("span");
    jloading.setAttribute("id", jloading_overlayId);
    jloading.setAttribute("style", "background: #00a94e;margin: 0 auto;color: white;padding: 0px 0px;text-align: center;display: none;position: absolute;left: 50%;margin-left: -50px;padding:6px 20px;");
    if(loadingMessage){
        jloading.innerHTML = loadingMessage;
    }else{
        jloading.innerHTML = 'Saving';
    }
    joverlay.appendChild(jloading);
    document.body.appendChild(joverlay);
    
    var popup = document.createElement("div");
    popup.setAttribute("id", jdelete_popupId);
    popup.setAttribute("style", "left: -138px;word-wrap: break-word;webkit-outline: 0;background-color: white;box-shadow: 0 4px 16px rgba(0,0,0,0.2);"+
        "-webkit-box-shadow: 0 4px 16px rgba(0,0,0,0.2);-moz-box-shadow: 0 4px 16px rgba(0,0,0,0.2);border: solid 1px #ACACAC;border-bottom-color: #999;"+
        "color: black;outline: 0;padding: 15px;position: absolute;top: 0;z-index: 1101;display:none;width: 270px;");
    var message_delete = document.createElement("div");
    message_delete.setAttribute("id", jmessage_deleteId);
    popup.appendChild(message_delete);
    var div = document.createElement("div");
    var aCancel = document.createElement("a");
    aCancel.setAttribute("id", jcancelId);
    if(cancelLabel){
        aCancel.innerHTML = cancelLabel;
    }else{
        aCancel.innerHTML = "Cancel";
    }
    div.appendChild(aCancel);
    if(!addCancel){
        $(aCancel).hide();
    }
    aCancel.setAttribute("style", "float:right !important;margin-left: 5px;background:#00a94e;padding: 3px 8px;margin-top:10px;"+"color:#fff;cursor: pointer;");
    var aconfirmed = document.createElement("a");
    aconfirmed.setAttribute("style", "float:right !important;margin-left: 5px;background:#00a94e;padding: 3px 8px;margin-top:10px;"+"color:#fff;cursor: pointer;");
    $(aconfirmed).hover(function(){
        $(this).css("background-color","#00a94e");
    });
    $(aconfirmed).focus(function(){
        $(this).css("-webkit-box-shadow"," inset 0 0 0 1px #fff;");
        $(this).css("-moz-box-shadow","inset 0 0 0 1px #fff");
        $(this).css("box-shadow","inset 0 0 0 1px #fff");
        $(this).css("border","1px solid white");
        $(this).css("border","1px solid transparent");
        $(this).css("outline","1px solid #4D90FE");
        $(this).css("outline","0 transparent");
    });
    aconfirmed.setAttribute("id", jconfirmedId);
    if(OkLabel){
        aconfirmed.innerHTML = OkLabel;
    }else{
        aconfirmed.innerHTML = "Ok";
    }
    div.appendChild(aconfirmed);
    popup.appendChild(div);
    document.body.appendChild(popup);
}
var jconfirm = function(message,success,failer,OkLabel,CancelLabel){
    if (navigator.appVersion.indexOf("MSIE 7.") != -1){
        var c = confirm(message.replace(regex, ""));
        if(c){
            success();
            failer = null;
            success = null;
            return true;
        }else{
            failer();
            failer = null;
            success = null;
            return false;
        }
    }
    if($('#'+joverlayId).length == 0){
        buildHTML();
    }
    console.log(CancelLabel,OkLabel)
    if(CancelLabel){
        $("#"+jcancelId).html(CancelLabel);
    }
    if(OkLabel){
        $("#"+jconfirmedId).html(OkLabel);
    }
    $('#'+jmessage_deleteId).html(message);
    $("html, body").animate({
        scrollTop: 0
    }, "fast");
    $('#'+jdelete_popupId).css({
        left: '48%', 
        padding:'1%',
        marginLeft: ($('#'+jdelete_popupId).outerWidth() / 2) * -1
    });
    $('#'+jdelete_popupId).css({
        top: '42%', 
        marginBottom: ($('#'+jdelete_popupId).outerHeight() / 2) * -1
    });
    $('#'+joverlayId).css('filter', 'alpha(opacity=90); BACKGROUND-COLOR: white');
    $('#'+joverlayId).fadeIn('fast',function(){
        $('#'+jdelete_popupId).show();
    });
    $("#"+jcancelId).show();
    $('#'+jloading_overlayId).hide();
    $('#'+jcancelId).show().click(function(){
        $('#'+jdelete_popupId).hide('normal',function(){
            $('#'+joverlayId).hide();
            $("#"+jcancelId).hide();
            if(failer)
                failer();
            failer = null;
            success = null;
            $("#"+jcancelId).unbind('click');
        });
    });
    $('#'+jconfirmedId).click(function(){
        $('#'+jdelete_popupId).hide('normal',function(){
            $('#'+joverlayId).hide();
            $("#"+jcancelId).hide();
            if(success)
                success();
            success = null;
            failer = null;
            $("#"+jconfirmedId).unbind('click');
        });
    });
    return false;
}
var jHide= function(){
    $('#'+jdelete_popupId).hide();
    $('#'+joverlayId).hide();
    $("#"+jcancelId).hide();
}
var validator;
var executeAfterJqueryLoad = function(){
    $(function(){
        $('form.ajax-submit').each(function(){
            $(this).submit(function(){
                if($(this).valid()){
                    submitMe(this);
                }
                return false;
            });
        });
        $('form.validate').each(function(){
            validator = $(this).validate();
        })
    });
}
if(typeof jQuery == 'undefined'){
    var scripts = document.getElementsByTagName('script')[0];
    var jquery = document.createElement("script");
    jquery.setAttribute("type", "text/javscript");
    jquery.setAttribute("src", "/assets/backend/lib/jquery-1.7.1.min.js");
    scripts.parentNode.insertBefore(jquery, scripts);
    if(!$().validate){
        var validates = document.createElement("script");
        validates.setAttribute("type", "text/javscript");
        validates.setAttribute("src", "/assets/backend/lib/jquery.validate.1.9/jquery.validate.js");
        scripts.parentNode.insertBefore(validates, scripts);
        window.setTimeout(function(){
            executeAfterJqueryLoad();
        },1000)
    }
}else{
    executeAfterJqueryLoad();
}
$(function(){
    $("form.validate").validate();
})