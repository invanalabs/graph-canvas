
type GraphNodeData = {
    id: string
    label : string
    properties: string
}

type GraphEdgeData = GraphNodeData & {
    source: string
    // sourceLabel?: string
    target: string
    // targetLabel?: string
}
 