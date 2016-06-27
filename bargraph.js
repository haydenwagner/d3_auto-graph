var width = 300,
    height = 300,
    margin = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
    };

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

var barWidth = 25;

var xScale = d3.scale.linear()
    .domain([0, data.length])
    .range([40 + margin.left, width - margin.right ]);

var yScale = d3.scale.linear()
    .domain([0, value( d3.max(data) ) ] )
    .rangeRound([height - 10, 0]);


var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(5);






//var divItems = divChart.selectAll('div.data-item')

d3.select('#chart-example').append('svg')
    .attr('class', 'chart-svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
        .attr('id','g-container')
        .attr('class', 'chart-content')
        .attr('transform', 'translate(' + [margin.top, margin.left] + ')')
        .selectAll('rect')
            .data(data)
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
                .attr('stroke', '#000')
                .attr('stroke-opacity', 0.5);

//Create Y axis
var yAxis = d3.select('.chart-svg')
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + 40 + ",5)")
    .call(yAxis);

console.log(yAxis);

yAxis.selectAll('text')
    .style('fill', '#202020')
    .style('font-family', 'verdana')
    .attr('x', -15);

yAxis.selectAll('line')
    .attr('x2', -10)
    .style('stroke', '#000');

// yAxis.selectAll('.tick')
//     .attr('transform', 'translate(' +)



// var lines = d3.selectAll('#g-container line');
// console.log(lines);

// lines.transition()
//     .duration(500)
//     .attr('x1', function(d){ return xScale(value(d));})
//     .attr('x2', function(d){ return xScale(value(d));});


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
