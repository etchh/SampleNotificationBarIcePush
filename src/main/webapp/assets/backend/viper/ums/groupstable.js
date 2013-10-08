/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
addCheckBox = function(dataCell, object) {
//    console.log(object)
    dataCell.innerHTML = '<input type="checkbox" name="userId" id="userId" value="'+object.id+'">';
}
changeStatusLink = function(dataCell, object) {
    if(object.active){
        dataCell.innerHTML = 'active';
    }else{
        dataCell.innerHTML = 'in-active';
    }
    $(dataCell).css('cursor','pointer').click(function(){
        $.ajax({
            url:'updateGroupStatus.htm',
            data:{
                groupid:object.id
            },
            success:function(){
                if($(dataCell).children().html() == 'active'){
                    $(dataCell).children().html('in-active');
                }else{
                    $(dataCell).children().html('active');
                }
            }
        })
    })
}
function initGroupsTable(){
    var cols=[
    {
        display: '<input type=\'checkbox\' onclick="checkAll(this,\'groupsTable\');" />',
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
        width : 150,
        sortable : true,
        align: 'left'
    },
    {
        display: 'Status',
        name : 'active',
        sortCol : 'active',
        width : 100,
        sortable : true,
        align: 'center',
        formatter:changeStatusLink
    }
    ];
    var url='/back-end/ums/groups/groupsTable.htm';
    var tableId='groupsTable';
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
            display: 'Name',
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
        width: 750,
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

