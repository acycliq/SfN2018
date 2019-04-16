function scatter(nodes) {
    // from https://d3indepth.com/force-layout/

    var svg = d3.select("#content").select("svg");
    var margin = {
            top: 1,
            right: 1,
            bottom: 1,
            left: 1
        },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    var svg = d3.select('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var colorScale = ['orange', 'lightblue', '#B19CD9'];
    var xScale = d3.scaleLinear().domain([-30.24556501, 25.96428379]).range([0, width]);
    var yScale = d3.scaleLinear().domain([-25.54622992, 23.24546752]).range([0, height]);

    var simulation = d3.forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(5))
        .force('x', d3.forceX().x(function (d) {return xScale(d.gx);}))
        .force('y', d3.forceY().y(function (d) {return xScale(d.gy);}))
        .force('collision', d3.forceCollide().radius(function (d) {return d.radius;}))
        .on('tick', ticked);

    function ticked() {
        var u = d3.select('svg g')
            .selectAll('circle')
            .data(nodes);

        u.enter()
            .append('circle')
            .attr('r', function (d) {return d.radius;})
            .style('fill', function (d) {return d.color;})
            .merge(u)
            .attr('cx', function (d) {return d.x;})
            .attr('cy', function (d) {return d.y;})

        u.exit().remove();
    }
}