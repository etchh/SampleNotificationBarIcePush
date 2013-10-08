/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var tableHtml='<table id="orders" class="flexme1"></table>';
$(document).ready(function(){
    initPersonalizationsTable(); 
    $("#search").click(function(){
        $("#table-wrapper").html(tableHtml);
        initPersonalizationsTable();
    });
    $("#export").click(function(){
        exportSome();
    });
});

exportSome = function(){
    var checked=getChecked($("#orders")[0]);
    if(checked && checked.length >0){
        var ids="";
        for(var i =0;i<checked.length;i++){
            ids+="ids="+checked[i]+"&"
        //            $.ajax({
        //                url:'personalization/excelreport.xls',
        //                data:{
        //                    ids:checked[i]
        //                },
        //                success:function(){
        //                   // refreshTableData();
        //                }
        //            });
        }
        window.open("personalization/excelreport.xls?"+ids); 
    }else{
        var unchecked = $("#orders").find('input[type="checkbox"]')
        ids="";
        for(i =0;i<unchecked.length;i++){
            ids+="ids="+unchecked[i].value+"&"
        }
        window.open("personalization/excelreport.xls?"+ids); 
    }
        
}
addCheckBox = function(dataCell, object) {
    dataCell.innerHTML = '<input type="checkbox" name="id" id="id" value="'+object.id+'">';
}
formatePlayer = function(dataCell, object) {
    if(object.productCustomization.player!=null){
        dataCell.innerHTML = object.productCustomization.player.name;
    }else{
        dataCell.innerHTML = '-';
    }
    
}
formateView = function(dataCell, object) {
    dataCell.innerHTML = '<a href="personalization/'+object.id+'.htm">View</a>';
    
}
addId = function(dataCell, object) {
    if(object.order !=null){
        dataCell.innerHTML = object.order.id;
    }else{
        dataCell.innerHTML = '-';
    }
    
}
addProductName = function(dataCell, object) {
    if(object.productProductSize.product !=null){
        dataCell.innerHTML = object.productProductSize.product.name;
    }else{
        dataCell.innerHTML = '-';
    }
    
}
addSize = function(dataCell, object) {
    
    if(object.productProductSize.productSize !=null){
        dataCell.innerHTML = object.productProductSize.productSize.name;
    }else{
        dataCell.innerHTML = '-';
    }
    
}
addCustomizationName = function(dataCell, object) {
    if(object.productCustomization !=null){
        dataCell.innerHTML = object.productCustomization.name;
    }else{
        dataCell.innerHTML = '-';
    }
    
}
addCustomizationNumber = function(dataCell, object) {
    if(object.productCustomization !=null){
        dataCell.innerHTML = object.productCustomization.number;
    }else{
        dataCell.innerHTML = '-';
    }
    
}
addLeagueLogoed = function(dataCell, object) {
    if(object.productCustomization !=null){
        if(object.productCustomization.premierLeagueLogoed==1){
            dataCell.innerHTML = "place on right sleeve";
        }else if(object.productCustomization.premierLeagueLogoed==2){
            dataCell.innerHTML = "place on left sleeve";
        }else if(object.productCustomization.premierLeagueLogoed==3){
            dataCell.innerHTML = "place on both sleeves";
        }else{
            dataCell.innerHTML = "Don't has Badge";
        }
    }else{
        dataCell.innerHTML = '-';
    }
    
}
function initPersonalizationsTable(){
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
        display: 'Order Id',
        name : 'order.id',
        sortCol : 'order.id',
        width : 50,
        sortable : true,
        align: 'left',
        formatter: addId
    }
    ,
    {
        display: 'Product Name',
        name : 'productProductSize.product.name',
        sortCol : 'productProductSize.product.name',
        width : 100,
        sortable : true,
        align: 'left',
        formatter: addProductName
        
    }
    ,
    {
        display: 'Size',
        name : 'productProductSize.productSize.name',
        sortCol : 'productProductSize.productSize.name',
        width : 100,
        sortable : true,
        align: 'left',
        formatter: addSize
    }
    ,
    {
        display: 'String',
        name : 'productCustomization.name',
        sortCol : 'productCustomization.name',
        width : 50,
        sortable : true,
        align: 'left',
        formatter: addCustomizationName
    }
    ,
    {
        display: 'Number',
        name : 'productCustomization.number',
        sortCol : 'productCustomization.number',
        width : 50,
        sortable : true,
        align: 'left',
        formatter: addCustomizationNumber
    }
    ,
    {
        display: 'Player',
        name : 'productCustomization.player.name',
        sortCol : 'productCustomization.player.name',
        width : 50,
        sortable : true,
        align: 'left',
        formatter: formatePlayer
    }
    ,
    {
        display: 'Premier League Logoed',
        name : 'productCustomization.premierLeagueLogoed',
        sortCol : 'productCustomization.premierLeagueLogoed',
        width : 120,
        sortable : true,
        align: 'left',
        formatter: addLeagueLogoed
    }
    ,
    {
        display: 'View',
        name : 'id',
        width : 50,
        align: 'left',
        formatter:formateView
    }
    ];
    var url='/back-end/reports/personalization-table.htm';
    var params="?"
    if($("#productName").val()!=""){
        params+="productName="+$("#productName").val();
    }
    if($("#orderId").val()!=""){
        params+=(params!="?"?"&":"")+"orderId="+$("#orderId").val();
    }
    if($("#sizeId").val()!=""){
        params+=(params!="?"?"&":"")+"sizeId="+$("#sizeId").val();
    }
    if($("#playerId").val()!=""){
        params+=(params!="?"?"&":"")+"playerId="+$("#playerId").val();
    }
    if($("#logo").val()!=""){
        params+=(params!="?"?"&":"")+"logo="+$("#logo").val();
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
        sortname: "order.purchasedDate",
        sortorder: "desc",
        usepager: true,
        title: 'Personalization',
        useRp: true,
        rp: 15,
        showTableToggleBtn: true,
        width: '100%',
        height: 200
    }
    );

}

