var $table = $('#welysis');
var $tablehead = $('#welysis thead tr');
var $tablebody = $('#welysis tbody');
var wdata = [];

var file = "test.txt";
var getFile = $.get(file, function(txt){
                var lines = txt.split("\n"); //Get per line
                for(var i = 0; i < lines.length; i++){
                  if(lines[i].length > 1){
                    toArr(lines[i].slice(0,-1)); //Delete the last comma in text file
                  }
                }
              });

function toArr(line){
  wdata.push(line.split(',')); //Push the line into array by splitting commas into an array
}

function initTable(){
  for(var i = 0; i < wdata[0].length - 1; i++){
    $tablehead.append($('<td>').text(wdata[0][i]));
  }
  $table.DataTable({
    data: wdata,
    "order": [[2, "desc"]],
    "sScrollX": true,
    "sScrollY": $('#weylsis').height() - 129 + "px",
    "scrollCollapse": true,
  });
}

$.when(getFile).done(function(){
  //console.log(wdata);
  initTable();
});
