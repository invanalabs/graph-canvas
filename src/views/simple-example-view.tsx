import React from "react";
import CanvasArtBoard from "../contribs/visjs/canvas-artboard";
import defaultOptions from "../contribs/visjs/networkOptions";
import {GraphCanvasCtrl} from "../contribs/visjs/canvas-ctrl";
import GenerateEvents from "../contribs/visjs/events";
import sampleData from "../sample-data/data.tsx"

const SimpleExampleView = ()=> {

    const canvasCtrl: GraphCanvasCtrl = new GraphCanvasCtrl();
    const [renderCanvas, setRenderCanvas] = React.useState<boolean>(false);
    const events = GenerateEvents(canvasCtrl, () => console.log("ok"), null)
    const graphDataJson = {nodes:sampleData.nodes, edges: sampleData.edges }
    
    console.log(sampleData.nodes)
    console.log(sampleData.edges)
    canvasCtrl.addNewData(graphDataJson.nodes,graphDataJson.edges);


   return (
 
        <CanvasArtBoard
                    containerId={"artboard-1"}
                    renderCanvas={renderCanvas}
                    setRenderCanvas={setRenderCanvas}
                    options={defaultOptions}
                    events={events}
                    canvasCtrl={canvasCtrl}
                    style={{width: "100%", height: "calc(100vh - 40px)"}}
                />
 
     )
}

export default SimpleExampleView