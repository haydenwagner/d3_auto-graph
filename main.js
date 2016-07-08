"use strict";

var width = 700,
    height = 300,
    margin = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 35
    };


// var dat = [
//     {
//         name: 'Apple',
//         price: 0
//     },
//     {
//         name: 'Micr',
//         price: 0
//     },
//     {
//         name: 'Sony',
//         price: 0
//     },
//     {
//         name: 'Johns',
//         price: 0
//     },
// ];

var data = [
    {
        symbol: 'MCRO',
        date: 'June 28, 2015',
        price: 100
    },
    {
        symbol: 'MCRO',
        date: 'June 29, 2015',
        price: 80
    },
    {
        symbol: 'RO',
        date: 'June 30, 2015',
        price: 70
    },
    {
        symbol: 'RO',
        date: 'June 31, 2015',
        price: 90
    } 
];

//var startValue = function(d){ return d.start; };
//var value = function(d){ return d.price; };

//var barWidth = 45;

// var xScale = d3.scaleLinear()
//     .domain([0, data[0].prices.length])
//     .range([margin.left, width]);

// var yScale = d3.scaleLinear()
//     .domain([0, value( d3.max(data[0].prices) ) + 10 ] )
//     .rangeRound([height - 10, 0]);

function dateValue(d){
    var formatDate = d3.time.format("%B %d, %Y"); 
    console.log( formatDate.parse(d.date) );

    return formatDate.parse(d.date);
}


var x = d3.time.scale()
    .range([0, width])
    .domain(d3.extent(data, function(d){ return dateValue(d);} ));

var y = d3.scale.linear()
    .range([height - 25, 0])
    .domain(d3.extent(data, function(d){ return d.price; }))



var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
    //.attr("transform", "translate(0,250)");//axisBottom(x);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");//Left(y);

// var yAxis = d3.axisRight(yScale)
//     .ticks(5)
//     .tickSize(width)
//     .tickPadding(5);

var color = d3.scale.category10();

var line = d3.svg.line()
    .x(function(d) { return x(dateValue(d)); })
    .y(function(d) { return y(d.price); });

// var line = d3.svg.line()
//     .x(function(d) { 
//         return x(dateValue(d)); 
//     })
//     .y(function(d) { 
//         console.log(d.price);
//         return y(d.price); 
//     });


var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");                

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + (height - 25) + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Price ($)");

svg.append("path")
  .datum(data)
  .attr("class", "line")
  .attr("d", line);

// function type(d) {
//   d.date = formatDate.parse(d.date);
//   d.price = +d.price;
//   return d;
// }

// var svg = d3.select('#chart-example').append('svg')
//     .attr('class', 'chart-svg')
//     .attr('width', width)
//     .attr('height', height);

// var g = svg.append('g')
//         .attr('id','g-container')
//         .attr('class', 'chart-content')
//         .attr('transform', 'translate(' + [0, margin.top] + ')');


//   svg.append("path")
//       .datum(data)
//       .attr("class", "line")
//       .attr("d", line);

// var rect = g.selectAll('rect')
//             .data(dat);

// rect.enter()
//     .append('rect')
//     .attr('x', function(d, i){ return xScale( i ); })
//     .attr('y', function(d){ return yScale( value(d) );})
//     .attr('height', function(d){
//         return height - 10 - yScale( value(d) );
//     })
//     .attr('width', barWidth)
//     .attr("fill", function(d,i) { return color(i); } );

// var textName = g.selectAll('text.name')
//     .data(data)
//     .enter().append('text')
//     .attr('x', function(d, i){ return xScale( i ); })
//     .attr('y', height + 75)
//     .attr('transform', function(d,i){ return 'rotate(-60,' + (xScale(i) - 25) + ',' + (height + 52.5) +')';})
//     .text(function(d){ return d.name; });


// function updateData(d){
//     var recty = d3.selectAll('rect');

//     recty.data(d);

//     recty.transition()
//     .delay(function(d,i){
//         return i * 100;
//     })
//     .duration(function(d,i){
//         //return Math.log(i + 4) * 500;
//         return 800;
//     })
//     .attr('y', function(d){ return yScale( value(d) );})
//     .attr('height', function(d){
//         return height - 10 - yScale( value(d) );
//     });
// }

// updateData(data);

// //Create Y axis
// var yAxis = d3.select('.chart-svg')
//     .style("padding", "10px 10px 50px 10px")
//     .append("g")
//     .attr("class", "y axis")
//     .attr("transform", "translate(" + 0 + ",5)")
//     .call(yAxis);


// yAxis.selectAll("text")
//     .attr("x", 4)
//     .attr("dy", -4);

// yAxis.selectAll("g").filter(function(d) { console.log(d);return d; })
//     .classed("minor", true);


// var lines = d3.selectAll('rect');

//////////////////////////////////////////////////////////////////////////

// var count = 0;
// (function binder(){
//     console.log(count);
//     // if( count > 0 && count % 2 === 0 ){
//     //     updateData(data);
//     // }
//     // else if ( count > 0 ){
//     //     updateData(dat);
//     // }
//     if ( count > 0 ){
//         //console.log(dat);
//         for(var x = 0; x < dat.length; x++){
//             console.log(dat[x]);
//             dat[x].price = 90 * Math.random();
//         }
//         //console.log(dat);
//         updateData(dat);
//     }
//     setTimeout(binder, 1500);
//     count++;
// })();

