import React from "react";
import {Utils} from "@antv/graphin";
import {applyStylesToData} from "../canvas/utils";
import GraphCanvasComponent from "../canvas/graph-canvas";


function ExampleView() {
    let data = Utils.mock(45).random().graphin();
    data = applyStylesToData(data)
    const style = {
        "width": "100%",
        "height": "720px"
    }
    return <div className="">
        <h1>Graph Canvas</h1>
        <GraphCanvasComponent data={data} containerId={"graph-canvas"}
                              width={1500} height={720}
                              style={style}/>
    </div>
}

export default ExampleView;