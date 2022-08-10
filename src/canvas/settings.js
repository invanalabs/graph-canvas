import G6 from "@antv/g6";
import React from "react";
import gForceLayoutSettings, {
  forceLayoutSettings,
  gridLayoutSettings,
  radialLayoutSettings,
  circularLayoutSettings,
  concentricLayoutSettings
} from "./layouts";

const defaultSettings = {
  layout: gridLayoutSettings,
  // layout: forceLayoutSettings,
  // needed for undo and redo
  enabledStack: true,
  linkCenter: true,
  fitView: true,
  defaultNode: {
    // visible: true, // Controls the visible of the node when first render. false means hide the item. All the items are visible by default

    type: "circle",
    size: 20,
    // The style properties of nodes
    style: {
      // fill: "steelblue", // The filling color of nodes
      // stroke: "#666", // The stroke color of nodes
      lineWidth: 1 // The line width of the stroke of nodes,
    },
    // The properties for label of nodes
    labelCfg: {
      position: "right", // The relative position of the label

      // The style properties for the label
      style: {
        fontSize: 12, // The font size of the label
        fill: "#333" // The color of the text,
        // stroke: "#888" // The stroke color
        // background: {
        //   fill: "#ffffff",
        //   stroke: "#9EC9FF",
        //   padding: [2, 2, 2, 2],
        //   radius: 2
        // }
      }
    }
  },
  defaultEdge: {
    type: "arc", // "line",  "arc", "quadratic", "cubic", "polyline", "loop"
    labelCfg: {
      autoRotate: true,
      style: {
        fontSize: 12, // The font size of the label
        background: {
          fill: "#ffffff",
          stroke: "#9EC9FF",
          padding: [1, 1, 1, 1],
          radius: 2
        }
      }
    },
    // The style properties of edges
    style: {
      cursor: true,
      opacity: 0.6, // The opacity of edges
      stroke: "#999", // The color of the edges,

      // endArrow: true
      // startArrow: true,
      // length: 200,
      // endArrow: true

      endArrow: {
        path: G6.Arrow.triangle(5, 7, 6), // Using the built-in edges for the path, parameters are the width, length, offset (0 by default, corresponds to d), respectively
        d: 0,
        fill: "#999",
        stroke: "#999"
        // opacity: 1
        // lineWidth: 2
      }
    },
    loopCfg: {
      position: "top"
    }
  },
  modes: {
    default: ["drag-canvas", "zoom-canvas", "drag-node"]
  },
  nodeStateStyles: {
    // The state styles defined as following will take effect on keyShape only. To define state styles on other shapes, refer to the link Configure Styles for State above
    hover: {
      // fillOpacity: 0.9,
      lineWidth: 2
    }
  },
  /* styles for different states, there are built-in styles for states: active, inactive, selected, highlight, disable */
  edgeStateStyles: {
    // edge style of active state
    active: {
      opacity: 0.5,
      stroke: "#f00"
    },
    // edge style of selected state
    selected: {
      stroke: "#ff0",
      lineWidth: 3
    }
  }
};

export const testSettings = {
  // translate the graph to align the canvas's center, support by v3.5.1
  fitCenter: true,
  defaultNode: {
    type: "circle",
    labelCfg: {
      position: "bottom"
    }
  },
  defaultEdge: {
    labelCfg: {
      autoRotate: true,
      style: {
        fill: "#1890ff",
        fontSize: 14,
        background: {
          fill: "#ffffff",
          stroke: "#9EC9FF",
          padding: [2, 2, 2, 2],
          radius: 2
        }
      }
    }
  },
  modes: {
    default: ["drag-canvas", "drag-node"]
  },
  nodeStateStyles: {
    // style configurations for hover state
    hover: {
      fillOpacity: 0.8
    },
    // style configurations for selected state
    selected: {
      lineWidth: 5
    }
  }
};

export default defaultSettings;
