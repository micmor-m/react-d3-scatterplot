import React, { useRef, useState, useEffect } from "react";
import D3Pie from "./D3Pie";
import "./Button.css";

const PieWrapper = (props) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      setChart(
        new D3Pie(chartArea.current, props.data, props.updateName, props.type)
      );
    }
  }, [chart, props.data, props.updateName, props.type]);

  return (
    <div
      style={{
        display: "inline",
        width: "auto",
        height: "auto",
        margin: "0.5rem",
      }}
      className="Button"
      ref={chartArea}
      onClick={() => props.switchSetHandler(props.data.name)}
    ></div>
  );
};

export default PieWrapper;
