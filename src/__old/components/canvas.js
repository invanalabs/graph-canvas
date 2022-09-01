import GraphCanvas from "../canvas/canvas";
import React from "react";
import exampleData, { testData } from "../examples/data";
import flightsData from "../examples/fight-data";
import "./canvas.css";

export default class GraphCanvas extends React.Component {
  constructor(props) {
    console.log("App");
    super(props);
    this.state = { nodes: [], edges: [] };
  }

  componentDidMount() {
    this.canvas = new GraphCanvas("container", null, 1080-250);
    const data = flightsData;
    // const data = testData;
    this.canvas.render(Object.assign({}, data));
    // this.canvas.graph.setTextWaterMarker(["Invana Studio"]);
    // this.canvas.graph.tool;
  }

  render() {
    return (
      <div className="graph-canvas">
        <div id="toolbar"/>
        <div id="container"/>
      </div>
    );
  }
}
