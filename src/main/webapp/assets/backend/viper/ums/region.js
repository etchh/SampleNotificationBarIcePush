/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



formatEdit= function(dataCell,object){
    dataCell.innerHTML =  "<a href=\"/back-end/ums/regions/edit/"+object.id+".htm\">Edit</a>";
    if(object.description)
        $(dataCell).css('cursor','pointer').click(function(){
            jalert(object.description);
        });  
}


function initRegionTable(){
    var cols=[
    {
        display: 'Region Name',
        name : 'name',
        sortCol : 'name',
        width : 200,
        sortable : true,
        align: 'center'
    },
    {
        display: 'Delivery Cost',
        name : 'deliveryCost',
        width : 100,
        align: 'center'
    },
    {
        display: 'Edit',
        name : 'id',
        sortCol : 'id',
        width : 100,
        sortable : true,
        align: 'center',
        formatter:formatEdit
    }
    ];
    var url='/back-end/ums/regions/table.htm?search='; 
    var tableId='table';
    drawTable(tableId, url, cols,'Regions')
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




resetForm=function(){
    validator.resetForm();
    $("#name").val('');
    $("#nextDayDeliveryCost").val('');
    $(".dCost").hide();
    $("#deliveryCost").val('');
    $(".search-choice-close").click();
}

cancelForm = function(){
    $(".flexigrid").show();
    $("#add").show();
    $("#FormDiv").hide();
    resetForm();
}


submitNewRegion = function(){
    $("#add").click(function(){
        $(".flexigrid").hide();
        $("#add").hide();
        $("#FormDiv").show();
    
        resetForm();
        $("html, body").animate({
            scrollTop:$(".content-box").offset().top
        }, 1000)
    
    });
    
    
    $("#cancel").click(function(){
        cancelForm();
    });    
                
    initRegionTable();
    $('#searchKey').keyup(function(event) {        
        searchTable(event,'/back-end/ums/region/table.htm')
    });
    
    $("#countryIds").change(function(){
        if($(this).val() != null){
            if($(this).val().indexOf('55') >= 0){
                $(".dCost").show();
            } else {
                $(".dCost").hide();
            }
        }
    });
    
    $("#regionForm").submit(function(){
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
    
    $(".chzn-select").chosen();
}


editRegion = function(){
    
    $("#countryIds").change(function(){
        if($(this).val() != null){
            if($(this).val().indexOf('55') >= 0){
                $(".dCost").show();
            } else {
                $(".dCost").hide();
            }
        }
    });

    $("#regionForm").submit(function(){
        if(!$(this).valid()){
            return false;
        }
        submitMe(this,null,function(jqXHR, textStatus){
            if(jqXHR && jqXHR.status == 200){
                window.location.href="../home.htm";
            }else{
                jalert("Something went wrong , check your application and try again. ");
            }
        });
        return false;
    })
};