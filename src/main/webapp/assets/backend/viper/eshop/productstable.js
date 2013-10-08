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
        $("#ProductForm").attr('action','addproduct.htm');
        $("#ProductForm").find('input[name$="submit"]').val('Add Product');
        $("#FormDiv").hide();
        $('#MainImageVar').val('');
        $('#mainImage').attr('src','').hide();
        resetForm();
    }
    $("#cancel").click(function(){
        cancelForm();
    });
    $("#add").click(function(){
        $("#tabs").hide();
        $("#add").hide();
        $("#FormDiv").show();
        resetForm();
        $("#ProductForm").attr('action','/back-end/eshop/products/addproduct.htm');
        $("#ProductForm").find('input[name$="submit"]').val('Add Product'); 
        $("html, body").animate({
            scrollTop:$(".content-box").offset().top
        }, 1000)
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
        
        if(object.parent && !object.parent.active){
            jalert('please activate parent first!');
            return;
        }

        if(!object.image){
            jalert('cannot edit product status without editing other attributes!!! please <a href="'+object.id+'.htm">click here</a> to edit details');
            return;
        }
        $.ajax({
            url:'changeproductstatus.htm',
            data:{
                productId:object.id
            },
            success:function(){
                refreshTableData();
            }
        })
    });
}
changeRateStatusLink = function(dataCell, object){
    
    if(!object.rateStatus){
        dataCell.innerHTML = 'in-active!';
    }else{
        dataCell.innerHTML = 'active';
    }
    $(dataCell).css('cursor','pointer')
    $(dataCell).click(function(){
        
        if(object.parent && !object.parent.rateStatus){
            jalert('please activate parent first!');
            return;
        }

        if(!object.image){
            jalert('cannot edit product status without editing other attributes!!! please <a href="'+object.id+'.htm">click here</a> to edit details');
            return;
        }
        $.ajax({
            url:'changeproductRatestatus.htm',
            data:{
                productId:object.id
            },
            success:function(){
                
                refreshTableData();
            }
        })
    });
}
changeRatingLink = function(dataCell, object){
    
    dataCell.innerHTML = "<span class='rating' value='"+object.avgRating+"'><a style='display:none'>"+object.avgRating+"</a></span>";
    
}

newCollectionFormatter = function(dataCell, object) {
    if(object.newCollection){
        dataCell.innerHTML = 'included';
    }else{
        dataCell.innerHTML = '---';
    }
    $(dataCell).css('cursor','pointer')
    $(dataCell).click(function(){
        //        if(!object.active&&!object.newCollection){
        //            jalert('please activate product first!');
        //            return;
        //        }
        $.ajax({
            url:'changenewcollection.htm',
            data:{
                productId:object.id
            },
            success:function(){
                refreshTableData();
            }
        })
    });
}
formatDescription= function(dataCell,object){
    if(!object.description){
        dataCell.innerHTML = '';
        return;
    }
    if(object.description){
        dataCell.innerHTML = object.description.substr(0, 20);
        $(dataCell).css('cursor','pointer').click(function(){
            jalert(object.description);
        });
    }
}
formatName = function(dataCell,object){
    dataCell.innerHTML = object.name.substr(0, 20);
    if(object.name)
        $(dataCell).css('cursor','pointer').click(function(){
            jalert(object.name);
        });
}
formatModel = function(dataCell,object){
    if(object.model){
        dataCell.innerHTML = object.model.substr(0, 20);
        $(dataCell).css('cursor','pointer').click(function(){
            jalert(object.model);
        });
    } else {
        dataCell.innerHTML = '---';
    }
}
formatEdit = function(dataCell, object){
    dataCell.innerHTML = "<a href='"+object.id+".htm'>edit</a>"; 
}

formatReviews = function(dataCell, object){
    dataCell.innerHTML = "<a href='reviews/"+object.id+".htm'>view reviews</a>"; 
}
//groupFormatter = function(dataCell, object){
//    if(object.group){
//        dataCell.innerHTML = object.group.name;
//    }else{
//        dataCell.innerHTML = "---"
//    }
//}

