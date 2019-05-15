
var rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
            const hex = x.toString(16)
            return hex.length === 1 ? '0' + hex : hex
        }).join('')



function hideLabels() {
    // hide the topic labels
    dotsGroup.selectAll(".topicLabel")
        .transition()
        .style("opacity", 0.0);
}