import React from "react";
import {Utils} from "@antv/graphin";
import {applyStylesToData} from "../canvas/colorUtils";
import GraphCanvas from "../components/canvas/canvas";
import 'bootstrap/dist/css/bootstrap.min.css';
import data from "../exampleData/author-story/data.json";
import initState from "../exampleData/author-story/settings.json";

// import data from "../exampleData/flight-story/data.json";
// import defaultSettings from "../canvas/defaults";
// const initState = defaultSettings

// const data = Utils.mock(1345).random().graphin();
// data.nodes.map((node)=>{
//     node.label = "User"
// })
// data.edges.map((node)=>{
//     node.label = "relationship"
// })

function ExampleView() {
    return <div className="" style={{"padding": "30px"}}>
        <GraphCanvas data={data}
                     initState={initState}
                     containerId={"graph-canvas"}
                     width={1280} height={920}
        />
    </div>
}

export default ExampleView;