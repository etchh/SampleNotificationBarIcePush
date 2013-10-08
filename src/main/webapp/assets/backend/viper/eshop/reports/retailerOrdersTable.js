/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var tableHtml='<table id="orders" class="flexme1"></table>';
$(document).ready(function(){
    initRetailerOrdersTable(); 
    $("#searchForm").submit(function(){
        $("#table-wrapper").html(tableHtml);
        initRetailerOrdersTable();
        return false;
    });
    $( "#datefrom" ).datepicker();
    $( "#dateto" ).datepicker();
});

addCheckBox = function(dataCell, object) {
    dataCell.innerHTML = '<input type="checkbox" name="id" id="id" value="'+object.id+'">';
}
purchasedDateFormate= function(dataCell,object){
    if(object.purchasedDate != null)
    {
        var dt = new Date(object.purchasedDate);
        dataCell.innerHTML = dateFormat(dt, "dd/mm/yyyy");
       
    }else{
        dataCell.innerHTML = '';
    }
}
function changeStatusAjax(id,status){
    $.ajax({
        type: "POST",
        url: "/back-end/reports/retailer/save/"+id+".htm",
        dataType: 'html',
        data: {
            status: status
        }
    }).done(function( msg ) {
        jalert( "Data Saved: " + msg );
    });  
}
var statusArray=new Array('PENDING','FAILED','PAID','PAIDWAITINGFORSHIPPING','SHIPPED','DELIVERED','CANCELED');

formateStatus = function(dataCell, object) {
    //    dropDownList= "<select>";
    //    for(i=0;i<statusArray.length;i++)
    //        dropDownList+=("<option onclick='changeStatusAjax("+object.id+",\""+statusArray[i]+"\");'"+(statusArray[i]==object.status?" selected='true' ":"")+">")+statusArray[i]+"</option>";
    //    dropDownList+="</select>";
    //    dataCell.innerHTML =dropDownList;
    dataCell.innerHTML = object.status;
}
deliverdTo = function(dataCell, object) {
    
    dataCell.innerHTML =object.orderType + " - "+object.orderTypeNumber;
}

formateEdit = function(dataCell, object) {
    dataCell.innerHTML ="<a href='/back-end/reports/retailer/edit/"+object.id+".htm'>Edit</a>";
}

formateInvoice = function(dataCell, object) {
    dataCell.innerHTML ="<a href='/back-end/reports/enduserorder/invoice/"+object.id+".htm' target='_blanck'>Invoice</a>";
}
formateCost  = function(dataCell, object) {
    if(object.totalCost != null ){
        dataCell.innerHTML =object.totalCost.toFixed(2);
    }else{
        dataCell.innerHTML ="-";
    }
}

function initRetailerOrdersTable(){
    var cols=[
    {
        display: '<input type=\'checkbox\' onclick="checkAll(this,\'table\');" />',
        name : 'id',
        sortCol : 'id',
        width : 30,
        align: 'center',
        formatter: addCheckBox
    }
    ,
    {
        display: 'Order Number',
        name : 'id',
        sortCol : 'id',
        width : 80,
        sortable : true,
        align: 'center'
    }
    ,
    {
        display: 'Customer Name',
        name : 'customerName',
        sortCol : 'customerName',
        width : 120,
        sortable : true,
        align: 'left'
    }
    ,
    {
        display: 'Mobile',
        name : 'mobile',
        sortCol : 'mobile',
        width : 120,
        sortable : true,
        align: 'left'
    }
    ,
    {
        display: 'Paid By',
        name : 'paymentOption',
        sortCol : 'paymentOption',
        width : 120,
        sortable : true,
        align: 'left'
    }
    ,
    {
        display: 'Deliverd to',
        name : 'paymentOption',
        width : 120,
        formatter:deliverdTo,
        align: 'left'
    }
    ,
    {
        display: 'Purchased Date',
        name : 'purchasedDateFormate',
        sortCol : 'purchasedDate',
        width : 80,
        sortable : true,
        align: 'left',
        formatter:purchasedDateFormate
    }
    ,
    {
        display: 'Status',
        name : 'status',
        sortCol : 'status',
        width : 100,
        sortable : true,
        align: 'left',
        formatter:formateStatus
    }
    ,
    {
        display: 'Payment Method',
        name : 'paymentMethod',
        sortCol : 'paymentMethod',
        width : 100,
        sortable : true,
        align: 'left'
    }
    ,
    {
        display: 'Cost',
        name : 'totalCost',
        sortCol : 'totalCost',
        width : 100,
        sortable : true,
        align: 'center',
        formatter:formateCost
    }      
    ,{
        display: 'Edit',
        name : 'id',
        sortCol : 'id',
        width : 50,
        sortable : true,
        align: 'center',
        formatter:formateEdit
    } 
    
   
    ];
    var url='/back-end/reports/retailer/table.htm';
    var params="?"
    if($("#status").val()!="Select One"){
        params+="status="+$("#status").val();
    }
    if($("#datefrom").val()!=""){
        params+=(params!="?"?"&":"")+"datefrom="+$("#datefrom").val();
    }
    if($("#dateto").val()!=""){
        params+=(params!="?"?"&":"")+"dateto="+$("#dateto").val();
    }
    if($("#orderId").val()!=""){
        params+=(params!="?"?"&":"")+"orderId="+$("#orderId").val();
    }
    if($("#userName").val()!=""){
        params+=(params!="?"?"&":"")+"userName="+$("#userName").val();
    }
    url+=params;
    var tableId='orders';
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
        sortname: "purchasedDate",
        sortorder: "desc",
        usepager: true,
        title: 'Retailer Orders',
        useRp: true,
        rp: 15,
        showTableToggleBtn: true,
        width: '100%',
        height: 350
    });

}

