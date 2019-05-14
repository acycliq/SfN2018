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
        .on("mouseover", mouseover())
        .on("mouseout", mouseout())
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

var rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
            const hex = x.toString(16)
            return hex.length === 1 ? '0' + hex : hex
        }).join('')

function themes(div_id, group_id, legendWidth, legendHeight) {
    // id: "#legend_A"
    var themeData = [];

    themeData.push({ label: 'A. Developement', hex: rgbToHex(179, 179, 0)});
    themeData.push({ label: 'B. Neural Excitability, Synapses, and Glia', hex: rgbToHex(255, 0, 255)});
    themeData.push({ label: 'C. Neurodegenerative Disorders and Injury', hex: rgbToHex(0, 179, 179)});
    themeData.push({ label: 'D. Sensory Systems', hex: rgbToHex(0, 128, 255)});
    themeData.push({ label: 'E. Motor Systems', hex: rgbToHex(255, 0, 0)});
    themeData.push({ label: 'F. Integrative Physiology and Behavior', hex: rgbToHex(0, 255, 0)});
    themeData.push({ label: 'G. Motivation and Emotion', hex: rgbToHex(0, 0, 255)});
    themeData.push({ label: 'H. Cognition', hex: rgbToHex(128, 128, 128)});
    themeData.push({ label: 'I. Techniques', hex: rgbToHex(0, 0, 0)});
    var legendColor = colorConfig.filter(d => d.label.startsWith(group_id))

    // set the color
    color = d3.scaleOrdinal()
        .range(themeData.map(a => a.hex))
        .domain(themeData.map(a => a.label))


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
        .on("mouseover", mouseover())
        .on("mouseout", mouseout())
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
        .attr('r', d => d.radius)
        .style('stroke', 'black')
        .style("stroke-width", function (d) {
            if (d.label != chosen) return 0;
            else return 2})
        .style("opacity", opacityOn)
        .style("opacity", function (d) {
            if (d.label != chosen) return opacityOff;
            else return opacityOn;
        });

    groupLabelHandler(chosen)
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

function headerClick(hex){
    console.log('header was clicked');
    event.stopPropagation();

    //deactivate the mouse over and mouse out events
    d3.selectAll(".legendSquare")
        .on("mouseover", null)
        .on("mouseout", null);

    dotsGroup.selectAll(".dotOnScatter")
        .style('stroke', 'black')
        .style("stroke-width", function (d) {
            if (d.hex != hex) return 0;
            else return 2;
        })
        .style("opacity", function (d) {
            if (d.hex != hex) return opacityOff;
            else return opacityOn;
        });

    groupLabelHandler('dummy')
}

//Show all the cirkels again when clicked outside legend
function resetClick() {

    //Activate the mouse over and mouse out events of the legend
    d3.select("#legend_A").selectAll(".legendSquare")
        .on("mouseover", mouseover())
        .on("mouseout", mouseout());

    d3.select("#legend_B").selectAll(".legendSquare")
        .on("mouseover", mouseover())
        .on("mouseout", mouseout());

    d3.select("#legend_C").selectAll(".legendSquare")
        .on("mouseover", mouseover())
        .on("mouseout", mouseout());

    d3.select("#legend_D").selectAll(".legendSquare")
        .on("mouseover", mouseover())
        .on("mouseout", mouseout());

    d3.select("#legend_E").selectAll(".legendSquare")
        .on("mouseover", mouseover())
        .on("mouseout", mouseout());

    d3.select("#legend_F").selectAll(".legendSquare")
        .on("mouseover", mouseover())
        .on("mouseout", mouseout());

    d3.select("#legend_G").selectAll(".legendSquare")
        .on("mouseover", mouseover())
        .on("mouseout", mouseout());

    d3.select("#legend_H").selectAll(".legendSquare")
        .on("mouseover", mouseover())
        .on("mouseout", mouseout());

    d3.select("#legend_I").selectAll(".legendSquare")
        .on("mouseover", mouseover())
        .on("mouseout", mouseout());

    //Show all circles
    dotsGroup.selectAll(".dotOnScatter")
        .style("opacity", opacityOn)
        .style('stroke-width', 0)
        .style("visibility", "visible");

}//resetClick


///////////////////////////////////////////////////////////////////////////
//////////////////// Hover function for the legend ////////////////////////
///////////////////////////////////////////////////////////////////////////

//Decrease opacity of non selected circles when hovering in the legend
function selectLegend(opacity) {
    var chosen;
    return function (d, i) {
        console.log(d)
        var legendColor = colorConfig.filter(el => el.hex === d)
        // set the color
        var color = d3.scaleOrdinal()
            .range(legendColor.map(a => a.hex))
            .domain(legendColor.map(a => a.label))

        chosen = color.domain()[i];

        dotsGroup.selectAll(".dotOnScatter")
            .filter(function (d) {
                return d.label != chosen;
            })
            .transition()
            .attr('r', d => d.radius)
            .style("opacity", opacity);

        dotsGroup.selectAll(".dotOnScatter")
            .filter(function (d) {
                return d.label === chosen;
            })
            .transition()
            .attr('r', d => d.radius)
            .style("opacity", opacityOn);

        // pulseMe(chosen)
    };
}//function selectLegend


function mouseover() {
    return function (d, i) {
        // console.log(d)
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
            .style('stroke', 'black')
            .style("stroke-width", 0)
            .attr('r', d => d.radius)
            .style("opacity", opacityOff);

        dotsGroup.selectAll(".dotOnScatter")
            .filter(function (d) {
                return d.label === chosen;
            })
            .transition()
            .style('stroke', 'black')
            .style("stroke-width", 2)
            .attr('r', d => d.radius * 1.5)
            .style("opacity", opacityOn);

        groupLabelHandler(chosen)

    };
}//function mouseover


function groupLabelHandler(chosen) {
    dotsGroup.selectAll(".groupLabel")
        .filter(function (d) {
            return d.label != chosen;
        })
        .transition()
        .style("opacity", 0.0);

    dotsGroup.selectAll(".groupLabel")
        .filter(function (d) {
            return d.label === chosen;
        })
        .transition()
        .style("opacity", opacityOn);
}


function mouseout() {
    return function (d, i) {
        dotsGroup.selectAll(".dotOnScatter")
            .transition()
            .style('stroke', 'black')
            .attr("stroke-width", 0)
            .attr('r', d => d.radius)
            .style("opacity", opacityOn);

    };
}//function selectLegend

