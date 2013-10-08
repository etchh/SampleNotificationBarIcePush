/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var tableHtml='<table id="orders" class="flexme1"></table>';
$(document).ready(function(){
    initEndUserOrdersTable(); 
    $("#searchForm").submit(function(){
        $("#table-wrapper").html(tableHtml);
        initEndUserOrdersTable();
        return false;
    })
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
        url: "/back-end/reports/enduserorder/changestatus.htm",
        dataType: 'html',
        data: {
            id: id, 
            status: status
        }
    }).done(function( msg ) {
        jalert( "Data Saved: " + msg );
    });  
}
var statusArray=new Array('PENDING','FAILED','PAID','PAIDWAITINGFORSHIPPING','SHIPPED','DELIVERED','CANCELED');
formateStatus = function(dataCell, object) {
    /*dropDownList= "<select>";
    for(i=0;i<statusArray.length;i++)
        dropDownList+=("<option onclick='changeStatusAjax("+object.id+",\""+statusArray[i]+"\");'"+(statusArray[i]==object.status?" selected='true' ":"")+">")+statusArray[i]+"</option>";
    dropDownList+="</select>";
    dataCell.innerHTML =dropDownList;*/
    dataCell.innerHTML = object.status;
}
formateEdit = function(dataCell, object) {
    dataCell.innerHTML ="<a href='/back-end/reports/enduserorder/edit/"+object.id+".htm'>Edit</a>";
}
shippingAddressFormate = function(dataCell, object) {
    if(object.shippingAddress!=null&&object.shippingAddress.shippingAddress!=null&&object.shippingAddress.city!=null){
        dataCell.innerHTML =object.shippingAddress.shippingAddress+','+object.shippingAddress.city+','+object.shippingAddress.country.name;
    } else {
        dataCell.innerHTML = "Pick Up";
    }
   
}
formateInvoice = function(dataCell, object) {
    dataCell.innerHTML ="<a href='/back-end/reports/enduserorder/invoice/"+object.id+".htm' target='_blanck'>Invoice</a>";
}
addCustomerNumber = function(dataCell, object) {
    if(object.user != null ){
        dataCell.innerHTML =object.user.customerNumber;
    }else{
        dataCell.innerHTML ="-";
    }
}
addEmail = function(dataCell, object) {
    if(object.user != null ){
        dataCell.innerHTML =object.user.email;
    }else{
        dataCell.innerHTML ="-";
    }
}
formateCost  = function(dataCell, object) {
    if(object.totalCost != null ){
        dataCell.innerHTML =object.totalCost.toFixed(2);
    }else{
        dataCell.innerHTML ="-";
    }
}
function initEndUserOrdersTable(){
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
        display: 'User Number',
        name : 'user.customerNumber',
        sortCol : 'user.name',
        width : 120,
        sortable : true,
        align: 'left',
        formatter: addCustomerNumber
    },
    {
        display: 'User Email',
        name : 'user.email',
        sortCol : 'user.email',
        width : 120,
        sortable : true,
        align: 'left',
        formatter: addEmail
    },
    //    {
    //        display: 'User phone',
    //        name : 'user.phone',
    //        sortCol : 'user.phone',
    //        width : 70,
    //        sortable : true,
    //        align: 'left'
    //    },
    {
        display: 'Shipping Address',
        name : 'shippingAddress.shippingAddress',
        sortCol : 'shippingAddress.shippingAddress',
        width : 150,
        sortable : true,
        align: 'left',
        formatter:shippingAddressFormate
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
        display: 'Cost',
        name : 'totalCost',
        sortCol : 'totalCost',
        width : 100,
        sortable : true,
        align: 'center',
        formatter:formateCost
    }   
    ,
    {
        display: 'Next Day Delivery',
        name : 'nextDayDelivery',
        sortCol : 'nextDayDelivery',
        width : 100,
        sortable : true,
        align: 'center'
    } 
    ,
    {
        display: 'Invoice',
        name : 'id',
        sortCol : 'id',
        width : 50,
        sortable : true,
        align: 'center',
        formatter:formateInvoice
    }   
    ,
    {
        display: 'Edit',
        name : 'id',
        sortCol : 'id',
        width : 50,
        sortable : true,
        align: 'center',
        formatter:formateEdit
    }   
    
   
    ];
    var url='/back-end/reports/enduserorder/table.htm';
    var params="?"
    if($("#status").val()!=""){
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
    if($("#userEmail").val()!=""){
        params+=(params!="?"?"&":"")+"userEmail="+$("#userEmail").val();
    }
    if($("#deliveryOption").val()!=""){
        params+=(params!="?"?"&":"")+"deliveryOption="+$("#deliveryOption").val();
    }
    if($("#transactionId").val()!=""){
        params+=(params!="?"?"&":"")+"transactionId="+$("#transactionId").val();
    }
    if($("#nextDay").val()!=""){
        params+=(params!="?"?"&":"")+"nextDay="+$("#nextDay").val();
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
        title: 'End Users Orders',
        useRp: true,
        rp: 15,
        showTableToggleBtn: true,
        width: '100%',
        height: 350
    }
    );

}

