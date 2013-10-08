/* 
 *this file contains pages java script required functions that handel the actions for pages in the client side
 */
var language=1;
var tableHtml='<div id="table-wrapper"><table id="#table#" class="flexme1"></table></div>';
$(function(){
    initTable();
    runTabs();
    resetForm=function(){
        validator.resetForm();
        $("#Form")[0].reset();
    }
    cancelForm = function(){
        $("#tabs").show();
        $("#add").show();
        $("#Form")[0].reset();
        $("#Form").attr('action','createPage.htm');
        $("#Form").find('input[name$="submit"]').val('Create Page');
        $("#FormDiv").hide();
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
        $("#Form").attr('action','createPage.htm');
        $("#Form").find('input[name$="submit"]').val('Create Page'); 
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
    })
})
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
// used to formate the first column in the table
addCheckBox = function(dataCell, object) {
    dataCell.innerHTML = '<input type="checkbox" name="categoryId" id="categoryId" value="'+object.id+'">';
}
// used to change status for page in pages table
changeStatusLink = function(dataCell, object) {
    if(object.status){
        dataCell.innerHTML = 'active!';
    }else{
        dataCell.innerHTML = 'in-active';
    }
    $(dataCell).css('cursor','pointer')
    $(dataCell).click(function(){
        $.ajax({
            url:'changePageStatus.htm',
            data:{
                pageId:object.id
            },
            success:function(){
                refreshTableData();
            }
        })
    });
}
//used to formate edit link in pages table
formatEdit = function(dataCell, object){
    dataCell.innerHTML = "edit";
    $(dataCell).css('cursor','pointer').click(function(){
        window.location.href=object.id+".htm";
    });
}
formatTemplate = function(dataCell, object){
    dataCell.innerHTML = object.template.name;
}
//deletePages function used in pages table  to delete pages
deletePages = function(){
    var checked=getChecked($("#table")[0]);
    if(checked && checked.length >0)
        for(var i =0;i<checked.length;i++){
            $.ajax({
                url:'deletePage.htm',
                data:{
                    pageId:checked[i]
                },
                success:function(){
                    refreshTableData();
                }
            });
        }
}
//initTable function used to init table for the pages table in backend
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
        display: 'Title',
        name : 'title',
        sortCol : 'title',
        width : 120,
        sortable : true,
        align: 'left'
    },
    {
        display: 'URL',
        name : 'url',
        sortCol : 'url',
        width : 200,
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
        display: 'Template',
        name : 'template',
        sortCol : 'template',
        width : 120,
        sortable : true,
        align: 'left',
        formatter:formatTemplate
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
    var url='/back-end/cms/pages/pagesTable.htm?language='+language;
    var tableId='table-'+language;
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
            onpress : deletePages
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
        title: 'Pages',
        useRp: true,
        rp: 15,
        showTableToggleBtn: true,
        width: '100%',
        height: 200
    }
    );

}

