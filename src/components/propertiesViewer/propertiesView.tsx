import React from "react";
import {Node} from "vis-network/declarations/network/Network";
import {CanvasEdge, CanvasNode} from "../../canvas/types";

interface PropertiesViewProps {
    data: CanvasNode | CanvasEdge
}

const PropertiesView = ({data}: PropertiesViewProps) => {
    const properties = data.properties || {}
    return <div>
        <h4>Properties</h4>
        {
            Object.keys(properties).map((key, index) => (
                    // @ts-ignore
                <p key={index}> {key}: {properties[key]}</p>
            ))
        }
    </div>
}
export default PropertiesView