formatEdit= function(dataCell,object){
    dataCell.innerHTML =  "<a href=\"/back-end/support/ticket/history.htm?ticketId="+object.id+"\">Edit</a>";
    if(object.description)
        $(dataCell).css('cursor','pointer').click(function(){
            jalert(object.description);
        });  
}
formatDate= function(dataCell,object){
    if(object.ticketDate != null)
    {
        var dt = new Date(object.ticketDate);
        dataCell.innerHTML = dt.toGMTString();
       
    }else if(object.replyDate!= null){
        var dt = new Date(object.replyDate);
        dataCell.innerHTML = dt.toGMTString();
    }else{
        dataCell.innerHTML = '';
    }
}
formatTicketStatus= function(dataCell,object){
    var stringlast=object.lastEditBy;
    if(stringlast.indexOf('USER')!=-1)
        stringlast= 'New';
    else
        stringlast= 'Old';
    dataCell.innerHTML = stringlast;
}
formatAdminNote= function(dataCell,object){
    var string="No";
    if(object.setAsAdminNote==1)
        string= 'Yes';
    dataCell.innerHTML = string;
}
//formatUserName= function(dataCell,object){
//    stringName='';
//    if(object.user!=null)
//        stringName= object.user.name;
//    else
//        stringName= object.name;
//    dataCell.innerHTML = stringName;
//}
formatUserEmail= function(dataCell,object){
    stringEmail='';
    if(object.user!=null)
        stringEmail= object.user.email;
    else
        stringEmail= object.email;
    dataCell.innerHTML = stringEmail;
     
}

formatCustomerNumber = function(dataCell, object){
    if(object.user != null){
        dataCell.innerHTML = object.user.customerNumber;
    } else {
        dataCell.innerHTML = "------";
    }
}

function initComplainsTable(){
    var cols=[
    {
        display: 'Customer Number',
        name : 'customerNumber',
        sortCol : 'customerNumber',
        width : 100,
        sortable : true,
        align: 'left',
        formatter:formatCustomerNumber
    },
    {
        display: 'Subject',
        name : 'ticketSubject',
        sortCol : 'ticketSubject',
        width : 100,
        sortable : true,
        align: 'left'
    },
    {
        display: 'Code',
        name : 'ticketCode',
        sortCol : 'ticketCode',
        width : 100,
        sortable : true,
        align: 'center'
    },
    {
        display: 'Date',
        name : 'ticketDate',
        sortCol : 'ticketDate',
        width : 200,
        sortable : true,
        align: 'center',
        formatter:formatDate
    },
    {
        display: 'Ticket Satus',
        name : 'lastEditBy',
        sortCol : 'lastEditBy',
        width : 100,
        sortable : true,
        align: 'center',
        formatter:formatTicketStatus
    },
    {
        display: 'Number of Threads',
        name : 'replyCounter',
        sortCol : 'replyCounter',
        width : 100,
        sortable : true,
        align: 'center'
    },
    {
        display: 'Inquired By',
        name : 'name',
        sortCol : 'name',
        width : 100,
        sortable : true,
        align: 'center'
//        formatter:formatUserName
    },
    {
        display: 'User E-mail',
        name : 'email',
        sortCol : 'email',
        width : 120,
        sortable : true,
        align: 'center',
        formatter:formatUserEmail
    },
    {
        display: 'History',
        name : 'id',
        sortCol : 'id',
        width : 100,
        sortable : true,
        align: 'center',
        formatter:formatEdit
    }
    ];
    var url='/back-end/support/table.htm?search='; 
    var tableId='table';
    drawTable(tableId, url, cols,'Complains')
}
function initRepliesTable(){
    var cols=[
    {
        display: 'Reply By',
        name : 'replyBy',
        sortCol : 'replyBy',
        width : 75,
        sortable : true,
        align: 'center'
    },
    {
        display: 'Replier Email',
        name : 'user.email',
        sortCol : 'user.email',
        width : 150,
        sortable : true,
        align: 'center',
        formatter:formatUserEmail
    },
    {
        display: 'Date',
        name : 'replyDate',
        sortCol : 'replyDate',
        width : 170,
        sortable : true,
        align: 'center',
        formatter:formatDate
    },    
    {
        display: 'Reply Message',
        name : 'replyMessage',
        sortCol : 'replyMessage',
        width : 590,
        sortable : true,
        align: 'center'
    },
    {
        display: 'Admin Note',
        name : 'setAsAdminNote',
        sortCol : 'setAsAdminNote',
        width : 100,
        sortable : true,
        align: 'center',
        formatter:formatAdminNote
    }
    ];
    var url='/back-end/support/ticket/historytable.htm?search=&ticketId='+$('#ticketId').val(); 
    var tableId='table';
    drawTable(tableId, url, cols,'Replies')
}
function drawTable(tableId,urlTofetch,colDefinetion,tableTitle){


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
        sortorder: "desc",
        usepager: true,
        title: tableTitle,
        useRp: true,
        rp: 15,
        showTableToggleBtn: true,
        width: '100%',
        height: 300
    }
    );

}
function searchTable(e,url,ticketId){
    if(e != undefined)
    {
        var keynum
        var keychar
        var numcheck

        if(window.event) // IE
        {
            keynum = e.keyCode
        }
        else if(e.which) // Netscape/Firefox/Opera
        {
            keynum = e.which
        }
        keychar = String.fromCharCode(keynum)
        //numcheck = /\d/
        //return !numcheck.test(keychar)
        if(keynum == 13)
        {
            $("#table").flexOptions({
                url: url+'?search='+$('#searchKey').val()+(ticketId!=null?'&ticketId='+ticketId:'')
            });
            $("#table").flexReload(); 
        }
    }else
    {
        $("#table").flexOptions({
            url: url+'?search='+$('#searchKey').val()+(ticketId!=null?'&ticketId='+ticketId:'')
        });
        $("#table").flexReload(); 
    }
}
