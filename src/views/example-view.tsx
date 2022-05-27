import React from "react";
// import CanvasArtBoard from "../contribs/visjs/canvas-artboard";
// import defaultOptions from "../contribs/visjs/networkOptions";
// import {GraphCanvasCtrl} from "../contribs/visjs/canvas-ctrl";
// import GenerateEvents from "../contribs/visjs/events";
import sampleData from "../sample-data/data.json";
import dataUpdate from "../sample-data/data-update.json"
import VisJsGraph from "../core/visjs/visjs-graph";
import ArtBoard from "../core/artboard";

const ExampleView = ()=> {

    const artBoard: ArtBoard = new ArtBoard();
    const [renderCanvas, setRenderCanvas] = React.useState<boolean>(false);
    // const events = GenerateEvents(canvasCtrl, () => console.log("ok"), null)
    // const graphDataJson = {nodes:sampleData.nodes, edges: sampleData.edges }
    const defaultOptions = {}
    console.log(sampleData.nodes)
    console.log(sampleData.edges)
    // artBoard.dataStore.updateData(graphDataJson.nodes,graphDataJson.edges);
    const events = {}
    artBoard.dataStore.addData(sampleData.nodes, sampleData.edges, sampleData.focusedNodes);

    setTimeout(()=> {
        artBoard.dataStore.addData(dataUpdate.nodes, dataUpdate.edges, dataUpdate.focusedNodes);

        
    }, 2000)
   return (
 
        <VisJsGraph
                    containerId={"artboard-1"}
                    // renderCanvas={renderCanvas}
                    // setRenderCanvas={setRenderCanvas}
                    artBoard={artBoard}
                    options={defaultOptions}
                    events={events}
                    style={{width: "100%", height: "calc(100vh - 40px)", "backgroundColor": "#efefef"}}
                    // data={graphDataJson}
                    // getNetwork={(network) =>  artBoard.setNetwork(network)}
                />
 
     )
}

export default ExampleView