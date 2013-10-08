/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var language=1;
var tableHtml='<div id="table-wrapper"><table id="#table#" class="flexme1"></table></div>';
var errorHtml='<label for="productSize" generated="true" class="error productSize" style="">This field is required.</label>';
function productsHomejs(){
    initProductsTable();
    $("#SearchForm").submit(function(){
        if(!$("#SearchForm").valid()){
            return false;
        }
        $("#table-wrapper").html(tableHtml.replace("#table#", "table-"+language));
        initProductsTable();
        return false;
    })
    runTabs();
    resetForm=function(){
        validator.resetForm();
        $("#ProductForm")[0].reset();
        $("#MainImageVar").val('');
        $("#ProductForm").find(":input[name='productImages']").remove();
        $("#mainImagePrev, #OtherImagesPrev").children('li').remove();
    }
    cancelForm = function(){
        $("#tabs").show();
        $("#add").show();
        $("#ProductForm").attr('action','addReview.htm');
        $("#ProductForm").find('input[name$="submit"]').val('Add Product');
        $("#FormDiv").hide();
        $('#MainImageVar').val('');
        $('#mainImage').attr('src','').hide();
        resetForm();
    }
    $("#cancel").click(function(){
        cancelForm();
    });
 
    $("#ProductForm").submit(function(){
        if($("#MainImageVar").val() == "" || $("#MainImageVar").val() == null){
            $("#mainImagePrev").addClass('error');
            $('.errorImg').show();
            return false;
        }
        if($('select[name=productSize]').val()==null){
            $('select[name=productSize]').parent().append(errorHtml);
            return false;
        }else{
            $('.error.productSize').hide();
            if(!$(this).valid()){
                return false;
            }
            submitMe(this,null,function(jqXHR, textStatus){
                if(jqXHR && jqXHR.status == 200){
                    cancelForm();
                    refreshTableData();
                    jHide();
                }else{
                    jalert("Something went wrong , check your application and try again. ");
                }
            });
            return false;  
        }
       
    })
}
function updateProJs(){
    $("#ProductForm").submit(function(){
        if($("#MainImageVar").val() == "" || $("#MainImageVar").val() == null){
            $("#mainImagePrev").addClass('error');
            $('.errorImg').show();
            return false;
        }
        //        if($('select[name=productSize]').val()==null){
        //            $('select[name=productSize]').parent().append(errorHtml);
        //            return false;
        //        }else{
        $('.error.productSize').hide();
        if(!$(this).valid()){
            return false;
        }
        submitMe(this,null,function(jqXHR, textStatus){
            if(jqXHR && jqXHR.status == 200){
                window.location.href='home.htm';
            }else{
                jalert("Something went wrong , check your application and try again. ");
            }
        });
        return false;
    //        }
    })
    $("#ProductFormTranslation").submit(function(){
        if(!$(this).valid()){
            return false;
        }
        submitMe(this,null,function(jqXHR, textStatus){
            if(jqXHR && jqXHR.status == 200){
                window.location.href=jqXHR.responseText+'.htm';
            }else{
                jalert("Something went wrong , check your application and try again. ");
            }
        });
        return false;
    })
    $("#translation").click(function(){
        $("#FormDiv").hide();
        //$("#CategoryFormTranslation").find('li[id$="img"]').html('').append($("#CategoryForm").find('li[id$="img"]').clone(true));
        $("#FormDivTranslation").show();
    });
    $("#cancelTranslation").click(function(){
        $("#FormDiv").show();
        $("#FormDivTranslation").hide();
    });
}
//run tabs
function runTabs(){
    $('.langs').click(function(){
        language=$(this).attr("language");
        copyh=tableHtml;
        $(language==1?'#tab-English':'#tab-Japanese').html(copyh.replace("#table#", "table-"+language));
        runLangOptions();        
        initProductsTable();
    });
    $('#language').change(function(){
        language=$('#language').val();
        runLangOptions();
    });
    $('#tabs').tabs();
    $('#dialog_link, ul#icons li').hover(
        function() {
            $(this).addClass('ui-state-hover');
        },
        function() {
            $(this).removeClass('ui-state-hover');
        }
        );
    runLangOptions();
}
function runLangOptions(){
    $('option[lan='+language+'],option[lan='+language+']').show(); 
    $('option[lan='+(language==1?2:1)+'],option[lan='+(language==1?2:1)+']').hide(); 
    $('#language').find('option').removeAttr("selected");
    $('#language option[value='+language+']').attr('selected','selected');
}
addCheckBox = function(dataCell, object) {
    dataCell.innerHTML = '<input type="checkbox" name="productId" id="productId" value="'+object.id+'">';
}
changeStatusLink = function(dataCell, object) {
    
    if(object.active){
        dataCell.innerHTML = 'active!';
    }else{
        dataCell.innerHTML = 'in-active';
    }
    $(dataCell).css('cursor','pointer')
    $(dataCell).click(function(){
        
       
        $.ajax({
            url:change+'changreviewstatus.htm',
            data:{
                reviewId:object.id
            },
            success:function(){
                refreshTableData();
            }
        })
    });
}





