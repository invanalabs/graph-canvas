import { DataSet } from "vis-network"
import { Edge, Node } from "./types" 

class DataStore{
    // this holds the user side data. 

    nodes: Array<Node> = [] // save as key value pair for easy retrieval
    edges: Array<Edge> = []
    focusedNodes: Array<Node> = []
    
    constructor(        ){
        // this.nodes = new DataSet()
    }

    updateData(nodes: Array<Node>, edges: Array<Edge>, focusedNodes: Array<Node>){

    }

    removeData(nodes:Array<Node>, edges: Array<Edge>, focusedNodes: Array<Node>){

    }

    clear(){

    }

}

export default DataStore