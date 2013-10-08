/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var language=1;
var tableHtml='<div id="table-wrapper"><table id="#table#" class="flexme1"></table></div>';
function manufacturesHomeJs(){
    initManufacturersTable();
    runTabs();
    resetForm=function(){
        validator.resetForm();
        $("#ManufacturerForm")[0].reset();
        $("#MainImageVar").val('');
        $("#mainImagePrev").children('li').remove();
    }
    var cancelForm = function(){
        $("#tabs").show();
        $("#add").show();
        $("#ManufacturerForm").attr('action','addmanufacturer.htm');
        $("#ManufacturerForm").find('input[name$="submit"]').val('Create Manufacturer');
        $("#FormDiv").hide();
        $('#MainImageVar').val('');
        $('#mainImage').attr('src','').hide();
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
        $("#ManufacturerForm").attr('action','addmanufacturer.htm');
        $("#ManufacturerForm").find('input[name$="submit"]').val('Create Manufacturer'); 
    });
    $("#ManufacturerForm").submit(function(){
        if($("#MainImageVar").val() == "" || $("#MainImageVar").val() == null){
            $("#mainImagePrev").addClass('error');
            $('.errorImg').show();
            return false;
        }
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
}
function updateManJs(){
    $("#ManufacturerForm").submit(function(){
        if($("#MainImageVar").val() == "" || $("#MainImageVar").val() == null){
            $("#mainImagePrev").addClass('error');
            $('.errorImg').show();
            return false;
        }
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
    $("#ManufacturerFormTranslation").submit(function(){
        if(!$(this).valid()){
            return false;
        }
        submitMe(this,null,function(jqXHR, textStatus){
            if(jqXHR && jqXHR.status == 200){
                window.location.href=jqXHR.responseText+'.htm';
            }else{
                jalert("Something went wrong , check your application and try again. ");
            }
        });
        return false;
    })
    $("#translation").click(function(){
        $("#FormDiv").hide();
        //$("#CategoryFormTranslation").find('li[id$="img"]').html('').append($("#CategoryForm").find('li[id$="img"]').clone(true));
        $("#FormDivTranslation").show();
    });
    $("#cancelTranslation").click(function(){
        $("#FormDiv").show();
        $("#FormDivTranslation").hide();
    });
}
//run tabs
function runTabs(){
    $('.langs').click(function(){
        language=$(this).attr("language");
        copyh=tableHtml;        
        $(language==1?'#tab-English':'#tab-Japanese').html(copyh.replace("#table#", "table-"+language)); 
        $('#language').find('option').removeAttr("selected");
        $('#language option[value='+language+']').attr('selected','selected'); 
        initManufacturersTable();
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
    dataCell.innerHTML = '<input type="checkbox" name="manufacturerId" id="manufacturerId" value="'+object.id+'">';
}
changeStatusLink = function(dataCell, object) {
    if(object.active){
        dataCell.innerHTML = 'active!';
    }else{
        dataCell.innerHTML = 'in-active';
    }
    $(dataCell).css('cursor','pointer')
    $(dataCell).click(function(){
        $.ajax({
            url:'changemanufacturerstatus.htm',
            data:{
                manufacturerId:object.id
            },
            success:function(){
                refreshTableData();
            }
        })
    });
}
formatURL = function(dataCell,object){
    dataCell.innerHTML = object.url.substr(0, 10);
    if(object.url)
        $(dataCell).css('cursor','pointer').click(function(){
            jalert('<a target="_blanck" href="'+object.url+'">'+object.url+'</a>');
        });  
}
formatEdit = function(dataCell, object){
    dataCell.innerHTML = "<a href='"+object.id+".htm'>edit</a>";
    
}
formatShowProducts=function(dataCell,object){
    dataCell.innerHTML = "show Products";
    $(dataCell).css('cursor','pointer').click(function(){
        window.location.href="/back-end/eshop/products/manufacturer/"+object.id+".htm"
    })
}
function initManufacturersTable(){
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
        display: 'URL',
        name : 'url',
        sortCol : 'url',
        width : 250,
        align: 'center',
        formatter: formatURL
    },
    {
        display: 'Status',
        name : 'status',
        sortCol : 'status',
        width : 50,
        sortable : true,
        align: 'left',
        formatter:changeStatusLink
    },{
        display: 'Edit',
        name : '',
        sortCol : '',
        width : 50,
        sortable : true,
        align: 'left',
        formatter:formatEdit
    }
    /*,
    {
        display: 'Products',
        name : '',
        sortCol : '',
        width : 50,
        sortable : true,
        align: 'center',
        formatter:formatShowProducts
    }*/
    ];
    var url='/back-end/eshop/manufacturers/manufacturersTable.htm?language='+language;
    var tableId='table-'+language;
    drawTable(tableId, url, cols)
}
function drawTable(tableId,urlTofetch,colDefinetion){


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
        sortorder: "asc",
        usepager: true,
        title: 'Manufcaturers',
        useRp: true,
        rp: 15,
        showTableToggleBtn: true,
        width: "100%",
        height: 300
    }
    );

}

