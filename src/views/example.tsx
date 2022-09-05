import React from "react";
import {Utils} from "@antv/graphin";
import {applyStylesToData} from "../canvas/utils";
import GraphCanvas from "../components/canvas";
import 'bootstrap/dist/css/bootstrap.min.css';

function ExampleView() {
    let data = Utils.mock(45).random().graphin();
    data = applyStylesToData(data)
    const style = {
        "width": "100%",
        "height": "720px"
    }
    return <div className="" style={{"padding": "50px"}}>
        <h1>Graph Canvas</h1>
        <GraphCanvas data={data} containerId={"graph-canvas"}
                     width={1100} height={720}
                     style={style}/>
    </div>
}

export default ExampleView;