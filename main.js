"use strict";



//Page Variables

var width = 700,
    height = 300,
    margin = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 35
    };



//Data

var data = [
    {
        symbol: 'MCRO',
        date: 'June 28, 2015',
        price: 100,
        percChange: 0.00
    },
    {
        symbol: 'MCRO',
        date: 'June 29, 2015',
        price: 80,
        percChange: -20.00
    },
    {
        symbol: 'RO',
        date: 'June 30, 2015',
        price: 70,
        percChange: -12.50
    },
    {
        symbol: 'RO',
        date: 'June 31, 2015',
        price: 90,
        percChange: 28.57
    } 
];



//Date Formatter

function dateValue(d){
    var formatDate = d3.time.format("%B %d, %Y"); 
    console.log( formatDate.parse(d.date) );

    return formatDate.parse(d.date);
}



//Scales

var x = d3.time.scale()
    .range([0, width])
    .domain(d3.extent(data, function(d){ return dateValue(d);} ));

var y = d3.scale.linear()
    .range([height - 25, 0])
    .domain(d3.extent(data, function(d){ return d.price; }));

var yPercChange = d3.scale.linear()
    .range([height - 25, 0])
    .domain(d3.extent(data, function(d){ return d.percChange; }));



//Axi

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
    //.attr("transform", "translate(0,250)");//axisBottom(x);

var yAxis = d3.svg.axis()
    .scale(yPercChange)
    .orient("left");//Left(y);

var color = d3.scale.category10();

var line = d3.svg.line()
    .x(function(d) { return x(dateValue(d)); })
    .y(function(d) { return yPercChange(d.percChange); });



//Construct graph

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");                

//Add x axis
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (height - 25) + ")")
    .call(xAxis);

//Add y axis
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Price ($)");

//Add data line 
svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);


