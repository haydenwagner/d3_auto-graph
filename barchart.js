//var data = ['a','b','c'];

//var data = addData([], 150, 300);

//console.log(data);
    var width = 600,
        height = 300,
        margin = {
            top: 5,
            right: 5,
            bottom: 5,
            left: 5
        };

var timeInterval = d3.time.day;

var data = addData([], 150, 300);

var value = function(d){ return d.date; };

//console.log(data);

var barcode = barcodeChart()
    .width(500)
    .height(30);

var xScale = d3.time.scale()
    .domain(d3.extent(data, value))
    .range([0, width - margin.left - margin.right]);


//var divItems = divChart.selectAll('div.data-item')

d3.select('#chart-example').append('svg')
    .attr('class', 'chart-svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
        .attr('id','g-container')
        .attr('class', 'chart-content')
        .attr('transform', 'translate(' + [margin.top, margin.left] + ')')
        .selectAll('line')
            .data(data)
            .enter()
            .append('line')
                .attr('x1', function(d){ return xScale( value(d) ); })
                .attr('x2', function(d){ return xScale( value(d) ); })
                .attr('y1', 0)
                .attr('y2', height - margin.top - margin.bottom)
                .attr('stroke', '#000')
                .attr('stroke-opacity', 0.5);

var lines = d3.selectAll('#g-container line');
console.log(lines);

lines.transition()
    .duration(500)
    .attr('x1', function(d){ return xScale(value(d));})
    .attr('x2', function(d){ return xScale(value(d));});


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
