import React, { useRef, useState, useEffect } from "react";
import D3Chart from "./D3Chart";

const ChartWrapper = (props) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      setChart(
        new D3Chart(chartArea.current, props.data, props.updateName, props.type)
      );
    } else {
      chart.update(props.data, props.type);
    }
  }, [chart, props.data, props.updateName, props.type]);

  return <div className="chart-area" ref={chartArea}></div>;
};

export default ChartWrapper;
