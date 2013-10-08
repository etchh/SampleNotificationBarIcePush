/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(function(){
    initCategriesTable();
    cancelForm = function(){
        $("#table-wrapper").show();
        $("#add").show();
        $("#TaxForm")[0].reset();
        $("#TaxForm").attr('action','addtax.htm');
        $("#TaxForm").find('input[name$="submit"]').val('Add Tax Class');
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
        validator.resetForm();
        $("#TaxForm")[0].reset();
        $("#TaxForm").attr('action','addtax.htm');
        $("#TaxForm").find('input[name$="submit"]').val('Add Tax Class');
        $("html, body").animate({
            scrollTop:$(".content-box").offset().top
        }, 1000)
    });
    $("#TaxForm").submit(function(){
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
        if(object.parent && !object.parent.active){
            jalert('please activate parent first!');
            return;
        }
        $.ajax({
            url:'changeTaxStatus.htm',
            data:{
                taxId:object.id
            },
            success:function(){
                refreshTableData();
            }
        })
    });
}
formatDescription= function(dataCell,object){
    dataCell.innerHTML = object.description.substr(0, 20);
    if(object.description)
        $(dataCell).css('cursor','pointer').click(function(){
            jalert(object.description);
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
    dataCell.innerHTML = "edit";
    $(dataCell).css('cursor','pointer').click(function(){
        $("#table-wrapper").hide();
        $("#add").hide();
        $("#FormDiv").show();
        validator.resetForm();
        $("#TaxForm").attr('action','updatetax.htm').find('input[name$="name"]').val(object.name);
        $("#TaxForm").find('input[name$="id"]').val(object.id);
        $("#TaxForm").find('input[name$="title"]').val(object.title);
        $("#TaxForm").find('input[name$="rate"]').val(object.rate);
        $("#TaxForm").find('textarea[name$="description"]').val(object.description);
        $("#TaxForm").find('input[name$="submit"]').val('Update Tax Class');
        $("html, body").animate({
            scrollTop:$(".content-box").offset().top
        }, 1000)
    });
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
        name : 'title',
        sortCol : 'title',
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
        display: 'Description',
        name : 'description',
        sortCol : 'description',
        width : 120,
        sortable : true,
        align: 'left',
        formatter:formatDescription
    },{
        display: 'Edit',
        name : '',
        sortCol : '',
        width : 50,
        sortable : true,
        align: 'left',
        formatter:formatEdit
    }
    ];
    var url='/back-end/tax/taxTable.htm';
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
        title: 'Tax Classes',
        useRp: true,
        rp: 15,
        showTableToggleBtn: true,
        width: '100%',
        height: 200
    }
    );

}

