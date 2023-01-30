import {Node, Edge, Data, Options, NetworkEvents, Network} from "vis-network/declarations/network/Network";
import {CanvasData} from "./types";
import {DataSet} from "vis-data/peer/esm/vis-data";
import DisplayManager from "./displayManager";


const resetGroup = (label: string)=>{
    return   label.replace("-inactive","").replace("-secondary-active","");
}


const changeToInactiveNodeGroup =(node: Node)=>{
    console.log("changeToInactiveNodeGroup--first", node.group)

    // @ts-ignore
    const group = resetGroup(node.group);
    node.group = group + "-inactive"
    console.log("changeToInactiveNodeGroup--updated", node.group)
    return node
}

const changeToSecondayActiveNodeGroup =(node:Node) =>{

    /*

             allNodes[allConnectedNodes[i]].color = "rgba(150,150,150,0.75)";
                // @ts-ignore
                if (allNodes[allConnectedNodes[i]].hiddenLabel !== undefined) {
                    // @ts-ignore
                    allNodes[allConnectedNodes[i]].label = allNodes[allConnectedNodes[i]].hiddenLabel;
                    // @ts-ignore
                    allNodes[allConnectedNodes[i]].hiddenLabel = undefined;
                }
        */

    // @ts-ignore
    const group = resetGroup(node.group);
    node.group = group + "-secondary-active"
    // @ts-ignore
    // if (node.hiddenLabel === undefined) {
    //     // @ts-ignore
    //     node.hiddenLabel = node.label;
    //     node.label = undefined;
    // }
    return node
}


const changeToActiveNodeGroup =(node: Node)=>{
    console.log("changeToActiveNodeGroup--first", node.group)
    // @ts-ignore
    const group = resetGroup(node.group);
    node.group = group;

    /*
          // @ts-ignore
                allNodes[connectedNodes[i]].color = undefined;
                // @ts-ignore
                if (allNodes[connectedNodes[i]].hiddenLabel !== undefined) {

                    // @ts-ignore
                    allNodes[connectedNodes[i]].label = allNodes[connectedNodes[i]].hiddenLabel;
                    // @ts-ignore
                    allNodes[connectedNodes[i]].hiddenLabel = undefined;
                }

        */
    // @ts-ignore
    // if (node.hiddenLabel !== undefined) {
    //     // @ts-ignore
    //     node.label = node.hiddenLabel;
    //     // @ts-ignore
    //     node.hiddenLabel = undefined;
    // }
    console.log("changeToActiveNodeGroup--updated", node)
    return node
}


const changeToInactiveEdgeGroup = (edge: Edge, displayManager: DisplayManager )=> {
    edge.color = displayManager.defaultInactiveEdgeSettings.labelColor;;
    // @ts-ignore
    edge.font = {color: displayManager.defaultInactiveEdgeSettings.labelColor};
    // }
    return edge
}

const changeToActiveEdgeGroup = (edge: Edge, displayManager: DisplayManager)=> {
    edge.color = {inherit: "both"}
    // @ts-ignore
    // allEdges[edgeId].label = allEdges[edgeId].hiddenLabel
    // @ts-ignore
    edge.font = { color: displayManager.defaultEdgeSettings.labelColor} // primary highlighted edge

    return edge
}


const changeToSecondaryActiveEdgeGroup = (edge: Edge, displayManager: DisplayManager)=> {
    edge.color = {inherit: "both"}
    edge.font = { color: displayManager.defaultSecondayActiveEdgeSettings.labelColor} // secondary highlighted edge

    return edge
}

class CanvasEventHandler {
    displayManager = new DisplayManager()

    inActiveEdgeFontColor = "#f3f3f3"

