/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
/*
* Check all checkboxes in datatable
* checkbox ==> header checkbox if check so check all else uncheck all
* tableId ==> table that you need to check all its checkboxes
*/
function checkAll(checkBox, tableId){
   
    if(checkBox.checked){
        $('#'+tableId+' :checkbox').each(function() {
            $(this).attr("checked", true);
        });
    }else{
        $('#'+tableId+' :checkbox').each(function() {
            $(this).attr("checked", false);
        });
    }
}
function getChecked(table){
    var checked = [];
    $(table).find('input[type="checkbox"]:checked').each(function(){
        checked.push(this.value)
    });
    return checked;
    
}
function refreshTableData()
{
    $('.pReload').click();  //refresh table
}
