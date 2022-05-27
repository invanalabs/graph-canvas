import React from "react";
// import CanvasArtBoard from "../contribs/visjs/canvas-artboard";
// import defaultOptions from "../contribs/visjs/networkOptions";
// import {GraphCanvasCtrl} from "../contribs/visjs/canvas-ctrl";
// import GenerateEvents from "../contribs/visjs/events";
import sampleData from "../sample-data/data.tsx";
import VisJsGraph from "../core/visjs-graph";
import ArtBoard from "../core/artboard";

const ExampleView = ()=> {

    const artBoard: ArtBoard = new ArtBoard();
    const [renderCanvas, setRenderCanvas] = React.useState<boolean>(false);
    // const events = GenerateEvents(canvasCtrl, () => console.log("ok"), null)
    const graphDataJson = {nodes:sampleData.nodes, edges: sampleData.edges }
    const defaultOptions = {}
    console.log(sampleData.nodes)
    console.log(sampleData.edges)
    // artBoard.dataStore.updateData(graphDataJson.nodes,graphDataJson.edges);
    const events = {}

   return (
 
        <VisJsGraph
                    containerId={"artboard-1"}
                    // renderCanvas={renderCanvas}
                    // setRenderCanvas={setRenderCanvas}
                    options={defaultOptions}
                    events={events}
                    // artBoard={artBoard}
                    style={{width: "100%", height: "calc(100vh - 40px)"}}

      
                    data={graphDataJson}
                    getNetwork={(network) =>  artBoard.setNetwork(network)}


                />
 
     )
}

export default ExampleView