subCategoryFormatter = function(dataCell, object){
    if(object.category){
        dataCell.innerHTML = object.category.name;
    }else{
        dataCell.innerHTML = "---";
    }
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
        display: 'Name',
        name : 'name',
        sortCol : 'name',
        width : 130,
        sortable : true,
        align: 'left',
        formatter:formatName
    },
    {
        display: 'Model',
        name : 'model',
        sortCol : 'model',
        width : 80,
        sortable : true,
        align: 'left',
        formatter:formatModel
    },
    {
        display: 'Price',
        name : 'price2',
        sortCol : 'price2',
        width : 100,
        sortable : true,
        align: 'center'
    },
    /*{
        display: 'Quantity',
        name : 'quantity',
        sortCol : 'quantity',
        width : 40,
        sortable : true,
        align: 'center'
    },
    {
        display: 'Rating',
        name : 'rating',
        sortCol : 'rating',
        width : 40,
        sortable : true,
        align: 'center'
    },
    {
        display: 'Raters',
        name : 'raters',
        sortCol : 'raters',
        width : 40,
        sortable : true,
        align: 'center'
    },*/
    {
        display: 'Viewed',
        name : 'viewed',
        sortCol : 'viewed',
        width : 50,
        sortable : true,
        align: 'center'
    },
    {
        display: 'Sold',
        name : 'sold',
        sortCol : 'sold',
        width : 50,
        sortable : true,
        align: 'center'
    },
    /*{
        display: 'allow pre-order',
        name : 'allowPreOrder',
        sortCol : 'allowPreOrder',
        width : 80,
        sortable : true,
        align: 'center'
    },*/
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
        display: 'Rate Status',
        name : 'rateStatus',
        sortCol : 'rateStatus',
        width : 60,
        sortable : true,
        align: 'left',
        formatter:changeRateStatusLink
    },
    {
        display: 'Rating',
        name : 'rating',
        sortCol : 'rating/raters',
        width : 100,
        sortable : true,
        align: 'left',
        formatter:changeRatingLink
    },
    
    {
        display: 'New Coll. (click to add)',
        name : 'newCollection',
        sortCol : 'newCollection',
        width : 115,
        sortable : true,
        align: 'center',
        formatter:newCollectionFormatter
    },
    //    {
    //        display: 'Group',
    //        name : 'group',
    //        sortCol : 'group.id',
    //        width : 100,
    //        sortable : true,
    //        align: 'center',
    //        formatter:groupFormatter
    //    },
    {
        display: 'Eatec type',
        name : 'category',
        sortCol : 'category',
        width : 115,
        sortable : true,
        align: 'center',
        formatter:subCategoryFormatter
    },
    /*{
        display: 'Manufact.',
        name : 'manufacture.name',
        sortCol : 'manufacture.id',
        width : 60,
        sortable : true,
        align: 'left'
    },*/
    {
        display: 'Description',
        name : 'description',
        sortCol : 'description',
        width : 180,
        sortable : true,
        align: 'left',
        formatter:formatDescription
    },
    /*{
        display: 'Min Stock Quantity',
        name : 'minStockQuantity',
        sortCol : 'minStockQuantity',
        width : 80,
        sortable : true,
        align: 'left'
    },*/
    {
        display: 'Top Products',
        name : 'top30',
        sortCol : 'top30',
        width : 80,
        sortable : true,
        align: 'left'
    },
     {
        display: 'Reviews',
        name : '',
        sortCol : '',
        width : 50,
        sortable : true,
        align: 'center',
        formatter:formatReviews
    },
    {
        display: 'Edit',
        name : '',
        sortCol : '',
        width : 50,
        sortable : true,
        align: 'center',
        formatter:formatEdit
    }
    ];
    var params="";
    var url=tableUrl+'?language='+language;
    if($("#name").val()!=""){
        params+="&name="+$("#name").val();
    }
    if($("#category").val()!=""){
        params+="&category="+$("#category").val();
    }
    if($("#group").val()!=""){
        params+="&group="+$("#group").val();
    }
    if($("#pricefrom").val()!=""){
        params+="&pricefrom="+$("#pricefrom").val();
    }
    if($("#priceto").val()!=""){
        params+="&priceto="+$("#priceto").val();
    }
    if($("#soldfrom").val()!=""){
        params+="&soldfrom="+$("#soldfrom").val();
    }
    if($("#soldto").val()!=""){
        params+="&soldto="+$("#soldto").val();
    }
    if($("#status").val() != ""){
        params+="&status="+$("#status").val();
    }
    if($("#ratingfrom").val() != ""){
        params+="&ratingfrom="+$("#ratingfrom").val();
    }
    if($("#ratingto").val() != ""){
        params+="&ratingto="+$("#ratingto").val();
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

