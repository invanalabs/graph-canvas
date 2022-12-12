import React from "react"
import {CanvasData} from "../../canvas/types";
import {getSchemaNodesAndEdgesFromCanvasData, getSchemaLinksFromCanvasData} from "./utils";
import {Canvas} from "../../canvas";

export interface GraphSchemaProps {
    canvasData: CanvasData
}

const GraphSchema = (props: GraphSchemaProps) => {

    const canvasSchemaData = getSchemaNodesAndEdgesFromCanvasData(
        props.canvasData.nodes, props.canvasData.edges
    )
    return <Canvas data={canvasSchemaData}
                   logEvent={(eventName: string, eventParams: any) => {

                   }}
                   nodeSizeBasedOnLinks={true}/>

}

export default GraphSchema