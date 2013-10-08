/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(function(){
    drawMaliTemplateTable();
    resetForm=function(){
        //        validator.resetForm();
        $("#template_form")[0].reset();
    }
    cancelForm = function(){
        $("#table-wrapper").show();
        $("#add").show();
        $("#template_form")[0].reset();
        $("#template_form").attr('action','createTemplate.htm');
        $("#template_form").find('input[name$="submit"]').val('Add Template');
        $("#FormDiv").hide();
    //        validator.resetForm();
    }
    $("#cancel").click(function(){
        cancelForm();
    });
    $("#add").click(function(){
        $("#table-wrapper").hide();
        $("#add").hide();
        $("#FormDiv").show();
        resetForm();
        $("#template_form").attr('action','createTemplate.htm');
        $("#template_form").find('input[name$="submit"]').val('Add Template'); 
    })
    $('textarea').ckeditor();
    $("#template_form").validate();
    
    $("#template_form").submit(function(){
        if(!$(this).valid()){
            return false;
        }
        submitMe(this,null,function(jqXHR, textStatus){
            if(jqXHR && jqXHR.status == 200){
                jHide();
                cancelForm();
                refreshTableData();
            }else{
                jalert("Something went wrong , check your application and try again. ");
            }
        });
        return false;
    })
})

function drawMaliTemplateTable(){

    addCheckBox = function(dataCell, object) {
        dataCell.innerHTML = '<input type="checkbox" name="id" id="id" value="'+object.id+'">';
    }

    changeStatusLink = function(dataCell, object) {
        if(object.status == 1){
            dataCell.innerHTML = 'active!';
        }else{
            dataCell.innerHTML = 'in-active';
        }
        $(dataCell).css('cursor','pointer');
        $(dataCell).click(function(){
            $.ajax({
                url:"/back-end/mail-templates/changeStatus.htm",
                data:{
                    id:object.id
                },
                success:function(){
                    refreshTableData();
                }
            })
        })
    }
    deleteObject = function(dataCell, object) {
        dataCell.innerHTML = 'delete!';
        $(dataCell).css('cursor','pointer');
        $(dataCell).click(function(){
            jconfirm("Are you sure?",function(){
                $.ajax({
                    url:"/back-end/mail-templates/deletetemplate.htm",
                    data:{
                        id:object.id
                    },
                    success:function(){
                        refreshTableData();
                    }
                })
            })
    
        })
    }

    editObject = function(dataCell, object) {
        dataCell.innerHTML = "edit";
        $(dataCell).css('cursor','pointer').click(function(){
            $("#table-wrapper").hide();
            $("#add").hide();
            $("#FormDiv").show();
            resetForm();
            $("#template_form").attr('action','updatetemplate.htm').find('input[name$="name"]').val(object.name);
            $("#template_form").find('input[name$="id"]').val(object.id);
            $("#template_form").find('select[name$="type"]').val(object.mailTemplateType.id);
            $("#template_form").find('textarea[name$="contentBody"]').val(object.body);
            $("#template_form").find('input[name$="submit"]').val('Update Template');
        });
    }
    
    SetMainContentObject = function(dataCell, object) {
        if(object.isMain)
            dataCell.innerHTML = 'Main';
        else
            dataCell.innerHTML = '<a href="#" onclick="goToURL(\'/cms/backend/content/setMainContent.htm\', \'id='+object.id+'\', \'POST\',refreshTableData , null);">No (Set)</a>';
    }

    var contentsModel=[
    {
        display: '<input type=\'checkbox\' onclick="checkAll(this,\'contentsTable\');" />',
        name : 'id',
        sortCol : 'id',
        width : 60,
        sortable : true,
        align: 'center',
        formatter: addCheckBox
    },

    {
        display: 'Name',
        name : 'name',
        sortCol : 'name',
        width : 200,
        sortable : true,
        align: 'left'
    }
    ,
    {
        display: 'Status(Click to change)',
        name : 'status',
        sortCol : 'status',
        width : 125,
        sortable : true,
        align: 'left',
        formatter: changeStatusLink
    }
    //    ,
    //    {
    //        display: 'Type',
    //        name : 'templateType',
    //        sortCol : 'templateType',
    //        width : 125,
    //        sortable : true,
    //        align: 'left'
    //    }
    ,
    {
        display: 'Edit',
        name : 'id',
        sortCol : 'id',
        width : 100,
        align: 'left',
        formatter: editObject
    }
    ,
    {
        display: 'Delete',
        name : 'id',
        sortCol : 'id',
        width : 100,
        align: 'left',
        formatter: deleteObject
    }
    ];
    $("#templatesTable").flexigrid
    (
    {
        url: '/back-end/mail-templates/table.htm',
        dataType: 'json',
        colModel : contentsModel,
        searchitems : [
        {
            display: 'Name',
            name : 'name',
            isdefault: true
        },
        {
            display: 'Status',
            name : 'status'
        }
        ],
        sortname: "id",
        sortorder: "DESC",
        usepager: true,
        title: 'Templates',
        useRp: true,
        rp: 10,
        showTableToggleBtn: true,
        width: 745,
        height: 200
    }
    );
  
}