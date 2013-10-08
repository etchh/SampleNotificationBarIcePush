var language=1;
var tableHtml='<div id="table-wrapper"><table id="#table#" class="flexme1"></table></div>';
function kitsHomeJs(){
    initKitsTable();
    runTabs();
    resetForm=function(){
        validator.resetForm();
        $("#KitForm")[0].reset();
    }
    var cancelForm = function(){
        $("#tabs").show();
        $("#add").show();
        $("#KitForm").attr('action','createkit.htm');
        $("#KitForm").find('input[name$="submit"]').val('Create Kit');
        $("#FormDiv").hide();
        resetForm();
        $("html, body").animate({
            scrollTop:$(".content-box").offset().top
        }, 1000)
    }
    $("#cancel").click(function(){
        cancelForm();
    });
    $("#add").click(function(){
        $("#tabs").hide();
        $("#add").hide();
        resetForm();
        $("#FormDiv").show();
        $("#KitForm").attr('action','createkit.htm');
        $("#KitForm").find('input[name$="submit"]').val('Create Kit'); 
    });
    $("#KitForm").submit(function(){
        if(!$(this).valid()){
            return false;
        }
        submitMe(this,null,function(jqXHR, textStatus){
            if(jqXHR && jqXHR.status == 200){
                cancelForm();
                //refreshTableData();
                window.location.href=jqXHR.responseText+'.htm';
                jHide();
            }else{
                jalert("Something went wrong , check your application and try again. ");
            }
        });
        return false;
    })
}
function updateKitJs(){
    $("#KitForm").submit(function(){
        if(!$(this).valid()){
            return false;
        }
        submitMe(this,null,function(jqXHR, textStatus){
            if(jqXHR && jqXHR.status == 200){
                window.location.href='home.htm';
            }else{
                jalert("Something went wrong , check your application and try again. ");
            }
        });
        return false;
    })
    var cancelProductForm = function(){
        $("#ProductFormDiv").hide();    
        $("#FormDiv").show();
        resetForm();
        $("html, body").animate({
            scrollTop:$(".content-box").offset().top
        }, 1000)
    }
    resetForm=function(){
        validator.resetForm();
        $("#ProductForm")[0].reset();
        $("#RearImageVar").val('');
        $("#ProductForm").find(":input[name='frontImg']").remove();
        $("#rearImagePrev, #frontImagesPrev").children('li').remove();
    }
    $("#cancel").click(function(){
        cancelProductForm();
    });
    $("#add").click(function(){ 
        resetForm();
        $("#FormDiv").hide();
        $("#ProductFormDiv").show();
    });
    $("#ProductForm").submit(function(){
        if(!$(this).valid()){
            return false;
        }else{
            saveProduct();
        }
       
        return false;
    })
    function saveProduct(){
        if($("#ProductForm").find(":input[id$='RearImageVar']").val()==null||$("#ProductForm").find(":input[id$='RearImageVar']").val()==undefined||$("#ProductForm").find(":input[id$='RearImageVar']").val()==''){
            $("#rearImagePrev").css("background-color","#F99");
            valid=false;
            return false;
        }else{
            $("#rearImagePrev").css("background-color","#FFFFFF");
        }
        if($("#ProductForm").find(":input[id$='frontImg']").val()==null||$("#ProductForm").find(":input[id$='frontImg']").val()==undefined){
            $("#frontImagesPrev").css("background-color","#F99");
            valid=false;
            return false;
        }else{
            $("#frontImagesPrev").css("background-color","#FFFFFF");
        }
        var id='pro'+$("#ProductForm").find('select[name$="productId"]').val();
        var newProduct=$(" <div />")  .attr( "id", id).attr("style","padding: 2px").css("background-color","#FFFF66");
        newProduct.append($("<input/>").attr("type","hidden").attr( "name", "productId").val($("#ProductForm").find('select[name$="productId"]').val()));
        var productDiv=$("<div/>").attr("class","f").attr("style","width: 30%");
        newProduct.append(productDiv);
        var productLabel=$("<label/>").attr("class","f").attr("style","width: 25%;display: block;padding-top: 5px");
        productDiv.append(productLabel);
        productLabel.append("Product:");
        productDiv.append($("<input/>").val($("#ProductForm").find('select[name$="productId"] option:selected').text()).attr("disabled","true"));
        
        var maxNameLengthDiv=$("<div/>").attr("class","f").attr("style","width: 30%");
        newProduct.append(maxNameLengthDiv);
        var maxNameLengthLabel=$("<label/>").attr("class","f").attr("style","width: 25%;display: block;padding-top: 5px");
        maxNameLengthDiv.append(maxNameLengthLabel);
        maxNameLengthLabel.append("Max Name Length:");
        maxNameLengthDiv.append($("<input/>").attr( "name", "maxNameLength").val($("#ProductForm").find(":input[name$='maxNameLength']").val()).addClass("required number"));
        
        newProduct.append($("<input/>").attr( "type", "hidden").attr( "name", "img").val($("#ProductForm").find(":input[id$='RearImageVar']").val()));
        newProduct.append($("#ProductForm").find(":input[id$='frontImg']").clone());
        newProduct.append($("<input/>").attr("type","button").attr("id","cancel"+id).val('Remove'));
        newProduct.appendTo( $( "#products" ) ); 
        resetForm();
        $("#cancel"+id).click(function(){
            $("#"+id).remove();
        })
        $("#FormDiv").show();
        $("#ProductFormDiv").hide();
    };
}
//run tabs
function runTabs(){
    $('.langs').click(function(){
        language=$(this).attr("language");
        copyh=tableHtml;        
        $(language==1?'#tab-English':'#tab-Japanese').html(copyh.replace("#table#", "table-"+language)); 
        $('#language').find('option').removeAttr("selected");
        $('#language option[value='+language+']').attr('selected','selected'); 
        initKitsTable();
    });
    $('#tabs').tabs();
    $('#dialog_link, ul#icons li').hover(
        function() {
            $(this).addClass('ui-state-hover');
        },
        function() {
            $(this).removeClass('ui-state-hover');
        }
        );
}
addCheckBox = function(dataCell, object) {
    dataCell.innerHTML = '<input type="checkbox" name="kitId" id="kitId" value="'+object.id+'">';
}

