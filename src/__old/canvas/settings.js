import G6 from "@antv/g6";
import React from "react";
import {gForceLayoutSettings, gridLayoutSettings} from "./layouts/settings";
import {GraphOptions} from "@antv/g6";
import {registerGraphinLine} from "@antv/graphin/es/shape";
import {registerGraphinCircle} from "@antv/graphin/es/shape";
import {Utils} from "@antv/graphin";
registerGraphinCircle()
registerGraphinLine()

const defaultNodeStyle = Utils.getNodeStyleByTheme({
  nodeSize: 40,
  primaryColor: "green",
  mode: "dark"
});
const defaultSettings = {
    // renderer: "svg",
    // layout: compactBoxLayoutSettings,
    layout: gridLayoutSettings,
    // needed for undo and redo
    enabledStack: true,
    // translate the graph to align the canvas's center, support by v3.5.1
    fitCenter: true,
    // make the edge link to the centers of the end nodes
    linkCenter: true,
    fitView: true,
    defaultNode: defaultNodeStyle,
        // visible: true, // Controls the visible of the node when first render. false means hide the item. All the items are visible by default

        // type: "graphin-circle",
        // size: 20,
        // The style properties of nodes
        // style: {
        //     // fill: "steelblue", // The filling color of nodes
        //     // stroke: "#666", // The stroke color of nodes
        //     lineWidth: 2, // The line width of the stroke of nodes,
        //     shadowBlur: 0,
        //     backgroundStroke: "#d76e6e"
        // },
        // // The properties for label of nodes
        // labelCfg: {
        //     position: "right", // The relative position of the label
        //
        //     // The style properties for the label
        //     style: {
        //         fontSize: 12, // The font size of the label
        //         fill: "#333" // The color of the text,
        //         // stroke: "#888" // The stroke color
        //         // background: {
        //         //   fill: "#ffffff",
        //         //   stroke: "#9EC9FF",
        //         //   padding: [2, 2, 2, 2],
        //         //   radius: 2
        //         // }
        //     }
        // }
    // },
    // defaultEdge: {
    //     type: "graphin-line", // "line",  "arc", "quadratic", "cubic", "polyline", "loop"
        // labelCfg: {
        //     autoRotate: true,
        //     style: {
        //         fontSize: 12, // The font size of the label
        //         fill: "#999999"
        //         // background: {
        //         //     fill: "#ffffff",
        //         //     stroke: "#9EC9FF",
        //         //     padding: [1, 1, 1, 1],
        //         //     radius: 2
        //         // }
        //     }
        // },
        // // The style properties of edges
        // style: {
        //     cursor: true,
        //     opacity: 0.6, // The opacity of edges
        //     stroke: "#999", // The color of the edges,
        //     shadowBlur: 0,
        //     endArrow: {
        //         path: G6.Arrow.triangle(5, 7, 6), // Using the built-in edges for the path, parameters are the width, length, offset (0 by default, corresponds to d), respectively
        //         // d: 0,
        //         fill: "#999",
        //         stroke: "#999"
        //         // opacity: 1
        //         // lineWidth: 2
        //     },
        //     // endArrow: {
        //     //   path: 'M 0,0 L 8,4 L 8,-4 Z',
        //     //   fill: '#e2e2e2',
        //     // },
        // },
        // loopCfg: {
        //     position: "top"
        // }
    // },
    modes: {
        default: [
            // {
            //     type: 'collapse-expand',
            //     onChange: function onChange(item, collapsed) {
            //         const data = item.get('model');
            //         data.collapsed = collapsed;
            //         return true;
            //     },
            // },
            "activate-relations",
            "drag-canvas", "zoom-canvas", "drag-node"]
    },
    // https://g6.antv.vision/en/docs/manual/middle/states/state
    // nodeStateStyles: {
    //     // The state styles defined as following will take effect on keyShape only. To define state styles on other shapes, refer to the link Configure Styles for State above
    //     hover: {
    //         lineWidth: 5,
    //         strokeOpacity: 0.5,
    //         stroke: '#f00'
    //     },
    //     selected: {
    //         shadowBlur: 0,
    //     },
    //     select: {
    //         shadowBlur: 0,
    //     },
    //     inactive: {
    //         shadowBlur: 0,
    //     },
    //     active: {
    //         shadowBlur: 0,
    //     },
    //     click: {
    //         shadowBlur: 0,
    //     },
    //     // activeByLegend: {
    //     //     lineWidth: 5,
    //     //     strokeOpacity: 0.5,
    //     //     stroke: '#f00'
    //     // },
    //     // inactiveByLegend: {
    //     //     opacity: 0.5
    //     // }
    // },
    // /* styles for different states, there are built-in styles for states: active, inactive, selected, highlight, disable */
    // edgeStateStyles: {
    //     // edge style of active state
    //
    //     // default, active, inactive, disabled, selected, highlight
    //     // https://g6.antv.vision/en/docs/design/global/style#%E4%BA%A4%E4%BA%92%E6%A0%B7%E5%BC%8F-1
    //     active: {
    //         opacity: 0.5,
    //         stroke: "#f00",
    //         shadowBlur: 0,
    //         lineAppendWidth: 4,
    //         // lineWidth: 4,
    //         "edge-text": {
    //             fill: "#f00f00"
    //         }
    //         // labelCfg: {
    //         //     style: {
    //         //         fill: "#f00f00"
    //         //     }
    //         // },
    //     },
    //     inactive: {
    //         opacity: 0.5,
    //         stroke: "#e2ff00",
    //         shadowBlur: 0,
    //         // 'edge-label': {
    //         //     fill: "#e2ff00"
    //         // },
    //     },
    //     // edge style of selected state
    //     selected: {
    //         stroke: "#28a11f",
    //         lineWidth: 2,
    //         shadowBlur: 0,
    //         // "edge-label": {
    //         //     fill: "#28a11f"
    //         // }
    //     },
    //     // default: {
    //     //     stroke: "#b5c7b4",
    //     //     lineWidth: 2,
    //     //     shadowBlur: 0,
    //     //     // "edge-label": {
    //     //     //     fill: "#b5c7b4"
    //     //     // }
    //     // }
    // }
};

// export const testSettings = {
//   // translate the graph to align the canvas's center, support by v3.5.1
//   fitCenter: true,
//   defaultNode: {
//     type: "circle",
//     labelCfg: {
//       position: "bottom"
//     }
//   },
//   defaultEdge: {
//     labelCfg: {
//       autoRotate: true,
//       style: {
//         fill: "#1890ff",
//         fontSize: 14,
//         background: {
//           fill: "#ffffff",
//           stroke: "#9EC9FF",
//           padding: [2, 2, 2, 2],
//           radius: 2
//         }
//       }
//     }
//   },
//   modes: {
//     default: ["drag-canvas", "drag-node"]
//   },
//   nodeStateStyles: {
//     // style configurations for hover state
//     hover: {
//       fillOpacity: 0.8
//     },
//     // style configurations for selected state
//     selected: {
//       lineWidth: 5
//     }
//   }
// };

export default defaultSettings;
