/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


formatEdit= function(dataCell,object){
    dataCell.innerHTML =  "<a href=\"/back-end/galleryType/edit/"+object.id+".htm\">Edit</a>";
    if(object.description)
        $(dataCell).css('cursor','pointer').click(function(){
            jalert(object.description);
        });  
}
formatGallery= function(dataCell,object){
    if(object.id != null)
    {
        dataCell.innerHTML = "<a href=\"/back-end/gallery/home.htm?typeId="+object.id+"\">Galleries</a>";
       
    }else{
        dataCell.innerHTML = '';
    }
}


function initGalleryTypeTable(){
    var cols=[
    {
        display: 'Gallery Type Name',
        name : 'name',
        sortCol : 'name',
        width : 200,
        sortable : true,
        align: 'center'
    },
    {
        display: 'Galleries',
        name : 'id',
        //        sortCol : 'id',
        width : 100,
        //        sortable : true,
        align: 'center',
        formatter:formatGallery
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
    var url='/back-end/galleryType/table.htm?search='; 
    var tableId='table';
    drawTable(tableId, url, cols,'Gallery Types')
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


submitNewGalleryType = function(){
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
                
    initGalleryTypeTable();
    $('#searchKey').keyup(function(event) {        
        searchTable(event,'/back-end/galleryType/table.htm')
    });
    
    $("#galleryTypeForm").submit(function(){
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


editGalleryType = function(){

    $("#galleryTypeForm").submit(function(){
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