    highlightNeighbors = (selectedItems: Node[], nodes: DataSet<Node>,
                          edges: DataSet<Edge>, network: Network) => {

        console.log("===================nodeOnClick", selectedItems, nodes, edges, network)
        let allNodes = nodes.get({returnType: "Object"});
        let allEdges = edges.get({returnType: "Object"});
        console.log("===========allNodes first", allNodes)
        let highlightActive = true;

        // if something is selected:
        if (selectedItems.length > 0) {
            var i, j;
            var selectedNode = selectedItems[0];
            var degrees = 2;

            // mark all nodes as hard to read.
            for (var nodeId in allNodes) {
                // @ts-ignore
                allNodes[nodeId] = changeToInactiveNodeGroup(allNodes[nodeId])
            }

            // mark all nodes as hard to read.
            for (var edgeId in allEdges) {
                // @ts-ignore
                allEdges[edgeId] = changeToInactiveEdgeGroup(allEdges[edgeId], this.displayManager)
            }


            // @ts-ignore
            var connectedNodes = network.getConnectedNodes(selectedNode);
            let allConnectedNodes: any = [];

            // get the second degree nodes
            for (i = 1; i < degrees; i++) {
                for (j = 0; j < connectedNodes.length; j++) {
                    // @ts-ignore
                    allConnectedNodes = allConnectedNodes.concat(network.getConnectedNodes(connectedNodes[j])
                    );
                }
            }

            // all second degree nodes get a different color and their label back
            for (i = 0; i < allConnectedNodes.length; i++) {     
                // @ts-ignore
                allNodes[allConnectedNodes[i]] = changeToSecondayActiveNodeGroup(allNodes[allConnectedNodes[i]])
            }

            // all first degree nodes get their own color and their label back
            for (i = 0; i < connectedNodes.length; i++) {
                // @ts-ignore
                allNodes[connectedNodes[i]] = changeToActiveNodeGroup(allNodes[connectedNodes[i]])                
            }
            // @ts-ignore
            allNodes[selectedNode] = changeToActiveNodeGroup(allNodes[selectedNode])
            Object.keys(allEdges).forEach((edgeId) => {
                const edge: Edge = allEdges[edgeId]
                // @ts-ignore
                if (connectedNodes.indexOf(edge.from) >=0 || connectedNodes.indexOf(edge.to) >= 0) {
                    // @ts-ignore
                    allEdges[edgeId] = changeToSecondaryActiveEdgeGroup(allEdges[edgeId], this.displayManager)
                }
                if (selectedNode === edge.from || selectedNode === edge.to) {
                    // @ts-ignore
                    allEdges[edgeId] = changeToActiveEdgeGroup(allEdges[edgeId], this.displayManager)
                }
            })


        } else if (highlightActive) {
            // reset all nodes
            for (var nodeId in allNodes) {
                // @ts-ignore
                allNodes[nodeId] = changeToActiveNodeGroup(allNodes[nodeId])

            }

            // mark all nodes as hard to read.
            for (var edgeId in allEdges) {
                // @ts-ignore
                allEdges[edgeId] = changeToActiveEdgeGroup(allEdges[edgeId], this.displayManager)
            }

            highlightActive = false;
        }

        // transform the object into an array
        var updateArray = [];
        for (nodeId in allNodes) {
            if (allNodes.hasOwnProperty(nodeId)) {
                updateArray.push(allNodes[nodeId]);
            }
        }
        nodes.update(updateArray);


        // transform the object into an array
        var updateEdgeArray = [];
        for (edgeId in allEdges) {
            if (allEdges.hasOwnProperty(edgeId)) {
                updateEdgeArray.push(allEdges[edgeId]);
            }
        }
        edges.update(updateEdgeArray);
        console.log("=============allNodes last", nodes.get({returnType: "Object"}))
    }

    resetHighlight = (nodes: DataSet<Node>,
                      edges: DataSet<Edge>) => {
        console.log("resetHighlight=====", nodes, edges)
        let allNodes = nodes.get({returnType: "Object"});

        for (var nodeId in allNodes) {
            // @ts-ignore
            allNodes[nodeId] = changeToActiveNodeGroup(allNodes[nodeId])

        }
        // transform the object into an array
        var updateArray = [];
        for (nodeId in allNodes) {
            if (allNodes.hasOwnProperty(nodeId)) {
                updateArray.push(allNodes[nodeId]);
            }
        }
        nodes.update(updateArray);
    }

}


export default CanvasEventHandler