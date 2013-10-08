/* 
 *this file contains content java script required functions that handel the actions for content in the client side
 */
$(function(){
    initTable();
    resetForm=function(){
        validator.resetForm();
        $("#Form")[0].reset();
        $("#PageForm")[0].reset();
    }
    cancelForm = function(){
        $("#table-wrapper").show();
        $("#add").show();
        $("#Form")[0].reset();
        $("#Form").attr('action','/back-end/cms/content/createContent.htm');
        $("#Form").find('input[name$="submit"]').val('Create Content');
        $("#Form").find('textarea').val('');
        $("#FormDiv").hide();
        validator.resetForm();
    }
    $("#cancel").click(function(){
        cancelForm();
    });
    $("#add").click(function(){
        $("#table-wrapper").hide();
        $("#add").hide();
        $("#FormDiv").show();
        resetForm();
        $("#Form").attr('action','/back-end/cms/content/createContent.htm');
        $("#Form").find('input[name$="submit"]').val('Create Content'); 
        $("html, body").animate({
            scrollTop:$(".content-box").offset().top
        }, 1000)
    });
    $("#Form").submit(function(){
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
    });
    cancelTranslationForm = function(){
        $("#container").show();
        $("#PageForm")[0].reset();
        $("#Form").attr('action','/back-end/cms/content/createContent.htm');
        $("#PageFormDiv").hide();
        validator.resetForm();
    }
    $("#cancelPage").click(function(){
        cancelTranslationForm();
    });
    $("#translation").click(function(){
        $("#container").hide();
        $("#PageFormDiv").show();
        resetForm();
        $("#Form").attr('action','/back-end/cms/pages/createTranslationPage.htm');
     });
    $("#PageForm").submit(function(){
        if(!$(this).valid()){
            return false;
        }
        submitMe(this,null,function(jqXHR, textStatus){
            if(jqXHR && jqXHR.status == 200){
              window.location.href = jqXHR.responseText+'.htm';
            }else{
                jalert("Something went wrong , check your application and try again. ");
            }
        });
        return false;
    });
    $("#editPage").submit(function(){
        if(!$(this).valid()){
            return false;
        }
        submitMe(this,null,function(jqXHR, textStatus){
            if(jqXHR && jqXHR.status == 200){
                jHide();
            }else{
                jalert("Something went wrong , check your application and try again. ");
            }
        });
        return false;
    })
})
// used to formate the first column in the table
addCheckBox = function(dataCell, object) {
    dataCell.innerHTML = '<input type="checkbox" name="categoryId" id="categoryId" value="'+object.id+'">';
}
// used to change status for content in contents table
changeStatusLink = function(dataCell, object) {
    if(object.status){
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
            url:'/back-end/cms/content/changeContentStatus.htm',
            data:{
                contentId:object.id
            },
            success:function(){
                refreshTableData();
            }
        })
    });
}
//used to formate body for content
formatBody= function(dataCell,object){
    dataCell.innerHTML = object.body.substr(0, 200);
    if(object.body)
        $(dataCell).css('cursor','pointer').click(function(){
            jalert(object.body);
        });  
}
//used to formate edit link in contents table
formatEdit = function(dataCell, object){
    dataCell.innerHTML = "edit";
    $(dataCell).css('cursor','pointer').click(function(){
        $("#table-wrapper").hide();
        $("#add").hide();
        $("#FormDiv").show();
        resetForm();
        $("#Form").attr('action','/back-end/cms/content/updateContent.htm');
        $("#Form").find('input[name$="submit"]').val('Update Content');
        $("#Form").find('input[name$="contentId"]').val(object.id);
        $("#Form").find('textarea').val(object.body);
        if(object.image){
            $("#CategoryForm").find('#MainImageVar').val(object.image.id);
            var imgOb = consturctImage(object.image);
            $("#mainImagePrev").append(imgOb);
            $(imgOb).css('margin-left','3px');
            $(imgOb).css('margin-top','3px');
            $(imgOb).children('img').attr('width','130px');
            $(imgOb).children('img').attr('height','130px');
        }
        $("html, body").animate({
            scrollTop:$(".content-box").offset().top
        }, 1000)
    });
}
//deleteContents function used in contents table  to delete contents
deleteContents = function(){
    var checked=getChecked($("#table")[0]);
    if(checked && checked.length >0)
        for(var i =0;i<checked.length;i++){
            $.ajax({
                url:'/back-end/cms/content/deleteContent.htm',
                data:{
                    contentId:checked[i]
                },
                success:function(){
                    refreshTableData();
                }
            });
        }
}
//initTable function used to init table for the contents table in backend
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
        display: 'Body',
        name : 'body',
        sortCol : 'body',
        width : 500,
        sortable : true,
        align: 'left',
        formatter:formatBody
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
        display: 'Edit',
        name : '',
        sortCol : '',
        width : 50,
        sortable : true,
        align: 'left',
        formatter:formatEdit
    }
    ];
    var url=tableDataURl;
    var tableId='table';
    drawTable(tableId, url, cols)
}
function drawTable(tableId,urlTofetch,colDefinetion){


    $("#"+tableId).flexigrid({
        url: urlTofetch,
        dataType: 'json',
        colModel : colDefinetion ,
        buttons : [
        {
            name: 'delete',
            bclass: 'delete',
            onpress : deleteContents
        },
        {
            separator: true
        }
        ],
        /*searchitems : [

        ],
        */
        sortname: "id",
        sortorder: "asc",
        usepager: true,
        title: 'Contents',
        useRp: true,
        rp: 15,
        showTableToggleBtn: true,
        width: '100%',
        height: 200
    }
    );

}

