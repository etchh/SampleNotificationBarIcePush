/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var language=1;
var tableHtml='<div id="table-wrapper"><table id="#table#" class="flexme1"></table></div>';
function groupsHomeJs(){
    initTable();
    $("#searchForm").submit(function(){
        $("#table-wrapper").html(tableHtml.replace("#table#", "table-"+language));
        initTable();
        return false;
    })
    runTabs();
    resetForm=function(){
        validator.resetForm();
        $("#Form")[0].reset();
        $("#MainImageVar").val('');
        $("#mainImagePrev").children('li').remove();
    }
    cancelForm = function(){
        $("#tabs").show();
        $("#add").show();
        $("#Form")[0].reset();
        $("#Form").attr('action','creategroup.htm');
        $("#Form").find('input[name$="submit"]').val('Create Group');
        $("#FormDiv").hide();
        $('#MainImageVar').val('');
        $('#mainImage').attr('src','').hide();
        validator.resetForm();
    }
    $("#cancel").click(function(){
        cancelForm();
    });
    $("#add").click(function(){
        $("#tabs").hide();
        $("#add").hide();
        $("#FormDiv").show();
        resetForm();
        $("#Form").attr('action','creategroup.htm');
        $("#Form").find('input[name$="submit"]').val('Create Group'); 
        $("html, body").animate({
            scrollTop:$(".content-box").offset().top
        }, 1000)
    });
    $("#Form").submit(function(){
        /*if($("#MainImageVar").val() == "" || $("#MainImageVar").val() == null){
            $("#mainImagePrev").addClass('error');
            $('.errorImg').show();
            return false;
        }*/
        if(!$(this).valid()){
            return false;
        }
        submitMe(this,null,function(jqXHR, textStatus){
            if(jqXHR && (jqXHR.status == 200 || jqXHR.status == 0)){
                cancelForm();
                refreshTableData();
                jHide();
            }else if(jqXHR && jqXHR.status == 409){
                jalert("Group name must be unique!!");
                $("#Form").find('input[name$="name"]').focus();
            }else{
                jalert("Something went wrong , check your application and try again. ");
            }
        });
        return false;
    })
}
function updateGroupJs(){
    $("#Form").submit(function(){
        /*if($("#MainImageVar").val() == "" || $("#MainImageVar").val() == null){
            $("#mainImagePrev").addClass('error');
            $('.errorImg').show();
            return false;
        }*/
        if(!$(this).valid()){
            return false;
        }
        submitMe(this,null,function(jqXHR, textStatus){
            if(jqXHR && (jqXHR.status == 200 || jqXHR.status == 0)){
                window.location.href='/back-end/eshop/groups/home.htm';
            }else if(jqXHR && jqXHR.status == 409){
                jalert("Group name must be unique!!");
                $("#Form").find('input[name$="name"]').focus();
            }else{
                jalert("Something went wrong , check your application and try again. ");
            }
        });
        return false;
    })
    $("#cancel").click(function(){
        window.location.href='/back-end/eshop/groups/home.htm';
    });
    $("#FormTranslation").submit(function(){
        if(!$(this).valid()){
            return false;
        }
        submitMe(this,null,function(jqXHR, textStatus){
            if(jqXHR && jqXHR.status == 200){
                window.location.href=jqXHR.responseText+'.htm';
            }else if(jqXHR && jqXHR.status == 409){
                jalert("Group name must be unique!!");
                $("#Form").find('input[name$="name"]').focus();
            }else{
                jalert("Something went wrong , check your application and try again. ");
            }
        });
        return false;
    })
    $("#translation").click(function(){
        $("#FormDiv").hide();
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
        $('#language').find('option').removeAttr("selected");
        $('#language option[value='+language+']').attr('selected','selected'); 
        initTable();
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
}
addCheckBox = function(dataCell, object) {
    dataCell.innerHTML = '<input type="checkbox" name="categoryId" id="categoryId" value="'+object.id+'">';
}
changeStatusLink = function(dataCell, object) {
    if(object.active){
        dataCell.innerHTML = 'active!';
    }else{
        dataCell.innerHTML = 'in-active';
    }
    $(dataCell).css('cursor','pointer')
    $(dataCell).click(function(){
        /*if(object.parent && !object.parent.active){
            jalert('please activate parent first!');
            return;
        }*/
        $.ajax({
            url:'changegroupstatus.htm',
            data:{
                groupId:object.id
            },
            success:function(){
                refreshTableData();
            }
        })
    });
}
formatPreOrder = function(dataCell, object) {
    if(object.allowPreOrder){
        dataCell.innerHTML = 'active!';
    }else{
        dataCell.innerHTML = 'in-active';
    }
    $(dataCell).css('cursor','pointer')
    $(dataCell).click(function(){
        $.ajax({
            url:'changeCategoryPreOrderStatus.htm',
            data:{
                categoryid:object.id
            },
            success:function(){
                refreshTableData();
            }
        })
    });
}
formatDescription= function(dataCell,object){
    if(object.description!=null){
        dataCell.innerHTML = object.description.substr(0, 20);
        if(object.description)
            $(dataCell).css('cursor','pointer').click(function(){
                jalert(object.description);
            }); 
    }else{
        dataCell.innerHTML = "";
    }
     
}
formatParent = function(dataCell, object){
    if(object.parent){
        dataCell.innerHTML = object.parent.name
    }else{
        dataCell.innerHTML = "---"
    }
}
formatShowProducts=function(dataCell,object){
    dataCell.innerHTML = "show Products";
    $(dataCell).css('cursor','pointer').click(function(){
        window.location.href="/back-end/eshop/products/category/"+object.id+".htm"
    })
}
formatEdit = function(dataCell, object){
    dataCell.innerHTML = "<a href='"+object.id+".htm'>edit</a>";   
}
function initTable(){
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
        display: 'Display Name',
        name : 'displayName',
        sortCol : 'displayName',
        width : 150,
        sortable : true,
        align: 'left'
    },
    {
        display: 'Status',
        name : 'active',
        sortCol : 'active',
        width : 80,
        sortable : true,
        align: 'left',
        formatter:changeStatusLink
    },
    {
        display: 'Parent',
        name : 'parent',
        sortCol : 'parent',
        width : 110,
        sortable : true,
        align: 'left',
        formatter:formatParent
    },
    {
        display: 'Description',
        name : 'description',
        sortCol : 'description',
        width : 120,
        sortable : true,
        align: 'left',
        formatter:formatDescription
    },
    /*{
        display: 'Pre-Order',
        name : 'allowPreOrder',
        sortCol : 'allowPreOrder',
        width : 50,
        sortable : true,
        align: 'left',
        formatter:formatPreOrder
    },{
        display: 'Min Stock Quantity',
        name : 'minStockQuantity',
        sortCol : 'minStockQuantity',
        width : 50,
        sortable : true,
        align: 'left'
    },*/
    {
        display: 'Edit',
        name : '',
        sortCol : '',
        width : 50,
        sortable : true,
        align: 'left',
        formatter:formatEdit
    }
    /*,
    {
        display: 'Products',
        name : '',
        sortCol : '',
        width : 70,
        sortable : true,
        align: 'center',
        formatter:formatShowProducts
    }*/
    ];
    var params="";
    var url='/back-end/eshop/groups/groupstable.htm?language='+language;
    if($("#name").val()!=""){
        params+="&name="+$("#name").val();
    }
    if($("#status").val()!=""){
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
        /*buttons : [
        {
            name: 'ban/activate',
            bclass: 'delete',
            onpress : ban
        },
        {
            separator: true
        }
        ],
       searchitems : [
        {
            display: 'Name',
            name : 'name',
            isdefault: true
        }
        ],*/
        sortname: "id",
        sortorder: "asc",
        usepager: true,
        title: 'Categories',
        useRp: true,
        rp: 15,
        showTableToggleBtn: true,
        width: '100%',
        height: 200
    }
    );

}

