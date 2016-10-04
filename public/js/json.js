var file = "2014_2016.txt";
var wdata = [];

/* TODO: Make txt file into json file so I dont need to push to array.*/
var getFile = $.get(file, function(txt){ //This will parse through the file and push to an array.
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

var convArrToObj = function(array){
    var thisEleObj = new Object();
    if(typeof array == "object"){
        for(var i in array){
            var thisEle = convArrToObj(array[i]);
            thisEleObj[i] = thisEle;
        }
    }else {
        thisEleObj = array;
    }
    return thisEleObj;
}

$.when(getFile).done(function(){ //Async call after array is made
  $('body').append('{ "data": [ ');
  for(var i = 0; i < wdata.length; i++){
    $('body').append('[');
    for(var j = 0; j < wdata[i].length; j++){
      if(j < wdata[i].length - 1){
        $('body').append('"' + wdata[i][j] + '",');
      }
      else{
        $('body').append('"' + wdata[i][j] + '"');
      }
    }
    if(i == wdata.length-1){
      $('body').append('] ]}');
    }else{
      $('body').append('],');
    }
  }
});
