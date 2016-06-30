var width = 300,
    height = 300,
    margin = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 35
    };

var dat = [
    {
        name: 'Apple',
        price: 0
    },
    {
        name: 'Micr',
        price: 0
    },
    {
        name: 'Sony',
        price: 0
    },
    {
        name: 'Johns',
        price: 0
    },
];

var data = [
    {
        name: 'Apple',
        price: 90
    },
    {
        name: 'Micr',
        price: 30
    },
    {
        name: 'Sony',
        price: 60
    },
    {
        name: 'Johns',
        price: 50
    },
];

var value = function(d){ return d.price; };
console.log( value( d3.max(data) ) );

var barWidth = 45;

var xScale = d3.scaleLinear()
    .domain([0, data.length])
    .range([margin.left, width]);

var yScale = d3.scaleLinear()
    .domain([0, value( d3.max(data) ) + 10 ] )
    .rangeRound([height - 10, 0]);


var yAxis = d3.axisRight(yScale)
    .ticks(5)
    .tickSize(width)
    .tickPadding(5);

// var xAxis = d3.axisBottom(yScale)
//     .ticks(0);







//var divItems = divChart.selectAll('div.data-item')

d3.select('#chart-example').append('svg')
    .attr('class', 'chart-svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
        .attr('id','g-container')
        .attr('class', 'chart-content')
        .attr('transform', 'translate(' + [0, margin.top] + ')')
        .selectAll('rect')
            .data(dat)
            .enter()
            .append('rect')
                .attr('x', function(d, i){ return xScale( i ); })
                .attr('y', function(d){ return yScale( value(d) );})
                .attr('height', function(d){
                    console.log(d);
                    console.log( value(d) );
                    console.log( height );
                    console.log( yScale( value(d) ) );
                    return height - 10 - yScale( value(d) );
                })
                .attr('width', barWidth)
                .attr('fill', '#000')
                //.attr('stroke', '#000')
                //.attr('stroke-opacity', 0.5);

//Create Y axis
var yAxis = d3.select('.chart-svg')
    .style("padding", "10px")
    .append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + 0 + ",5)")
    .call(yAxis);


yAxis.selectAll("text")
    .attr("x", 4)
    .attr("dy", -4);

yAxis.selectAll("g").filter(function(d) { console.log(d);return d; })
    .classed("minor", true);

//var yTicks = d3.selectAll(".yAxis .tick line")
//     .attr('stroke-width', '5px')
//     .attr('y1', -2.5)
//     .attr('y2', -2.5);

// console.log(yTicks);


// var xAxis = d3.select('.chart-svg')
//     .style("padding", "10px")
//     .append("g")
//     .attr("class", "x axis")
//     .attr("transform", "translate(" + 40 + "," + (height - 10) + ")")
//     .call(xAxis);

// var xAxisPath = d3.select('.xAxis path')
//     .attr('stroke-width', function(){console.log(this);});

console.log(yAxis);

// yAxis.selectAll('text')
//     .style('fill', '#202020')
//     .style('font-family', 'verdana')
//     .attr('x', -15);

// yAxis.selectAll('line')
//     .attr('x2', -10)
//     .style('stroke', '#000');

// yAxis.selectAll('.tick')
//     .attr('transform', 'translate(' +)



var lines = d3.selectAll('rect');
// console.log(lines);

lines.data(data);

lines.transition()
    .duration(1000)
    .attr('y', function(d){ return yScale( value(d) );})
    .attr('height', function(d){
        console.log(d);
        console.log( value(d) );
        console.log( height );
        console.log( yScale( value(d) ) );
        return height - 10 - yScale( value(d) );
    });



// d3.select('#chart').append('div')
//     .attr('class', 'data-item')
//     .data(data)
//     .call(barcode);


// var pItems = divItems.append('p')
//     .html(function(d){ return d; });




function randomInterval(avgSeconds){
    return Math.floor( -Math.log( Math.random() ) * 1000 * avgSeconds );
}


function addData(data, numItems, avgSeconds){
    //compute the most recent time in teh data array
    var n = data.length,
        t = ( n > 0 ) ? data[n - 1].date : new Date();

    //append items with increasing times in the data array
    for ( var k = 0; k < numItems - 1; k++){
        t = new Date(t.getTime() + randomInterval(avgSeconds));
        data.push( {date: t} );
    }

    return data;
}
