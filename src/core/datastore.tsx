import {DataSet} from "vis-data/peer/esm/vis-data";
import { GraphEdge, GraphNode } from "./types" 
import {convertGraphNodeToVisJsNode, convertGraphEdgeToVisJsEdge} from "./visjs/store-utils"


class DataStore {
    // this holds the user side data. 

    nodes: any = new DataSet() // save as key value pair for easy retrieval
    edges: any = new DataSet() 
    // focusedNodes: any = new DataSet() 
     

    addData(nodes: Array<GraphNode>, edges: Array<GraphEdge>, focusedNodes: Array<GraphNode>){
        this.nodes.add(nodes.map(node =>convertGraphNodeToVisJsNode(node)));
        this.edges.add(edges.map(edge =>convertGraphEdgeToVisJsEdge(edge)));
        // this.focusedNodes.add(focusedNodes);
        console.log("Nodes added ", this.nodes)
    }

    updateData(nodes: Array<GraphNode>, edges: Array<GraphEdge>, focusedNodes: Array<GraphNode>){
        
    }

    removeData(nodes:Array<GraphNode>, edges: Array<GraphEdge>, focusedNodes: Array<GraphNode>){

    }

    clear(){
        // this.nodes.clear();
        // this.edges.clear();
        // this.focusedNodes.clear();

    }



    // convertToGraphData

}

export default DataStore