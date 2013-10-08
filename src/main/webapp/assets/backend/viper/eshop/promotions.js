/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(function(){
    initCategriesTable();
    resetForm=function(){
        validator.resetForm();
        $("#PromotionForm")[0].reset();
        $("#MainImageVar").val('');
        $("#mainImagePrev").children('li').remove();
        $("#type").removeAttr("disabled");
        $(".chzn-select").val('').trigger("liszt:updated");
    }
    cancelForm = function(){
        $("#table-wrapper").show();
        $("#add").show();
        $("#PromotionForm")[0].reset();
        $("#PromotionForm").attr('action','addpromotion.htm');
        $("#PromotionForm").find('input[name$="submit"]').val('Create Category');
        $("#FormDiv").hide();
        $('#MainImageVar').val('');
        $('#mainImage').attr('src','').hide();
        validator.resetForm();
    }
    $("#cancel").click(function(){
        cancelForm();
    });
    $("#add").click(function(){
        window.location.href = '/back-end/eshop/promotions/add.htm';
    //        $("#table-wrapper").hide();
    //        $("#add").hide();
    //        $("#FormDiv").show();
    //        resetForm();
    //        $("#PromotionForm").attr('action','addpromotion.htm');
    //        $("#PromotionForm").find('input[name$="submit"]').val('Add Promotions'); 
    //        $("html, body").animate({
    //            scrollTop:$(".content-box").offset().top
    //        }, 1000)
    });
    $("#type").change(function(){
        var type= $(this).val();
        if(type == "DISCOUNT"){
            $("#precentLI").show();
        }else{
            $("#precentLI").hide();
        }
    })
    $("#PromotionForm").submit(function(){
        var endDate = new Date($('#enddatepicker').val());
        var startDate = new Date($('#startdatepicker').val());
        if((endDate.getTime() < startDate.getTime()) && startDate != null){
            jalert("End date must be  greater than "+$('#startdatepicker').val());
            $('#enddatepicker').css("background-color","#F99").val(' ').change(function(){
                $(this).css("background-color","#FFFFFF");
            });
        }
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
    })
})
addCheckBox = function(dataCell, object) {
    dataCell.innerHTML = '<input type="checkbox" name="promotionId" id="promotionId" value="'+object.id+'">';
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
        $.ajax({
            url:'activatepromotion.htm',
            data:{
                promotionId:object.id
            },
            success:function(){
                refreshTableData();
            }
        })
    });
}
formatParent = function(dataCell, object){
    if(object.parent){
        dataCell.innerHTML = object.parent.name
    }else{
        dataCell.innerHTML = "---"
    }
}
formatEdit = function(dataCell, object){
    dataCell.innerHTML = "<a href='"+object.id+".htm'>edit</a>";
//    $(dataCell).css('cursor','pointer').click(function(){
        
//        $("#table-wrapper").hide();
//        $("#add").hide();
//        $("#FormDiv").show();
//        resetForm();
//        console.log(object);
//        $("#PromotionForm").attr('action','updatepromotion.htm');
//        $("#type").attr("disabled", true);
//        $("#PromotionForm").find('input[name$="promotionId"]').val(object.id);
//        $("#PromotionForm").find('select[name$="type"]').val(object.type);
//        $("#PromotionForm").find('select[name$="type"]').trigger("liszt:updated");
//        $("#PromotionForm").find('input[name$="name"]').val(object.name);
//        var dt = new Date(object.startDate);
//        $("#PromotionForm").find('input[name$="startdate"]').val(dateFormat(dt, "mm/dd/yyyy"));
//        var dt = new Date(object.endDate);
//        $("#PromotionForm").find('input[name$="enddate"]').val(dateFormat(dt, "mm/dd/yyyy"));
//        
//        for(var i=0;i<object.products.length;i++){
//            $("#PromotionForm").find('select[name$="product"]').find('option[value="'+object.products[i].id+'"][cat="'+object.products[i].category.id+'"]').attr("selected", "selected");
//            $("#PromotionForm").find('select[name$="product"]').trigger("liszt:updated");
//        }
//        
//        //        $("#PromotionForm").find('select[name$="category"] option[value$='+object.productCategory.id+']').attr("selected","selected");
//        //        $("#PromotionForm").find('select[name$="category"]').trigger("liszt:updated")
//        //.attr('selected', true);
//        
//        
//        
//        
//        if(object.type == "DISCOUNT"){
//            $("#precentLI").show();
//            $("#percent").val(object.ratio);
//        }else{
//            $("#precentLI").hide();
//        }
//        
//        
//        $("#PromotionForm").find('input[name$="submit"]').val('Update Promotions');
//        if(object.image){
//            $("#PromotionForm").find('#MainImageVar').val(object.image.id);
//            var imgOb = consturctImage(object.image);
//            $("#mainImagePrev").append(imgOb);
//            $(imgOb).css('margin-left','3px');
//            $(imgOb).css('margin-top','3px');
//            $(imgOb).children('img').attr('width','130px');
//            $(imgOb).children('img').attr('height','130px');
//        }
//        $("html, body").animate({
//            scrollTop:$(".content-box").offset().top
//        }, 1000)
//    });

}
formatDiscount = function(dataCell, object){
    if(object.type == 'DISCOUNT' || object.type == 'STHOLDER' || object.type == 'CSTHOLDER' || object.type == 'MEMBERSHIP'){
        dataCell.innerHTML = object.ratio+"%";
    }else{
        dataCell.innerHTML = "";
    }
}
formatProducts = function(dataCell, object){
    if(object.products != null && object.products.length > 0){
        var product = object.products[0].name;
        if(object.products.length > 1)
            product += " ...";
        dataCell.innerHTML = product;
    } else {
        dataCell.innerHTML = "";
    }
}

