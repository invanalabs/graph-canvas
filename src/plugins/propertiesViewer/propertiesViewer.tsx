import {Node, Edge} from "vis-network/declarations/network/Network";
import NodePropertiesViewer from "./nodePropertyViewer";
import EdgePropertiesViewer from "./edgePropertyViewer";
import React from "react";

interface PropertiesViewerProps {
    element: any | null
}

const PropertiesViewer = ({element}: PropertiesViewerProps) => {
        console.log("Properties viewer", element)
    if (!element) return <React.Fragment/ >
    //
    // @ts-ignore
    if (element && element.from) {
        return <EdgePropertiesViewer edge={element}/>
    } else {
        return <NodePropertiesViewer node={element}/>
    }

}

export default PropertiesViewer