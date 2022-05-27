/*
 * Copyright 2021 Invana
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http:www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {Network} from "vis-network/peer/esm/vis-network";
import defaultOptions from "./networkOptions"

export class GraphCanvasCtrl {
    network: any = null;
    nodes: Array<any> = [];
    edges: Array<any> = []
    shallReRender: boolean = true


    constructor() {
        this.nodes = [];
        this.edges = [];
        // this.network.body.data.nodes.update(nodesPrepared)
        // this.network.body.data.edges.update(edgesPrepared)
    }

    setNetwork(network: Network) {
        this.network = network;
        this.setupNetworkEvents();
    }

    updateNetworkData() {
        if (this.network) {
            this.network.body.data.nodes.update(this.nodes)
            this.network.body.data.edges.update(this.edges)
        }
    }

    addNewData(nodes: Array<any>, edges: Array<any>) {
        //TODO -  fix deduping issue later
        console.log("addNewData", nodes, edges);
        this.nodes = this.nodes.concat(nodes)
        this.edges = this.edges.concat(edges)
        this.updateNetworkData()

    }


    getData() {
        return {nodes: this.nodes, edges: this.edges}
    }

    setupNetworkEvents() {
        // let this_ = this;
        // this.network.on("stabilizationIterationsDone", function () {
        //     console.log("stabilizationIterationsDone");
        //     this_.network.setOptions({physics: false});
        // });
    }

    disablePhysics(){
        this.network.setOptions({physics: false})
    }


    focusNodes(selectedNodes: any){
        console.log("===selectedNodes", selectedNodes);
        const allNodes = this.network.body.data.nodes;
        const allEdges = this.network.body.data.edges;
        let _this = this;
        if (selectedNodes.length === 0) {
            console.log("===selectedNodes-------------- zero")
            const allNodesOptions = allNodes.map((node: any) => ({
                id: node.id,
                opacity: 1,
                // color: _this.canvasUtils.getNodeColorObject(
                //     node._label
                // ),
                // borderWidth: 2,
                font: {
                    color: defaultOptions.nodes.font.color
                }
            }));
            const allEdgesOptions = allEdges.map((edge: any) => ({
                id: edge.id,
                opacity: 1,
                font: {
                    color: defaultOptions.edges.font.color
                }
                // font: {color: GRAPH_CANVAS_SETTINGS.DefaultElementTextColor},
                // color: _this.canvasUtils.getEdgeColorObject(edge._label)

            }));

            this.network.body.data.nodes.update(allNodesOptions)
            this.network.body.data.edges.update(allEdgesOptions)

        }// set all the nodes and edges opacity to 0.2
            // set selected nodes and edges opacity to 1.0
        else{    const allNodesOptions = allNodes.map((node: any) => ({
                id: node.id,
                opacity: 0.3,
                // borderWidth: 2,
                // color: _this.canvasUtils.getNodeColorUnHighlightObject(
                //     node._label
                // ),
                // font: {
                //     color: invertColor(_this.canvasUtils.getNodeColorUnHighlightObject(node._label).background, true)
                // }
                font: {
                    color: "#e2e2e2"
                }
            }));

            let selectedNodeIdsAll: Array<String> = [];
            selectedNodes.forEach((node: any) => {
                selectedNodeIdsAll.push(..._this.network.getConnectedNodes(node.id));
                selectedNodeIdsAll.push(node.id);
            })
            console.log("=======selectedNodes", selectedNodes)

            const focusedNodeIds: Array<any>= Array.from(new Set(selectedNodeIdsAll));
            const focusedNodesOptions = focusedNodeIds.map((nodeId: String) => ({
                id: nodeId,
                opacity: 1,
                // borderWidth: 4,
                // color: _this.canvasUtils.getNodeColorObject(
                //     _this.network.body.data.nodes.get(nodeId)._label
                // ),
                // font: {
                //     color: _this.getNodeColor(_this.network.body.data.nodes.get(nodeId))
                // }
        
                font: {
                    color: defaultOptions.nodes.font.color
                }
            }));
            console.log("========focusedNodeIds", focusedNodeIds.length, focusedNodeIds)

            console.log("allNodesOptions", allNodesOptions);
            this.network.body.data.nodes.update(allNodesOptions)
            this.network.body.data.nodes.update(focusedNodesOptions)

            // set all the nodes and edges opacity to 0.2
            // set selected nodes and edges opacity to 1.0
            // Note: opacity doesnt work on edges.
            console.log("=====allEdges", allEdges);
            const allEdgesOptions = allEdges.map((edge: any) => ({
                id: edge.id,
                color: {opacity: 0.3},
                // font: {color: GRAPH_CANVAS_SETTINGS.DefaultElementUnHighlightColor},
                // color: _this.canvasUtils.getEdgeColorUnHighlightObject(edge._label)

                font: {
                    color: "#e2e2e2"
                }
            }));
            console.log("===allEdgesOptions", allEdgesOptions);
            let focusedEdgeIdsAll: Array<String> = [];
            selectedNodes.forEach((node: any) => {
                console.log("==_this.network.getConnectedEdges(node.id)", _this.network.getConnectedEdges(node.id))
                focusedEdgeIdsAll.push(..._this.network.getConnectedEdges(node.id));
            })
            console.log("==focusedEdgeIdsAll", focusedEdgeIdsAll);
            const focusedEdgeIds: any = Array.from(new Set(focusedEdgeIdsAll));

            let focusedEdgesOptions: Array<object> = [];
            focusedEdgeIds.forEach((edgeId: String) => {
                    // const edge = this.network.body.data.edges.get(edgeId);
                    focusedEdgesOptions.push({
                        id: edgeId,
                        color: {opacity: 1},
                        font: {
                            color: defaultOptions.edges.font.color
                        }
                        // font: {color: GRAPH_CANVAS_SETTINGS.DefaultElementTextColor},
                        // color: _this.canvasUtils.getEdgeColorObject(edge._label)
                    })
                }
            );
            // this.network.setOptions({nodes: {opacity: 0.1}});
            console.log("focusedEdgesOptions", focusedEdgesOptions)
            this.network.body.data.edges.update(allEdgesOptions)
            this.network.body.data.edges.update(focusedEdgesOptions)
            // this.network.selectNodes(selectedNodeIds);
        }
    }


}
