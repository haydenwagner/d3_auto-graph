var barcodeChart = function(){
    //Chart Variables.Attributes
    var width = 600,
        height = 30,
        margin = {
            top: 5,
            right: 5,
            bottom: 5,
            left: 5
        };

    var value = function(d){ return d.date; };

    var timeInterval = d3.time.day;

    function chart(selection){
        selection.each(function(data){
        //     //select and bind svg element
        //     console.log(data);
        //     //
        //     //console.log(d3.select(this));
        //     var div = d3.select(this),
        //     svg = div.selectAll('svg').data(data);

        // // Call thesvgInit function on enter.
        //     svg.enter()
        //         .append('svg')
        //         .attr('width', width)
        //         .attr('height', height)
        //         .append('rect')
        //         .attr('width', width)
        //         .attr('height', height)
        //         .attr('fill', 'white');

                //.call(svgInit);

            //compute horizontal scale
            var xScale = d3.time.scale()
                .domain(d3.extent(data, value))
                .range([0, width - margin.left - margin.right]);

            //select container group
            console.log(selection);

            //bind the data to the lines selection
            var bars = g.selectAll('line')
                .data(data, value);

            //append the bars on the enter selection
            bars.enter()
                .append('line')
                    .attr('x1', 10)//function(d){ return xScale( value(d) ); })
                    .attr('x2', 15)//function(d){ return xScale( value(d) ); })
                    .attr('y1', 0)
                    .attr('y2', height - margin.top - margin.bottom)
                    .attr('stroke', '#000')
                    .attr('stroke-opacity', 0.5);
        });
    }


    function svgInit(svg){
        //set width and heigth of svg
        svg.attr('width', width)
            .attr('height', height);

        //create and translate the container group
        var g = svg.append('g')
            .attr('class', 'chart-content')
            .attr('transform', 'translate(' + [margin.top, margin.left] + ')');

        //add background rectangle
        g.append('rect')
            .attr('width', width - margin.left - margin.right)
            .attr('height', height - margin.top - margin.bottom)
            .attr('fill', 'green');
    }

    //accessor function for the width
    chart.width = function(value){
        //if there are no arguments passed then set width as default width value
        if(!arguments.length){
            return width;
        }
        width = value;

        return chart;
    };

    //accessor function for the width
    chart.height = function(value){
        //if there are no arguments passed then set width as default width value
        if(!arguments.length){
            return height;
        }
        height = value;

        return chart;
    };

    //accessor for the value function
    chart.value = function(accessorFunction){
        if(!arguments) { return value; }
        value = accessorFunction;
        return chart;
    };

    //time interval accessor
    chart.timeInterval = function(value){
        if(!arguments) { return timeInterval; }
        timeInterval = value;
        return chart;
    };



    return chart;
};



