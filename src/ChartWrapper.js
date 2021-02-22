import React, { useRef, useState, useEffect } from "react";
import D3Chart from "./D3Chart";

const ChartWrapper = (props) => {
  const chartArea = useRef(null);
  //const [chart, setChart] = useState(null); original line
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      setChart(new D3Chart(chartArea.current, props.data));
    } else {
      chart.update(props.data);
    }
  }, [chart, props.data]);

  return <div className="chart-area" ref={chartArea}></div>;
};

export default ChartWrapper;
