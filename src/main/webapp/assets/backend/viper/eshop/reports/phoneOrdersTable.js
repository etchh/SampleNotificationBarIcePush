/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var tableHtml='<table id="orders" class="flexme1"></table>';
$(document).ready(function(){
    initPhoneOrdersTable(); 
    $("#searchForm").submit(function(){
        $("#table-wrapper").html(tableHtml);
        initPhoneOrdersTable();
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
        url: "/back-end/reports/phoneorder/changestatus.htm",
        dataType: 'html',
        data: {
            id: id, 
            status: status
        }
    }).done(function( msg ) {
        jalert( "Data Saved: " + msg );
    });  
}
var statusArray=new Array('PENDING','FAILED','PAID','PAIDWAITINGFORSHIPPING','SHIPPED','DELIVERED','CANCELED','PHONE');
formateStatus = function(dataCell, object) {
    //    dropDownList= "<select>";
    //    for(i=0;i<statusArray.length;i++)
    //        dropDownList+=("<option onclick='changeStatusAjax("+object.id+",\""+statusArray[i]+"\");'"+(statusArray[i]==object.status?" selected='true' ":"")+">")+statusArray[i]+"</option>";
    //    dropDownList+="</select>";
    //    dataCell.innerHTML =dropDownList;
    dataCell.innerHTML = object.status;
}
formateEdit = function(dataCell, object) {
    dataCell.innerHTML ="<a href='/back-end/reports/phoneorder/edit/"+object.id+".htm'>Edit</a>";
}
shippingAddressFormate = function(dataCell, object) {
    if(object.address!=null&&object.address!=""){
        dataCell.innerHTML =object.address;
        if(object.city != null)
            dataCell.innerHTML+=','+object.city;
        if(object.country != null)
            dataCell.innerHTML+=','+object.country.name;
    }else{
        dataCell.innerHTML ="";
    }
   
}
formateInvoice = function(dataCell, object) {
    dataCell.innerHTML ="<a href='/back-end/reports/phoneorder/invoice/"+object.id+".htm' target='_blanck'>Invoice</a>";
}
formatDeliveryOption = function(dataCell, object){
    if(object.deliveryOption == 'Deliver to my Address'){
        dataCell.innerHTML = 'Deliver to customer address';
    }else{
        dataCell.innerHTML = 'Pick up from Carrow Road';
    }
}
formateCost  = function(dataCell, object) {
    if(object.totalCost != null ){
        dataCell.innerHTML = object.totalCost.toFixed(2);
    }else{
        dataCell.innerHTML ="-";
    }
}
function initPhoneOrdersTable(){
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
        width : 70,
        sortable : true,
        align: 'center'
    }
    ,
    {
        display: 'User Name',
        name : 'customerName',
        sortCol : 'customerName',
        width : 110,
        sortable : true,
        align: 'left'
    }
    ,
    {
        display: 'User Phone',
        name : 'customerPhone',
        sortCol : 'customerPhone',
        width : 90,
        sortable : true,
        align: 'left'
    }
    ,
    {
        display: 'Shipping Address',
        name : 'address',
        sortCol : 'address',
        width : 240,
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
        display: 'Cost',
        name : 'totalCost',
        sortCol : 'totalCost',
        width : 60,
        sortable : true,
        align: 'center',
        formatter:formateCost
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
        display: 'Status',
        name : 'status',
        sortCol : 'status',
        width : 60,
        sortable : true,
        align: 'left',
        formatter:formateStatus
    },
    {
        display: 'Payment Method',
        name : 'paymentMethod',
        sortCol : 'paymentMethod',
        width : 120,
        sortable : true,
        align: 'left'
    },
    {
        display: 'Delivery Option',
        name : 'deliveryOption',
        sortCol : 'deliveryOption',
        width : 150,
        sortable : true,
        align: 'left',
        formatter:formatDeliveryOption
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
    var url='/back-end/reports/phoneorder/table.htm';
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
        title: 'Phone Orders',
        useRp: true,
        rp: 15,
        showTableToggleBtn: true,
        width: '100%',
        height: '300'
    }
    );

}

