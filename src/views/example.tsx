import React from "react";
import {Utils} from "@antv/graphin";
import {applyStylesToData} from "../canvas/utils";
import GraphCanvas from "../components/canvas";
import 'bootstrap/dist/css/bootstrap.min.css';

function ExampleView() {
    let data = Utils.mock(45).random().graphin();
    data = applyStylesToData(data)
    const initState = {
        layoutSettings: {
            type: 'dagre',
            options: {},
        },
        selectedNodes: [],
        messageText: "Welcome to Graph Canvas (beta)..."
    }
    return <div className="" style={{"padding": "30px"}}>
        <GraphCanvas data={data}
                     initState={initState}
                     containerId={"graph-canvas"}
                     width={"100%"} height={880}
        />
    </div>
}

export default ExampleView;