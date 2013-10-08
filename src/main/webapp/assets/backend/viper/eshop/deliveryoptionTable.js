/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(function(){
    initDeliveryOptionsTable();
    cancelForm = function(){
        $("#table-wrapper").show();
        $("#add").show();
        $("#DeliveryOptionForm")[0].reset();
        $("#DeliveryOptionForm").attr('action','addDeliveryOption.htm');
        $("#DeliveryOptionForm").find('input[name$="save"]').val('Add Delivery Option');
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
        $("#DeliveryOptionForm")[0].reset();
        $("#DeliveryOptionForm").attr('action','addDeliveryOption.htm');
        $("#DeliveryOptionForm").find('input[name$="save"]').val('Add Delivery Option');
        
        $("html, body").animate({
            scrollTop:$(".content-box").offset().top
        }, 1000)
    });
    $("#DeliveryOptionForm").submit(function(){
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
    dataCell.innerHTML = '<input type="checkbox" name="deliveryOptionId" id="deliveryOptionId" value="'+object.id+'">';
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
            url:'changeDeliveryOptionStatus.htm',
            data:{
                deliveryOptionId:object.id
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
        $("#DeliveryOptionForm").attr('action','updateDeliveryOption.htm').find('input[name$="name"]').val(object.name);
        $("#DeliveryOptionForm").attr('action','updateDeliveryOption.htm').find('input[name$="cost"]').val(object.cost);
        $("#DeliveryOptionForm").find('input[name$="id"]').val(object.id);
        
        $("#DeliveryOptionForm").find('input[name$="submit"]').val('Update Delivery Option');
        var element=document.getElementById("addpic");
        element.setAttribute("style", "display:none");
        $("html, body").animate({
            scrollTop:$(".content-box").offset().top
        }, 1000)
    });
}
function initDeliveryOptionsTable(){
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
        display: 'cost',
        name : 'cost',
        sortCol : 'cost',
        width : 50,
        sortable : true,
        align: 'center'/*,
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
    var url='/back-end/eshop/delivery-option/deliveryOptionTable.htm';
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
        title: 'Delivery Options',
        useRp: true,
        rp: 15,
        showTableToggleBtn: true,
        width: '100%',
        height: 200
    }
    );

}
var productsizecounter=0;
function addDeliveryOption() {
    productsizecounter+=1;
    //Create an input type dynamically.
    var containerName = "container_name_"+productsizecounter;
    var textboxName = "extraName"+productsizecounter;
    
    div = document.createElement('div');
    div.setAttribute("id", containerName);
    
    var element = document.createElement("input");
    //Assign different attributes to the element.
    element.setAttribute("type", "text");
    element.setAttribute("value", "");
    element.setAttribute("name", textboxName);
    element.setAttribute("id", textboxName);
    element.setAttribute("class", "required field text small");
    element.setAttribute("style", "margin-top: 5px;width: 300px;");
    div.appendChild(element);
    
    if(productsizecounter>1){
        var removeLink = document.createElement('img');
        removeLink.setAttribute("src","/assets/backend/images/delete.png");
        removeLink.setAttribute('onclick', 'removeDiv("'+containerName+'");');
        removeLink.setAttribute("style", "position: absolute; margin-left: 10px; margin-top: 3px;width:28px;cursor: pointer;");
        div.appendChild(removeLink);
    }
    var container = document.getElementById("deliveryoptioncontainer");
    
    //Append the element in page (in span).
    container.appendChild(div);

}

function removeDiv(name){
    var div = document.getElementById("productsizecontainer");
    div.removeChild(document.getElementById(name));
}
function submitForm(){
    var myTextField="",namevalue="";
    for (i=1; i<=productsizecounter; i++){
        myTextField = document.getElementById("extraName"+i);
        if(myTextField != null && myTextField.value !=""){
            if(i != productsizecounter)
                namevalue+=myTextField.value+"~";
            else
                namevalue+=myTextField.value;
        }
    }
    document.getElementById('hiddenfields').innerHTML ="<input type='hidden' name='extraNames' value='"+namevalue+"'>";
    document.forms["DeliveryOptionForm"].submit();
}