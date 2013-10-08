/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var table = '<table id="usersTable"></table>';
$(function(){
    //intiate the table.
    initUsersTable();
    
    resetForm=function(){
        validator.resetForm();
        $("#UserForm")[0].reset();
    }
    cancelForm = function(){
        $("#table-wrapper").show();
        $("#add").show();
        $("#UserForm")[0].reset();
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
        $("#UserForm").attr('action','adduser.htm');
        $("#UserForm").find('input[name$="submit"]').val('Add user'); 
        $("html, body").animate({
            scrollTop:$(".content-box").offset().top
        }, 1000)
    });
    $("#UserForm").submit(function(){
        if($(this).valid()){
            $("#table-wrapper").html(table);
            initUsersTable();
            return false;
        }
        return false;
    })
})
addCheckBox = function(dataCell, object) {
    dataCell.innerHTML = '<input type="checkbox" name="userId" id="userId" value="'+object.id+'">';
}
formatConfirmed = function(dataCell, object){
    dataCell.innerHTML = object.confirmed == 0?'No':'Yes';
}
changeCashStatusLink = function(dataCell, object) {
    if(object.group.name == 'ORDER_PHONE_USER'){
        dataCell.innerHTML = object.cashEnabled;
        $(dataCell).css('cursor','pointer').click(function(){
            $.ajax({
                url:'updateUserCashStatus.htm',
                data:{
                    userid:object.id
                },
                success:function(){
                    if($(dataCell).children().html() == 'true'){
                        $(dataCell).children().html('false');
                    }else{
                        $(dataCell).children().html('true');
                    }
                }
            })
        })
    } else {
        dataCell.innerHTML = '';
    }
}
showGroup = function(dataCell, object) {
    dataCell.innerHTML = object.group.name;
}
changeUserRole= function(dataCell, object) {
    dataCell.innerHTML = '<a href="/back-end/ums/users/changeUserRole.htm?userId='+object.id+'">edit</a>';
}
function initUsersTable(){
    var cols=[
    /*{
        display: '<input type=\'checkbox\' onclick="checkAll(this,\'usersTable\');" />',
        name : 'uid',
        sortCol : 'uid',
        width : 30,
        align: 'center',
        formatter: addCheckBox
    },
    {
        display: 'User Name',
        name : 'name',
        sortCol : 'name',
        width : 160,
        sortable : true,
        align: 'left'
    },*/
    {
        display: 'Email',
        name : 'email',
        sortCol : 'email',
        width : 250,
        sortable : true,
        align: 'left'
    },
    /*{
        display: 'Confirmed',
        name : 'confirmed',
        sortCol : 'confirmed',
        width : 50,
        sortable : true,
        align: 'center',
        formatter:formatConfirmed
    },
    */
    {
        display: 'Group',
        name : 'group',
        sortCol : 'group.id',
        width : 250,
        sortable : true,
        align: 'left',
        formatter:showGroup
    },
    {
        display: 'Cash Enabled',
        name : 'cashEnabled',
        sortCol : 'cashEnabled',
        width : 150,
        sortable : true,
        align: 'center',
        formatter:changeCashStatusLink
    }
    ,
    {
        display: 'edit',
        name : '',
        sortCol : '',
        width : 150,
        sortable : false,
        align: 'center',
        formatter:changeUserRole
    }
];
    var url='/back-end/ums/users/usersTable.htm';
    var param = "?"
    if($('input[name="email"]').val() != ""){
        url+=((param == "&")?"&":"?") +"email="+$('input[name="email"]').val();
        param="&";
    }
    if($('#userGroup').val() != ""){
        url+=((param == "&")?"&":"?") +"userGroup="+$('#userGroup').val();
        param="&";
    }
   
    
    var tableId='usersTable';
    drawUsersTable(tableId, url, cols)
}
function drawUsersTable(tableId,urlTofetch,colDefinetion){


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
        searchitems : [
        {
            display: 'Email',
            name : 'email'
        },

        {
            display: 'User Name',
            name : 'name',
            isdefault: true
        }
        ],
        sortname: "id",
        sortorder: "asc",
        usepager: true,
        title: 'Users',
        useRp: true,
        rp: 15,
        showTableToggleBtn: true,
        width: 1000,
        height: 300
    }
    );

    function ban(com,grid){
        var ids=""
        $('#'+tableId+' :checkbox:checked').each(function() {
            ids+="ids="+$(this).val()+"&"
        });
        if(ids.length ==0){
            return;
        }
        if (confirm('Ban ' + ((ids.split("&").length)-1) + ' user?'))
            goToURL('/ums/backend/controllers/changeStatus.htm', ids, 'POST', changeStatus, 'statusMessage');
        return;
    }

}

