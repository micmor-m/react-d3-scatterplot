import * as d3 from "d3";

const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 10 };
const WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 300 - MARGIN.TOP - MARGIN.BOTTOM;

class D3Chart {
  constructor(element, data) {
    let vis = this;

    //save data
    vis.data = data;
    //console.log(data);
    vis.g = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    //x scale
    vis.x = d3.scaleLinear().range([0, WIDTH]);

    //y scale
    vis.y = d3.scaleLinear().range([HEIGHT, 0]);

    vis.xAxisGroup = vis.g
      .append("g")
      .attr("transform", `translate(0, ${HEIGHT})`);
    vis.yAxisGroup = vis.g.append("g");

    // labels
    vis.g
      .append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 40)
      .attr("font-size", 20)
      .attr("text-anchor", "middle")
      .text("Age");

    vis.g
      .append("text")
      .attr("x", -HEIGHT / 2)
      .attr("y", -50)
      .attr("transform", "rotate(-90)")
      .attr("font-size", 20)
      .attr("text-anchor", "middle")
      .text("Height in cm");

    vis.update();
  }

  update() {
    let vis = this;

    vis.x.domain([0, d3.max(vis.data, (d) => Number(d.age))]);
    vis.y.domain([0, d3.max(vis.data, (d) => Number(d.height))]);

    const xAxisCall = d3.axisBottom(vis.x);
    const yAxisCall = d3.axisLeft(vis.y);

    vis.xAxisGroup.call(xAxisCall);
    vis.yAxisGroup.call(yAxisCall);

    // 1-DATA JOIN connect data to circles
    const circles = d3.selectAll("circle").data(vis.data, (d) => d.name);

    // 3-EXIT remove old element from the screen
    circles.exit().remove();

    // 4-UPDATE arrange remaining circles
    circles.attr("cx", (d) => vis.x(d.age)).attr("cy", (d) => vis.y(d.height));

    // 2-ENTER ad new circles for our data
    circles
      .enter()
      .append("circle")
      .attr("cx", (d) => vis.x(d.age))
      .attr("cy", (d) => vis.y(d.height))
      .attr("r", 5)
      .attr("fill", "grey");
  }
}

export default D3Chart;
