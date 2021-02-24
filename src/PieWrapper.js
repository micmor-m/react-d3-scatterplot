import React, { useRef, useState, useEffect } from "react";
import D3Pie from "./D3Pie";
import "./Button.css";
//const classNames = require("classNames");

const PieWrapper = (props) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      setChart(
        new D3Pie(chartArea.current, props.data, props.updateName, props.type)
      );
    } else {
      //chart.update(props.data, props.type);
    }
  }, [chart, props.data, props.updateName, props.type]);

  return (
    <div
      // className={buttonClass}
      style={{
        // border: "1px solid blue",
        display: "inline",
        width: "auto",
        height: "auto",
        marginTop: "2rem",
      }}
      className="Button"
      ref={chartArea}
      onClick={() => props.switchSetHandler(props.data.name)}
    ></div>
  );
};

export default PieWrapper;
