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
    //console.log(data[0].areaData);
    vis.g = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    // labels
    // vis.g
    //   .append("text")
    //   .attr("x", WIDTH / 2)
    //   .attr("y", HEIGHT + 40)
    //   .attr("font-size", 20)
    //   .attr("text-anchor", "middle")
    //   .text("Age"); //+++++++++++++++to be dhynamic

    // vis.g
    //   .append("text")
    //   .attr("x", -HEIGHT / 2)
    //   .attr("y", -50)
    //   .attr("transform", "rotate(-90)")
    //   .attr("font-size", 20)
    //   .attr("text-anchor", "middle")
    //   .text("Height in cm"); //+++++++to be dhynamic

    //x scale
    //vis.x = d3.scaleLinear().range([0, WIDTH]); // original
    //vis.x = d3.scaleTime().range([0, WIDTH]);
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

    //vis.update(data);
  }

  update(data, type) {
    let vis = this;
    //vis.data = data;
    if (type === "qualityScore") {
      vis.data = vis.qualityScore;
    } else if (type === "basic") {
      vis.data = vis.basic;
    } else if (type === "interaction") {
      vis.data = vis.interaction;
    } else if (type === "expertise") {
      vis.data = vis.expertise;
    } else if (type === "process") {
      vis.data = vis.process;
    } else if (type === "knowledge") {
      vis.data = vis.knowledge;
    }
    console.log("VIS DATA", vis.data);

    //const xLabel = ["Apr", "May", "Jun", "Jul"];

    vis.x.domain(["Apr", "May", "Jun", "Jul"]);
    //vis.x.domain(vis.data.map((d) => d.date));
    // vis.x.domain(
    //   d3.extent(vis.data, (d) => {
    //     d3.timeParse("%m")(d.date);
    //   })
    // );
    //vis.x.domain([0, d3.max(vis.data, (d) => d.date)]); //original

    vis.y.domain([0, d3.max(vis.data, (d) => Number(d.score))]);

    const xAxisCall = d3.axisBottom(vis.x);
    const yAxisCall = d3.axisLeft(vis.y);

    vis.xAxisGroup.transition(1000).call(xAxisCall);
    vis.yAxisGroup.transition(1000).call(yAxisCall);

    // Add the area
    //svg
    vis.g
      .append("path")
      .datum(vis.data)
      .attr("fill", "#69b3a2")
      .attr("fill-opacity", 0.3)
      .attr("stroke", "none")
      .attr(
        "d",
        d3
          .area()
          // .x((d) => {
          //   if (d.date === "Apr") {
          //     return 0;
          //   } else if (d.date === "May") {
          //     return 1;
          //   } else if (d.date === "Jun") {
          //     return 2;
          //   } else if (d.date === "Jul") {
          //     return 3;
          //   }
          // })
          .x((d) => vis.x(d.date))
          .y0(HEIGHT)
          //.y1((d) => Number(d.score))
          .y1((d) => vis.y(d.score))
      );

    // Add the line
    //svg
    vis.g
      .append("path")
      .datum(vis.data)
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 4)
      .attr(
        "d",
        d3
          .line()
          // .x((d) => {
          //   if (d.date === "Apr") {
          //     return 0;
          //   } else if (d.date === "May") {
          //     return 1;
          //   } else if (d.date === "Jun") {
          //     return 2;
          //   } else if (d.date === "Jul") {
          //     return 3;
          //   }
          // })
          .x((d) => vis.x(d.date))
          .y((d) => vis.y(d.score))
        //.y((d) => Number(d.score))
      );

    // 1-DATA JOIN connect data to circles
    const circles = vis.g.selectAll("circle").data(vis.data, (d) => d.date); //original
    //const circles = vis.g.selectAll("circle").data(myData);

    // 3-EXIT remove old element from the screen
    circles.exit().transition(1000).attr("cy", vis.y(0)).remove();

    // 4-UPDATE arrange remaining circles
    circles
      .transition(1000)
      // .attr("cx", (d) => vis.x(d.date)) //original
      .attr("cx", (d) => vis.x(d.date))
      .attr("cy", (d) => vis.y(d.score));

    // 2-ENTER ad new circles for our data
    circles
      .enter()
      .append("circle")
      .attr("cy", vis.y(0))
      // .attr("cx", (d) => vis.x(d.date)) //original
      .attr("cx", (d) => vis.x(d.date))
      .attr("r", 5)
      .attr("fill", "grey")
      // .on("click", (d) => vis.updateName(d.date))
      .transition(1000)
      .attr("cy", (d) => vis.y(d.score));
  }
}

export default D3Chart;