deletePromotion = function(){
    var data = $('input[name="promotionId"]:checkbox:checked').serializeArray();
    if(data != null && data != ''){
        jconfirm("Are you sure, you want to delete selected promotions ?",function(){
            $.ajax({
                type: "POST",
                url: '/back-end/eshop/promotions/deletePromotions.htm',
                data: data,
                complete: function(){
                    $("#table").flexReload();
                }
            });
        },function(){},"Yes","No");
    }
}

function initCategriesTable(){
    var cols=[
    {
        display: '<input type=\'checkbox\' onclick="checkAll(this,\'table\');" />',
        name : 'id',
        sortCol : 'id',
        width : 30,
        align: 'center',
        formatter: addCheckBox
    },
    {
        display: 'Name',
        name : 'name',
        sortCol : 'name',
        width : 150,
        sortable : true,
        align: 'left'
    },
    {
        display: 'Status',
        name : 'active',
        sortCol : 'active',
        width : 50,
        sortable : true,
        align: 'left',
        formatter:changeStatusLink
    },
    {
        display: 'Type',
        name : 'type',
        sortCol : 'type',
        width : 50,
        sortable : true,
        align: 'center'//,
    //        formatter:changeStatusLink
    },
    {
        display: 'Discount',
        name : 'ratio',
        sortCol : 'ratio',
        width : 50,
        sortable : true,
        align: 'center',
        formatter:formatDiscount
    },
    {
        display: 'Edit',
        name : '',
        sortCol : '',
        width : 50,
        sortable : true,
        align: 'left',
        formatter:formatEdit
    },
    {
        display: 'Products',
        name : '',
        sortCol : '',
        width : 50,
        sortable : true,
        align: 'center',
        formatter:formatProducts
    }
    ];
    var url='/back-end/eshop/promotions/promotionsTable.htm';
    var tableId='table';
    drawTable(tableId, url, cols)
}
function drawTable(tableId,urlTofetch,colDefinetion){
    
    
    $("#"+tableId).flexigrid({
        url: urlTofetch,
        dataType: 'json',
        colModel : colDefinetion ,
        /*buttons : [
        {
            name: 'ban/activate',
            bclass: 'delete',
            onpress : ban
        },
        {
            separator: true
        }
        ],*/
        /*searchitems : [

        ],
         */
        sortname: "id",
        sortorder: "asc",
        usepager: true,
        title: 'Promotions',
        useRp: true,
        rp: 15,
        showTableToggleBtn: true,
        width: '100%',
        height: 200
    }
    );

}

