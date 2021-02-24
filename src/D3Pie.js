import * as d3 from "d3";

const MARGIN = { TOP: 3, BOTTOM: 20, LEFT: 10, RIGHT: 10 };
const WIDTH = 150 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 200 - MARGIN.TOP - MARGIN.BOTTOM;
const RADIUS = Math.min(WIDTH, HEIGHT) / 2;

class D3Pie {
  constructor(element, data, updateName) {
    let vis = this;
    vis.updateName = updateName;

    //save data
    vis.data = data;
    vis.g = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${WIDTH / 2}, ${HEIGHT / 2})`);

    const color = d3.scaleOrdinal(["#007bff", "gray"]);

    const pie = d3
      .pie()
      .value((d) => d)
      .sort(null);

    const arc = d3
      .arc()
      .innerRadius(RADIUS - 5)
      .outerRadius(RADIUS);

    const dataArr = [vis.data.score, 100 - vis.data.score];
    const arcs = vis.g.selectAll("arc").data(pie(dataArr));

    arcs
      .enter()
      .append("path")
      .attr("fill", (d, i) => color(i))
      .attr("d", arc)
      .attr("stroke-width", "6px");

    vis.g
      .append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", "1.5em")
      .attr("y", -2)
      .text(`${vis.data.score}%`);

    vis.g
      .append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", "0.8em")
      .attr("fill", "gray")
      .attr("y", 12)
      .text(`N/A`);

    vis.g
      .append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", "0.8em")
      .attr("fill", "gray")
      .attr("y", 80)
      .text(`Sample: ${vis.data.sample}`);

    vis.g
      .append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", "1em")
      .attr("fill", "#007bff")
      .attr("y", -75)
      .text(`${vis.data.name}`);
  }
}

export default D3Pie;
