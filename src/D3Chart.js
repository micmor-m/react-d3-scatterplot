import * as d3 from "d3";

const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 10 };
const WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 300 - MARGIN.TOP - MARGIN.BOTTOM;

class D3Chart {
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
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    vis.x = d3.scalePoint().range([0, WIDTH]);

    //y scale
    vis.y = d3.scaleLinear().range([HEIGHT, 0]);

    vis.xAxisGroup = vis.g
      .append("g")
      .attr("transform", `translate(0, ${HEIGHT})`);
    vis.yAxisGroup = vis.g.append("g");

    vis.qualityScore = data[0].areaData["Quality Score"];
    vis.basic = data[0].areaData["Basics"];
    vis.interaction = data[0].areaData["Interaction"];
    vis.expertise = data[0].areaData["Expertise"];
    vis.process = data[0].areaData["Process"];
    vis.knowledge = data[0].areaData["Knowledge"];
    vis.update("qualityScore");
  }

  update(data, type) {
    let vis = this;
    if (type === "Quality Score") {
      vis.data = vis.qualityScore;
    } else if (type === "Basics") {
      vis.data = vis.basic;
    } else if (type === "Interaction") {
      vis.data = vis.interaction;
    } else if (type === "Expertise") {
      vis.data = vis.expertise;
    } else if (type === "Process") {
      vis.data = vis.process;
    } else if (type === "Knowledge") {
      vis.data = vis.knowledge;
    }

    vis.x.domain(["Apr", "May", "Jun", "Jul"]);

    vis.y.domain([0, d3.max(vis.data, (d) => Number(d.score))]);

    const xAxisCall = d3.axisBottom(vis.x);
    const yAxisCall = d3.axisLeft(vis.y);

    vis.xAxisGroup.transition(1000).call(xAxisCall);
    vis.yAxisGroup.transition(1000).call(yAxisCall);

    // 1-DATA JOIN connect data to circles
    const circles = vis.g.selectAll("circle").data(vis.data, (d) => d.date); //original
    const lines = vis.g.selectAll("path").data(vis.data, (d) => d);

    // 3-EXIT remove old element from the screen
    circles.exit().transition(1000).attr("cy", vis.y(0)).remove();
    vis.g.selectAll("#lines").remove();
    vis.g.selectAll("#areas").remove();

    // 4-UPDATE arrange remaining circles
    circles
      .transition(1000)
      .attr("cx", (d) => vis.x(d.date))
      .attr("cy", (d) => vis.y(d.score));

    // 2-ENTER ad new circles for our data
    lines
      .enter()
      .append("path")
      .attr("id", "lines")
      .datum(vis.data)
      .attr("fill", "none")
      .attr("stroke", "#007bff")
      .attr("stroke-width", 4)
      .attr(
        "d",
        d3
          .line()
          .x((d) => vis.x(d.date))
          .y((d) => vis.y(d.score))
      );

    vis.g
      .append("path")
      .attr("id", "areas")
      .datum(vis.data)
      .attr("fill", "#007bff")
      .attr("fill-opacity", 0.3)
      .attr("stroke", "none")
      .attr(
        "d",
        d3
          .area()
          .x((d) => vis.x(d.date))
          .y0(HEIGHT)
          .y1((d) => vis.y(d.score))
      );

    circles
      .enter()
      .append("circle")
      .attr("id", "circles")
      .attr("cy", vis.y(0))
      .attr("cx", (d) => vis.x(d.date))
      .attr("r", 5)
      .attr("fill", "#007bff")
      .transition(1000)
      .attr("cy", (d) => vis.y(d.score));
  }
}

export default D3Chart;
