import * as d3 from "d3";
import { useLayoutEffect } from "react";

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
    console.log("PieData", vis.data);
    vis.g = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${WIDTH / 2}, ${HEIGHT / 2})`);

    const color = d3.scaleOrdinal([
      "#007bff",
      "gray",
      // "#8da0cb",
      // "#e78ac3",
      // "#a6d854",
      // "#ffd92f",
    ]);

    const pie = d3
      .pie()
      .value((d) => d)
      .sort(null);

    const arc = d3
      .arc()
      .innerRadius(RADIUS - 5)
      .outerRadius(RADIUS);

    // const dataArr = [
    //   vis.data[0]["gaugeData"][0].score,
    //   100 - vis.data[0]["gaugeData"][0].score,
    // ];

    const dataArr = [vis.data.score, 100 - vis.data.score];
    //const path = vis.g.selectAll("path").data(pie(vis.data[0]["gaugeData"][0]));
    const arcs = vis.g.selectAll("arc").data(pie(dataArr));
    //vis.path =
    //vis.g.data(vis.pie(vis.data[0]["gaugeData"][0]));

    // vis.path
    //   //vis.g
    //   .selectAll("path")
    //   .data(vis.pie)
    //   .enter()
    //   .append("path")
    //   .attr("d", vis.arc)
    //   .attr("fill", (_, i) => vis.color(i))
    //   .attr("stroke", "black")
    //   .attr("stroke-width", 1);
    //vis.g
    arcs
      .enter()
      .append("path")
      .attr("fill", (d, i) => color(i))
      .attr("d", arc)
      // .attr("stroke", "red")
      .attr("stroke-width", "6px");
    // .each(function (d) {
    //   this._current = d;
    // });

    //vis
    vis.g
      .append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", "1.5em")
      .attr("y", -2)
      //.text(`${vis.data[0]["gaugeData"][0].score}%`);
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
      //.text(`Sample: ${vis.data[0]["gaugeData"][0].sample}`);
      .text(`Sample: ${vis.data.sample}`);

    vis.g
      .append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", "1em")
      .attr("fill", "#007bff")
      .attr("y", -75)
      // .text(`${vis.data[0]["gaugeData"][0].name}`);
      .text(`${vis.data.name}`);
  }
}

export default D3Pie;
