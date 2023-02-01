import React from "react";
import {Node} from "vis-network/declarations/network/Network";
import PropertiesView from "./propertiesView";
import {CanvasNode} from "../../canvas/types";

interface NodePropertyViewerProps {
    node: CanvasNode
}

const NodePropertiesViewer = ({node}: NodePropertyViewerProps) => {

    return <div>
        <p>id: {node.id}</p>
        <p>label: {node.label}</p>
        <PropertiesView data={node}/>
    </div>
}
export default NodePropertiesViewer