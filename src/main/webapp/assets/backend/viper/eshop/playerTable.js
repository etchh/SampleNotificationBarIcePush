/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(function(){
    initPlayersTable();
    cancelForm = function(){
        $("#table-wrapper").show();
        $("#add").show();
        $("#PlayerForm")[0].reset();
        $("#PlayerForm").attr('action','addPlayer.htm');
        $("#PlayerForm").find('input[name$="save"]').val('Add Player');
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
        $("#PlayerForm")[0].reset();
        $("#PlayerForm").attr('action','addPlayer.htm');
        $("#PlayerForm").find('input[name$="save"]').val('Add Player');
        
        $("html, body").animate({
            scrollTop:$(".content-box").offset().top
        }, 1000)
    });
    $("#PlayerForm").submit(function(){
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
    dataCell.innerHTML = '<input type="checkbox" name="playerId" id="playerId" value="'+object.id+'">';
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
            url:'changePlayerStatus.htm',
            data:{
                playerId:object.id
            },
            success:function(){
                refreshTableData();
            }
        })
    });
}
formatEdit = function(dataCell, object){
    dataCell.innerHTML = "edit";
    $(dataCell).css('cursor','pointer').click(function(){
        $("#table-wrapper").hide();
        $("#add").hide();
        $("#FormDiv").show();
        validator.resetForm();
        console.log(object);
        $("#PlayerForm").attr('action','updatePlayer.htm').find('input[name$="name"]').val(object.name);
        $("#PlayerForm").attr('action','updatePlayer.htm').find('input[name$="number"]').val(object.number);
        $("#PlayerForm").find('input[name$="id"]').val(object.id);
        
        
        $("#PlayerForm").find('input[name$="submit"]').val('Update Player');
        var element=document.getElementById("addpic");
        element.setAttribute("style", "display:none");
        $("html, body").animate({
            scrollTop:$(".content-box").offset().top
        }, 1000)
    });
}
function initPlayersTable(){
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
    }
    ,{
        display: 'number',
        name : 'number',
        sortCol : 'number',
        width : 50,
        sortable : true,
        align: 'left'/*,
        formatter:formatDescription*/
    },
    {
        display: 'Status',
        name : 'active',
        sortCol : 'active',
        width : 50,
        sortable : true,
        align: 'left',
        formatter:changeStatusLink
    } 
    ,{
        display: 'Edit',
        name : '',
        sortCol : '',
        width : 50,
        sortable : true,
        align: 'left',
        formatter:formatEdit
    }
    ];
    var url='/back-end/eshop/player/playerTable.htm';
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
        title: 'Players',
        useRp: true,
        rp: 15,
        showTableToggleBtn: true,
        width: '100%',
        height: 200
    }
    );

}


