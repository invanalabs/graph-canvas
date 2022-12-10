import {Node, Edge, Data, Options, NetworkEvents, Network} from "vis-network/declarations/network/Network";
import {CanvasData} from "./types";
import {DataSet} from "vis-data/peer/esm/vis-data";


class CanvasEventHandler {


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
                allNodes[nodeId].color = "rgba(200,200,200,0.5)";
                // @ts-ignore
                if (allNodes[nodeId].hiddenLabel === undefined) {
                    // @ts-ignore
                    allNodes[nodeId].hiddenLabel = allNodes[nodeId].label;
                    allNodes[nodeId].label = undefined;
                }
            }

            // mark all nodes as hard to read.
            for (var edgeId in allEdges) {
                allEdges[edgeId].color = "rgba(200,200,200,0.5)";
                // @ts-ignore
                if (allEdges[edgeId].hiddenLabel === undefined) {
                    // @ts-ignore
                    allEdges[edgeId].hiddenLabel = allEdges[edgeId].label;
                    allEdges[edgeId].label = undefined;
                }
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
                allNodes[allConnectedNodes[i]].color = "rgba(150,150,150,0.75)";
                // @ts-ignore
                if (allNodes[allConnectedNodes[i]].hiddenLabel !== undefined) {
                    // @ts-ignore
                    allNodes[allConnectedNodes[i]].label = allNodes[allConnectedNodes[i]].hiddenLabel;
                    // @ts-ignore
                    allNodes[allConnectedNodes[i]].hiddenLabel = undefined;
                }
            }

            // all first degree nodes get their own color and their label back
            for (i = 0; i < connectedNodes.length; i++) {
                // @ts-ignore
                allNodes[connectedNodes[i]].color = undefined;
                // @ts-ignore
                if (allNodes[connectedNodes[i]].hiddenLabel !== undefined) {

                    // @ts-ignore
                    allNodes[connectedNodes[i]].label = allNodes[connectedNodes[i]].hiddenLabel;
                    // @ts-ignore
                    allNodes[connectedNodes[i]].hiddenLabel = undefined;
                }
            }

            // the main node gets its own color and its label back.
            // @ts-ignore
            allNodes[selectedNode].color = undefined;
            // @ts-ignore
            if (allNodes[selectedNode].hiddenLabel !== undefined) {
                // @ts-ignore
                allNodes[selectedNode].label = allNodes[selectedNode].hiddenLabel;
                // @ts-ignore
                allNodes[selectedNode].hiddenLabel = undefined;
            }

            Object.keys(allEdges).forEach((edgeId)=>{
                const edge: Edge = allEdges[edgeId]
                // @ts-ignore
                if (connectedNodes.indexOf(edge.from) || connectedNodes.indexOf(edge.to)){
                    allEdges[edgeId].color = {inherit: "both"}
                }
                if (selectedNode === edge.from || selectedNode === edge.to){
                        allEdges[edgeId].color = {inherit: "both"}
                }
            })


        } else if (highlightActive) {
            // reset all nodes
            for (var nodeId in allNodes) {
                allNodes[nodeId].color = undefined;
                // @ts-ignore
                if (allNodes[nodeId].hiddenLabel !== undefined) {
                    // @ts-ignore
                    allNodes[nodeId].label = allNodes[nodeId].hiddenLabel;
                    // @ts-ignore
                    allNodes[nodeId].hiddenLabel = undefined;
                }
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
            allNodes[nodeId].color = undefined;
            // @ts-ignore
            if (allNodes[nodeId].hiddenLabel !== undefined) {
                // @ts-ignore
                allNodes[nodeId].label = allNodes[nodeId].hiddenLabel;
                // @ts-ignore
                allNodes[nodeId].hiddenLabel = undefined;
            }
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