import React from "react";
import {Utils} from "@antv/graphin";
import {applyStylesToData} from "../canvas/colorUtils";
import GraphCanvas from "../components/canvas/canvas";
import 'bootstrap/dist/css/bootstrap.min.css';
import data from "../exampleData/author-story/data.json";
import initState from "../exampleData/author-story/settings.json";


// const data = Utils.mock(45).random().graphin();

function ExampleView() {
    return <div className="" style={{"padding": "30px"}}>
        <GraphCanvas data={data}
                     initState={initState}
                     containerId={"graph-canvas"}
                     width={"100%"} height={920}
        />
    </div>
}

export default ExampleView;