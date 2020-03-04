import React, { useState, useEffect, useRef } from "react";
import { select, scaleLinear, scaleBand, axisBottom, axisLeft, max } from "d3";
import "./styles.css";

export default function App() {
  const [data, setData] = useState([32, 45, 29, 32, 41]);
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleBand()
      .domain([...data.map((d, i) => i + 1)])
      .range([0, 300]);
    const yScale = scaleLinear()
      .domain([0, 55])
      .range([150, 0]);

    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);

    svg
      .select(".x-axis")
      .style("transform", "translateY(150px)")
      .call(xAxis.tickSizeOuter(0));

    svg.select(".y-axis").call(yAxis.ticks(5).tickSizeOuter(0));

    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", "5px")
      .attr("cx", (d, i) => xScale(i + 1) + xScale.bandwidth() / 2)
      .attr("cy", d => yScale(d));
  }, [data]);

  const updateData = () => {
    const newData = data.map(
      () => Math.floor(Math.random() * (50 - 0 + 1)) + 0
    );
    setData(newData);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div style={{ margin: 50 }}>
        <svg ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
      <button onClick={updateData}>Update</button>
    </div>
  );
}