formatName = function(dataCell,object){
    dataCell.innerHTML = object.product.name.substr(0, 20);
    if(object.pname)
        $(dataCell).css('cursor','pointer').click(function(){
            jalert(object.name);
        });
}
formatUName = function(dataCell,object){
    dataCell.innerHTML = object.user.email.substr(0, 40);
    if(object.uname)
        $(dataCell).css('cursor','pointer').click(function(){
            jalert(object.uname);
        });
}

formatReview = function(dataCell,object){
    dataCell.innerHTML = object.text.substr(0, 2000);
    if(object.text)
        $(dataCell).css('cursor','pointer').click(function(){
            jalert(object.text);
        });
}
formatDate = function(dataCell,object){
    dataCell.innerHTML = object.formatedDate.substr(0, 60);
    if(object.formatedDate)
        $(dataCell).css('cursor','pointer').click(function(){
            jalert(object.formatedDate);
        });
}




function initProductsTable(){
    var cols=[
    {
        display: '<input type=\'checkbox\' onclick="checkAll(this,\'table\');" />',
        name : 'uid',
        sortCol : 'uid',
        width : 30,
        align: 'center',
        formatter: addCheckBox
    },
    {
        display: 'Product Name',
        name : 'pname',
        sortCol : 'product.name',
        width : 130,
        sortable : true,
        align: 'left',
        formatter:formatName
    },
    {
        display: 'User name',
        name : 'uname',
        sortCol : 'user.email',
        width : 130,
        sortable : true,
        align: 'left',
        formatter:formatUName
    },

    {
        display: 'Status',
        name : 'active',
        sortCol : 'active',
        width : 60,
        sortable : true,
        align: 'left',
        formatter:changeStatusLink
    },
    
   
    {
        display: 'Review',
        name : 'text',
        sortCol : 'text',
        width : 500,
        sortable : true,
        align: 'left',
        formatter:formatReview
    } ,
    
    {
        display: 'Creation Date',
        name : 'formatedDate',
        sortCol : 'formatedDate',
        width : 100,
        sortable : true,
        align: 'left',
        formatter:formatDate
    }
    ];
    var params="";
    var url=tableUrl+'&language='+language;
    
    if($("#status").val() != ""){
        params+="&status="+$("#status").val();
    }
   
    
    
    
    url+=params;
    var tableId='table-'+language;
    drawTable(tableId, url, cols) 
}
function drawTable(tableId,urlTofetch,colDefinetion){


    $("#"+tableId).flexigrid({
        url: urlTofetch,
        dataType: 'json',
        colModel : colDefinetion ,
        buttons : [
        /*{
            name: 'ban/activate',
            bclass: 'delete',
            onpress : ban
        },
        {
            separator: true
        }*/
        ],
        /*searchitems : [

        ],*/
        sortname: "id",
        sortorder: "asc",
        usepager: true,
        title: 'Products',
        useRp: true,
        rp: 15,
        showTableToggleBtn: true,
        width: "100%",
        height: 300,
        callback:function(){
            $('.rating').each(function(){
                $(this).raty({
                    readOnly:true,
                    score:$(this).attr('value')
                    });
            })
        }
    }
    );

}
function fetchSizes(){
    var e = document.getElementById("category");
    var categoryName = e.options[e.selectedIndex].text;
    $("#ProductForm").find("optgroup").attr("disabled", "true");
    $("#ProductForm").find("optgroup[label$='"+categoryName+"']").removeAttr("disabled");
    $("#ProductForm").find('select[name$="productSize"]').trigger("liszt:updated");
    
    
}

