import {GraphNode, GraphEdge} from "../types"


const convertGraphNodeToVisJsNode = (jsonData: GraphNode)=> {
    return {
        "id": jsonData.id,
        "label": jsonData.display_text,
        "group": jsonData.label,
        "properties": jsonData.properties
    }
}


const convertGraphEdgeToVisJsEdge = (jsonData: GraphEdge)=> {
    return {
        "id": jsonData.id,
        "label": jsonData.display_text,
        "group": jsonData.label,
        "properties": jsonData.properties,
        "from": jsonData.from,
        "to": jsonData.to
    }
}

export {convertGraphEdgeToVisJsEdge, convertGraphNodeToVisJsNode}