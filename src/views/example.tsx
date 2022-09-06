import React from "react";
import {Utils} from "@antv/graphin";
import {applyStylesToData} from "../canvas/colorUtils";
import GraphCanvas from "../components/canvas/canvas";
import 'bootstrap/dist/css/bootstrap.min.css';
import exampleData from "../examples/data";


const initState = {
    // display settings
    layoutSettings: {
        type: 'dagre',
        options: {},
    },
    nodeDisplaySettings: {
        "Person": {
            "nodeSize": 44,
            "nodeIcon": "user",
            // "nodeColor": "#ff0000",
            "labelPropertyKey": "name"
        },
        "Project": {
            "nodeIcon": "company",
            "labelPropertyKey": "name"
        }
    },
    edgeDisplaySettings: {
        "has_child": {
            "edgeColor": "#b6961c",
            // "labelPropertyKey": "name"
        }
    },

    showDisplaySettings: false,

    // message
    messageText: "Welcome to graph canvas (beta).",

    //
    selectedNodes: [],
    hoveredItem: null,

    //

}

function ExampleView() {
    // const data = Utils.mock(45).random().graphin();
    let data = exampleData;
    console.log("===initdata", data)
    return <div className="" style={{"padding": "30px"}}>
        <GraphCanvas data={data}
                     initState={initState}
                     containerId={"graph-canvas"}
                     width={"100%"} height={920}
        />
    </div>
}

export default ExampleView;