formatEdit = function(dataCell, object){
    dataCell.innerHTML = "<a href='"+object.id+".htm'>edit</a>";
    
}
deleteKits = function(){
    var checked=getChecked($("#table-"+language)[0]);
    if(checked && checked.length >0)
        jconfirm("Are you sure you want to delete those items ?",function(){
            for(var i =0;i<checked.length;i++){
                $.ajax({
                    url:'kdelete.htm',
                    data:{
                        kitId:checked[i]
                    },
                    success:function(){
                        refreshTableData();
                    }
                });
            }
        });
}
function initKitsTable(){
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
        width : 80,
        align: 'center'
    },
    {
        display: 'Description',
        name : 'description',
        sortCol : 'description',
        width : 80,
        align: 'center'
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
    var url='/back-end/eshop/kits/kitsTable.htm?language='+language;
    var tableId='table-'+language;
    drawTable(tableId, url, cols)
}
function drawTable(tableId,urlTofetch,colDefinetion){


    $("#"+tableId).flexigrid({
        url: urlTofetch,
        dataType: 'json',
        colModel : colDefinetion ,
        buttons : [
        {
            name: 'delete',
            bclass: 'delete',
            onpress : deleteKits
        },
        {
            separator: true
        }
        ],
        /*searchitems : [

        ],*/
        sortname: "id",
        sortorder: "asc",
        usepager: true,
        title: 'Kits',
        useRp: true,
        rp: 15,
        showTableToggleBtn: true,
        width: "100%",
        height: 300
    }
    );

}

