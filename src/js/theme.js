function themes(div_id, group_id, themeWidth, themeHeight) {
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
    // var legendColor = colorConfig.filter(d => d.label.startsWith(group_id))

    // set the color
    color = d3.scaleOrdinal()
        .range(themeData.map(a => a.hex))
        .domain(themeData.map(a => a.label))


    var themeMargin = {left: 5, top: 10, right: 5, bottom: 10};

    var svgTheme = d3.select(div_id).append("svg")
        .attr("width", (themeWidth + themeMargin.left + themeMargin.right))
        .attr("height", (themeHeight + themeMargin.top + themeMargin.bottom));

    var themeWrapper = svgTheme.append("g").attr("class", "themeWrapper")
        .attr("transform", "translate(" + themeMargin.left + "," + themeMargin.top + ")");

    var rectSize = 15, //dimensions of the colored square
        rowHeight = 20, //height of a row in the themes
        maxWidth = themeWidth; //width of each row

    //Create container per rect/text pair
    var theme = themeWrapper.selectAll('.themeSquare')
        .data(color.range())
        .enter().append('g')
        .attr('class', 'themeSquare')
        .attr("transform", function (d, i) {
            return "translate(" + 0 + "," + (i * rowHeight) + ")";
        })
        .style("cursor", "pointer")
        .on("mouseover", onMouseOver())
        .on("mouseout", onMouseOut)
        .on("click", onClick())

    //Non visible white rectangle behind square and text for better hover
    theme.append('rect')
        .attr('width', maxWidth)
        .attr('height', rowHeight)
        .style('fill', 'rgba(255, 255, 255, 0)');
    //Append small squares to themes
    theme.append('rect')
        .attr('width', rectSize)
        .attr('height', rectSize)
        .style('fill', function (d) {
            return d;
        });
    //Append text to themes
    theme.append('text')
        .attr('transform', 'translate(' + 22 + ',' + (rectSize / 2) + ')')
        .attr("class", "themeText")
        .style("font-size", "10px")
        .attr("dy", ".35em")
        .text(function (d, i) {
            return color.domain()[i];
        });

    //Reset the click event when the user clicks anywhere but the themes
    d3.select("body").on("click", resetClick);


}


function onMouseOver() {
    // filter by colour
    return function (c, i) {
        // console.log(d)

        dotsGroup.selectAll(".dotOnScatter")
            .filter(function (d) {
                return d.hex != c;
            })
            .transition()
            .style('stroke', 'black')
            .style("stroke-width", 0)
            .attr('r', d => d.radius)
            .style("opacity", opacityOff);

        dotsGroup.selectAll(".dotOnScatter")
            .filter(function (d) {
                return d.hex === c;
            })
            .transition()
            .style('stroke', 'black')
            .style("stroke-width", 2)
            .attr('r', d => d.radius * 1.5)
            .style("opacity", opacityOn);

        // hide the topic labels
        hideLabels()

        legend(i, 300, 260)

        // groupLabelHandler(chosen)

    };
}//function filterByColour


// I think I will make dotsGroup global var
function onClick() {
    console.log('theme was clicked');
    return function (c, i) {
        // console.log(d)
        event.stopPropagation();

        d3.selectAll(".themeSquare")
        .on("mouseover", null)
        .on("mouseout", null);

        dotsGroup.selectAll(".dotOnScatter")
            .filter(function (d) {
                return d.hex != c;
            })
            .transition()
            .style('stroke', 'black')
            .style("stroke-width", 0)
            .attr('r', d => d.radius)
            .style("opacity", opacityOff);

        dotsGroup.selectAll(".dotOnScatter")
            .filter(function (d) {
                return d.hex === c;
            })
            .transition()
            .style('stroke', 'black')
            .style("stroke-width", 2)
            .attr('r', d => d.radius * 1.5)
            .style("opacity", opacityOn);

        // hide the topic labels
        dotsGroup.selectAll(".topicLabel")
        .transition()
        .style("opacity", 0.0);

         legend(i, 300, 260)

        // groupLabelHandler(chosen)

    };
}


function onMouseOut() {
    console.log('Exiting themes....removing the topics')
    d3.select('#my_legend').select('svg').selectAll("*").remove();
}