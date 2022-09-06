import React from "react";
import {Utils} from "@antv/graphin";
import {applyStylesToData} from "../canvas/colorUtils";
import GraphCanvas from "../components/canvas/canvas";
import 'bootstrap/dist/css/bootstrap.min.css';


const initState = {
    // display settings
    layoutSettings: {
        type: 'dagre',
        options: {},
    },
    nodeDisplaySettings: {
        // "User"
    },
    edgeDisplaySettings: {},

    showDisplaySettings: false,

    // message
    messageText: "Welcome to graph canvas (beta).",

    //
    selectedNodes: [],
    hoveredItem: null,

    //

}

function ExampleView() {
    let data = Utils.mock(45).random().graphin();
    data = applyStylesToData(data,
        initState["nodeDisplaySettings"],
        initState["edgeDisplaySettings"])

    return <div className="" style={{"padding": "30px"}}>
        <GraphCanvas data={data}
                     initState={initState}
                     containerId={"graph-canvas"}
                     width={"100%"} height={920}
        />
    </div>
}

export default ExampleView;