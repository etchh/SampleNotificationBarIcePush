/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


formatEdit= function(dataCell,object){
    dataCell.innerHTML =  "<a href=\"/back-end/gallery/edit/"+object.id+".htm\">Edit</a>";
     
}
formatDelete= function(dataCell,object){
    dataCell.innerHTML =  "<a href=\"/back-end/gallery/delete/"+object.id+".htm\">delete</a>";    
    
}
formatGallaryType = function(dataCell,object){
    if(object.galleryType != null){
        dataCell.innerHTML =  object.galleryType.name;
    }else{
        dataCell.innerHTML="-";
    }
}


function initGalleryTable(){
    var cols=[
    {
        display: 'Gallery Name',
        name : 'name',
        sortCol : 'name',
        width : 200,
        sortable : true,
        align: 'center'
    },
    {
        display: 'Type',
        name : 'galleryType.name',
        width : 100,
        align: 'center',
        formatter:formatGallaryType
    },
    {
        display: 'Edit',
        name : 'id',
        sortCol : 'id',
        width : 100,
        sortable : true,
        align: 'center',
        formatter:formatEdit
    }/*,
    {
        display: 'Delete',
        name : 'id',
        sortCol : 'id',
        width : 100,
        sortable : true,
        align: 'center',
        formatter:formatDelete
    }*/
    ];
    var url='/back-end/gallery/table.htm?search='; 
    var tableId='table';
    drawTable(tableId, url, cols,'Gallery')
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
}

cancelForm = function(){
    $(".flexigrid").show();
    $("#add").show();
    $("#FormDiv").hide();
    resetForm();
}


init = function(){
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
                
    initGalleryTable();
    //    $('#searchKey').keyup(function(event) {        
    //        searchTable(event,'/back-end/galleryType/table.htm')
    //    });
    
    $("#galleryForm").submit(function(){
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


editGallery = function(){

    $("#galleryForm").submit(function(){
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