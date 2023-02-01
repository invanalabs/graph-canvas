import React, { useRef } from "react";
import "./ContextMenu.scss"
import { Network } from "vis-network";
import { Node, Edge } from "vis-network/declarations/network/Network";


interface ContextMenuProps {
    network: Network,
    selectedElement: Node | Edge
}

const ContextMenu = ({ network, selectedElement }: ContextMenuProps) => {

    // const [show, setShow] = React.useState(false);
    const [selectedNodẻ̉̉̉, setSelectedNodẻ̉̉̉] = React.useState(null) 
    const [positionX, setPositionX] = React.useState(0);
    const [positionY, setPositionY] = React.useState(0);

 
    network.on("oncontext", function (params) {
        console.log("context menu ", params)
        var nodeID = network.getNodeAt( params.pointer.DOM );
        console.log("context menu nodeID", nodeID)
        if (nodeID){
            // @ts-ignore
            var node = network.body.nodes[nodeID];
            setPositionY(params.event.pageY);
            setPositionX(params.event.pageX)
            setSelectedNodẻ̉̉̉(node)
        }
        params.event.preventDefault();
    });

    network.on("click", function (params) {
        if (params.nodes.length == 0){
            console.log("clicked on canvas, hiding context menu ", params)
            setSelectedNodẻ̉̉̉(null)
        }
    });

    console.log("selectedElement+++++", selectedElement)
    if (selectedNodẻ̉̉̉) {
        return <div className="ContextMenu" style={{top: positionY, left: positionX  }} >
            ContextMenu  here {selectedNodẻ̉̉̉.id}
        </div>
    } else {
        return <React.Fragment />
    }


}

export default ContextMenu