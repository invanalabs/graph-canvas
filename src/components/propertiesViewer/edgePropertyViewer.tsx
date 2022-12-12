import React from "react";
import {Node, Edge, Data, Options, NetworkEvents, Network} from "vis-network/declarations/network/Network";
import PropertiesView from "./propertiesView";
import {data} from "vis-network";
import {CanvasEdge} from "../../canvas/types";

interface EdgePropertiesViewerProps {
    edge: CanvasEdge
}

const EdgePropertiesViewer = ({edge}: EdgePropertiesViewerProps) => {

    return <div>
        <p>id: {edge.id}</p>
        <p>label: {edge.label}</p>
        <p>from: {edge.from}</p>
        <p>to: {edge.to}</p>
        <PropertiesView data={edge}/>
    </div>
}
export default EdgePropertiesViewer