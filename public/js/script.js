var $table = $('#welysis');

$('.progress').show();

function initTable() { //Initialize the Datatable
  $table.DataTable({
    "processing": true,
    "ajax": "2014_2016.json",
    "order": [
      [2, "desc"]
    ],
    "sScrollX": true,
    "sScrollY": $('#tablepanel .panel-body').height() - 270 + "px",
    "scrollCollapse": true,
    "pageLength": 50,
    "fnInitComplete": function(){
      $('.progress').hide();
      $('[data-toggle="tooltip"]').tooltip({
        'container': 'body'
      });
    }
  });
}
initTable();

$(function() {


  // Set the dimensions of the canvas / graph
  var margin = {
      top: 30,
      right: 20,
      bottom: 30,
      left: 50
    },
    width = 1400 - margin.left - margin.right,
    height = 480 - margin.top - margin.bottom;

  // Parse the date / time
  var parseDate = d3.time.format("%Y%m%d").parse;

  // Set the ranges
  var x = d3.time.scale().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  // Define the axes
  var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

  var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

  // Define the line
  var valueline = d3.svg.line()
    .x(function(d) {
      return x(d.YEARMODA);
    })
    .y(function(d) {
      return y(d.TEMP);
    });

  // Adds the svg canvas
  var svg = d3.select(".chart")
    .append("svg")
    .attr("width", "100%")
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10,0])
    .html(function(d){
      return "<strong>Temp:</strong> <span style='color:red'>" + d.TEMP + "</span> | <strong>D:</strong> <span>" + d.YEARMODA + "</span>";
    });

  svg.call(tip);

  // Get the data
  d3.csv("2014_16_NOAC.csv", function(error, data) {

    data.forEach(function(d) {
      d.YEARMODA = parseDate(d.YEARMODA);
      d.TEMP = +d.TEMP;
    });


    // Scale the range of the data
    x.domain(d3.extent(data, function(d) {
      return d.YEARMODA;
    }));
    y.domain([0, d3.max(data, function(d) {
      return d.TEMP;
    })]);

    /*// Add the valueline path.
    svg.append("path")
      .attr("class", "line")
      .attr("d", valueline(data));*/

    // Add the scatterplot
    svg.selectAll("dot")
      .data(data)
      .enter().append("circle")
      .attr("r", 1.5)
      .attr("cx", function(d) {
        return x(d.YEARMODA);
      })
      .attr("cy", function(d) {
        return y(d.TEMP);
      })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

    // Add the X Axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    // Add the Y Axis
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  });

});
