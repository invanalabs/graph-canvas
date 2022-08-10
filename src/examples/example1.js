import GraphCanvas from "../components/canvas";
import React from "react";
import exampleData, { testData } from "./data";

export default class ExampleUsage1 extends React.Component {
  constructor(props) {
    console.log("App");
    super(props);
    this.state = { nodes: [], edges: [] };
  }

  componentDidMount() {
    this.canvas = new GraphCanvas("container");
    const data = exampleData;
    // const data = testData;
    this.canvas.render(Object.assign({}, data));
    // this.canvas.graph.setTextWaterMarker(["Invana Studio"]);
    this.canvas.graph.tool;
  }

  render() {
    return (
      <div className="App">
        <h1>Hello @antv/g6</h1>
        {/* <button onClick={() => this.canvas.menu.updateLayout("circular")}>
          circular
        </button>
        <button onClick={() => this.canvas.menu.updateLayout("force")}>
          force
        </button>
        <button onClick={() => this.canvas.menu.updateLayout("radial")}>
          radial
        </button>
        <button onClick={() => this.canvas.menu.updateLayout("gForce")}>
          gForce
        </button>
        <button onClick={() => this.canvas.menu.updateLayout("grid")}>
          grid
        </button>
        <button onClick={() => this.canvas.menu.updateLayout("concentric")}>
          concentric
        </button>
        |<button onClick={() => this.canvas.graph.fitView()}>fitview</button>
        <button onClick={() => this.canvas.graph.fitCenter()}>fitcenter</button>
        |<button onClick={() => this.canvas.graph.refresh()}>redraw</button>|
        <button onClick={() => this.canvas.graph.downloadImage("graph")}>
          save
        </button>
        |<button onClick={() => this.canvas.graph.clear("graph")}>clear</button>
        <hr /> */}
        <div id="toolbar"></div> 
        <div id="container"></div>
      </div>
    );
  }
}
