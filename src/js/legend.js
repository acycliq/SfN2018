///////////////////////////////////////////////////////////////////////////
///////////////////////// Create the Legend////////////////////////////////
///////////////////////////////////////////////////////////////////////////
var color,
    opacityOn = 0.8,
    opacityOff = 0.2;

function legend(div_id, group_id, legendWidth, legendHeight) {
    // id: "#legend_A"
    var legendData = [];

    var legendColor = colorConfig.filter(d => d.label.startsWith(group_id))

    // set the color
    color = d3.scaleOrdinal()
        .range(legendColor.map(a => a.hex))
        .domain(legendColor.map(a => a.label))

    legendData.color = color;
    legendData.group_id = group_id;

    //Legend
    var legendMargin = {left: 5, top: 10, right: 5, bottom: 10};
        // legendWidth = 310;
        // legendHeight = 270;

    var svgLegend = d3.select(div_id).append("svg")
        .attr("width", (legendWidth + legendMargin.left + legendMargin.right))
        .attr("height", (legendHeight + legendMargin.top + legendMargin.bottom));

    var legendWrapper = svgLegend.append("g").attr("class", "legendWrapper")
        .attr("transform", "translate(" + legendMargin.left + "," + legendMargin.top + ")");

    var rectSize = 15, //dimensions of the colored square
        rowHeight = 20, //height of a row in the legend
        maxWidth = legendWidth; //width of each row

    //Create container per rect/text pair
    var legend = legendWrapper.selectAll('.legendSquare')
        .data(color.range())
        .enter().append('g')
        .attr('class', 'legendSquare')
        .attr("transform", function (d, i) {
            return "translate(" + 0 + "," + (i * rowHeight) + ")";
        })
        .style("cursor", "pointer")
        .on("mouseover", selectLegend(opacityOff))
        .on("mouseout", selectLegend(opacityOn))
        .on("click", clickLegend)
        .on("dblclick", dblclickLegend);

    //Non visible white rectangle behind square and text for better hover
    legend.append('rect')
        .attr('width', maxWidth)
        .attr('height', rowHeight)
        .style('fill', 'rgba(255, 255, 255, 0)');
    //Append small squares to Legend
    legend.append('rect')
        .attr('width', rectSize)
        .attr('height', rectSize)
        .style('fill', function (d) {
            return d;
        });
    //Append text to Legend
    legend.append('text')
        .attr('transform', 'translate(' + 22 + ',' + (rectSize / 2) + ')')
        .attr("class", "legendText")
        .style("font-size", "10px")
        .attr("dy", ".35em")
        .text(function (d, i) {
            return color.domain()[i];
        });

    //Reset the click event when the user clicks anywhere but the legend
    d3.select("body").on("click", resetClick);


    return legendData
}

// I think I will make dotsGroup global var
function clickLegend(d, i) {
    console.log('legend was clicked');
    event.stopPropagation();

    //deactivate the mouse over and mouse out events
    d3.selectAll(".legendSquare")
        .on("mouseover", null)
        .on("mouseout", null);

    var legendColor = colorConfig.filter(el => el.hex === d);
    // set the color
    var color = d3.scaleOrdinal()
        .range(legendColor.map(a => a.hex))
        .domain(legendColor.map(a => a.label));

    //Chosen legend item
    var chosen = color.domain()[i];

    //Only show the circles of the chosen one
    dotsGroup.selectAll(".dotOnScatter")
        .style("opacity", opacityOn)
        .style("opacity", function (d) {
            if (d.label != chosen) return opacityOff;
            else return opacityOn;
        });
}

function dblclickLegend(d, i){
    console.log('Double clicked!')
    event.stopPropagation();

    //deactivate the mouse over and mouse out events
    d3.selectAll(".legendSquare")
        .on("mouseover", null)
        .on("mouseout", null);

    dotsGroup.selectAll(".dotOnScatter")
        .style("opacity", opacityOn)
        .style("visibility", function (el) {
            if (el.hex != d) return "hidden";
            else return "visible";
        });

}

//Show all the cirkels again when clicked outside legend
function resetClick() {

    //Activate the mouse over and mouse out events of the legend
    d3.select("#legend_A").selectAll(".legendSquare")
        .on("mouseover", selectLegend(opacityOff))
        .on("mouseout", selectLegend(opacityOn));

    d3.select("#legend_B").selectAll(".legendSquare")
        .on("mouseover", selectLegend(opacityOff))
        .on("mouseout", selectLegend(opacityOn));

    d3.select("#legend_C").selectAll(".legendSquare")
        .on("mouseover", selectLegend(opacityOff))
        .on("mouseout", selectLegend(opacityOn));

    d3.select("#legend_D").selectAll(".legendSquare")
        .on("mouseover", selectLegend(opacityOff))
        .on("mouseout", selectLegend(opacityOn));

    d3.select("#legend_E").selectAll(".legendSquare")
        .on("mouseover", selectLegend(opacityOff))
        .on("mouseout", selectLegend(opacityOn));

    d3.select("#legend_F").selectAll(".legendSquare")
        .on("mouseover", selectLegend(opacityOff))
        .on("mouseout", selectLegend(opacityOn));

    d3.select("#legend_G").selectAll(".legendSquare")
        .on("mouseover", selectLegend(opacityOff))
        .on("mouseout", selectLegend(opacityOn));

    d3.select("#legend_H").selectAll(".legendSquare")
        .on("mouseover", selectLegend(opacityOff))
        .on("mouseout", selectLegend(opacityOn));

    d3.select("#legend_I").selectAll(".legendSquare")
        .on("mouseover", selectLegend(opacityOff))
        .on("mouseout", selectLegend(opacityOn));

    //Show all circles
    dotsGroup.selectAll(".dotOnScatter")
        .style("opacity", opacityOn)
        .style("visibility", "visible");

}//resetClick


///////////////////////////////////////////////////////////////////////////
//////////////////// Hover function for the legend ////////////////////////
///////////////////////////////////////////////////////////////////////////

//Decrease opacity of non selected circles when hovering in the legend
function selectLegend(opacity) {
    return function (d, i) {
        var legendColor = colorConfig.filter(el => el.hex === d)
        // set the color
        var color = d3.scaleOrdinal()
            .range(legendColor.map(a => a.hex))
            .domain(legendColor.map(a => a.label))

        var chosen = color.domain()[i];

        dotsGroup.selectAll(".dotOnScatter")
            .filter(function (d) {
                return d.label != chosen;
            })
            .transition()
            .style("opacity", opacity);
    };
}//function selectLegend

