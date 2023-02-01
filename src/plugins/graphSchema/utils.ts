import {CanvasEdge, CanvasNode} from "../../canvas/types";


const getSchemaLinksFromCanvasData = (nodes: CanvasNode[], edges: CanvasEdge[]) => {
    // @ts-ignore
    let canvasNodeIdLabelMap = {}; // {1: Person, 2:Project}
    nodes.map((node: CanvasNode) => {
        // @ts-ignore
        canvasNodeIdLabelMap[node.id] = node.label;
    });

    let nodesLabelLinksMap = {} // { Person: {from_links: [], to_links: []}}
    nodes.map((node: CanvasNode) => {
        // @ts-ignore
        nodesLabelLinksMap[node.label] = {from_links: [], to_links: []};
    });

    edges.map((edge: CanvasEdge) => {
        // @ts-ignore
        const edgeFromLabel = canvasNodeIdLabelMap[edge.from];
        // @ts-ignore
        if (nodesLabelLinksMap[edgeFromLabel].from_links.indexOf(edge.label) < 0) {
            // @ts-ignore
            nodesLabelLinksMap[edgeFromLabel].from_links.push(edge.label)
        }

        // @ts-ignore
        const edgeToLabel = canvasNodeIdLabelMap[edge.to];
        // @ts-ignore
        if (nodesLabelLinksMap[edgeToLabel].to_links.indexOf(edge.label) < 0) {
            // @ts-ignore
            nodesLabelLinksMap[edgeToLabel].to_links.push(edge.label)
        }
    })

    let edgeMap = {} // { Person: {from_links: [], to_links: []}}

    edges.map((edge: CanvasEdge) => {
        // @ts-ignore
        const edgeFromLabel = canvasNodeIdLabelMap[edge.from];
        // @ts-ignore
        const edgeToLabel = canvasNodeIdLabelMap[edge.to];

        // @ts-ignore
        const uniquekey = `${edge.label}---${edgeFromLabel}---${edgeToLabel}`
        // @ts-ignore
        edgeMap[uniquekey] = {
            label: edge.label,
            fromLabel: edgeFromLabel,
            toLabel: edgeToLabel
        }
        // edgeMap[]= null
    })
    return {nodes: nodesLabelLinksMap, edges: Object.values(edgeMap)}
}
const getSchemaNodesAndEdgesFromCanvasData = (nodes: CanvasNode[], edges: CanvasEdge[]) => {
    const schemaDataRaw = getSchemaLinksFromCanvasData(nodes, edges)
    // create nodes
    let canvasNodes: CanvasNode[] = []
    let canvasEdges: CanvasEdge[] = []
    Object.keys(schemaDataRaw.nodes).forEach((nodeLabel: string) => {
        canvasNodes.push({
            id: nodeLabel,
            label: nodeLabel,
            properties: {}
        })
    })

    schemaDataRaw.edges.forEach((edge) => {
        canvasEdges.push({
            // @ts-ignore

            id: edge.label,
            // @ts-ignore

            label: edge.label,
            // @ts-ignore

            from: edge.fromLabel,
            // @ts-ignore

            to: edge.toLabel,
            properties: {}
        })
    })

    return {nodes: canvasNodes, edges: canvasEdges}

    // create edges

}
export {getSchemaNodesAndEdgesFromCanvasData, getSchemaLinksFromCanvasData}