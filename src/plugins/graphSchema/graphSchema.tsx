import React from "react"
import {CanvasData} from "../../canvas/types";
import {getSchemaNodesAndEdgesFromCanvasData, getSchemaLinksFromCanvasData} from "./utils";
import {Canvas} from "../../canvas";
import CanvasDisplaySettings from "../../canvas/types";

export interface GraphSchemaProps {
    canvasData: CanvasData,
    displaySettings: CanvasDisplaySettings
}

const GraphSchema = (props: GraphSchemaProps) => {

    const canvasSchemaData = getSchemaNodesAndEdgesFromCanvasData(
        props.canvasData.nodes, props.canvasData.edges
    )
    return <Canvas data={canvasSchemaData} displaySettings={props.displaySettings}
                   nodeSizeBasedOnLinks={true}/>

}

export default GraphSchema