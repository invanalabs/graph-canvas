import { type } from "os"
import { Node } from "reactflow"

export type NodeField = {
    id: string,
    name: string,
    data_type: string
}
export type CanvasNodeData = {
    // data property in the Node 
    name: string,
    fields: NodeField[]
}
export type CanvasNode = Node & {
    data: CanvasNodeData
}
export type CanvasNodeProps = {
    id: string,
    data: CanvasNodeData,
    selected: boolean
}

