import { CanvasNode } from "../core/types";
import dagre from "dagre";
import { Position } from 'reactflow';



export default class DagreLayoutEngine {


    // should have the method getLayoutedElements(nodes, edges, flowInstance, direction)

    dagreGraph = new dagre.graphlib.Graph();
    // dagreGraph.setDefaultEdgeLabel(() => ({}));

    // constructor(){
    //     this.dagreGraph.setDefaultEdgeLabel(() => ({}));
    // }

    defaultNodeWidth = 180 + 30;
    defaultNodeHeight = 36;
    
    padding = 30

    
    calcNodeHeight = (nodeSizeInfo: CanvasNode) => {
        return  nodeSizeInfo?.height  ||  this.defaultNodeHeight 
    }
    
    calcNodeWidth = (nodeSizeInfo: CanvasNode) => {
        return nodeSizeInfo?.width || this.defaultNodeWidth
    }
    
    getLayoutedElements = (nodes: any[], edges: any[], flowInstance: any= null,  direction: string = "LR") => {
        // https://v9.reactflow.dev/examples/layouting/
        // In order to keep this example simple the node width and height are hardcoded.
        // In a real world app you would use the correct width and height values of
        // const nodes = useStoreState(state => state.nodes) and then node.__rf.width, node.__rf.height
        this.dagreGraph.setDefaultEdgeLabel(() => ({}));

        const _this = this;
        console.log("getLayoutedElements", flowInstance, direction)
        const isHorizontal = direction === "LR";
        const graphOptions =  direction === "LR" ? {rankSep: 150} : {rankSep: 100}
    
    
        this.dagreGraph.setGraph({ rankdir: direction, 
            // nodesep:200,
            ...graphOptions
        });
    
        nodes.forEach((node: CanvasNode) => {
            const nodeSizeInfo = flowInstance ? flowInstance.getNode(node.id)  :{}
            _this.dagreGraph.setNode(node.id, {
                width: _this.calcNodeWidth(nodeSizeInfo),
                height: _this.calcNodeHeight(nodeSizeInfo)
            });
        });
    
        edges.forEach((edge: { source: string; target: string; }) => {
            _this.dagreGraph.setEdge(edge.source, edge.target, {
                // length: 200 // TODO - customise edge length etc here ? may be 
            });
        });
    
        dagre.layout(this.dagreGraph);
    
        nodes.forEach((node: CanvasNode) => {
            const nodeWithPosition = _this.dagreGraph.node(node.id);
            node.targetPosition = isHorizontal ? Position.Left : Position.Top;
            node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;
    
            // We are shifting the dagre node position (anchor=center center) to the top left
            // so it matches the React Flow node anchor point (top left).
            node.position = {
                x: nodeWithPosition.x - nodeWithPosition.width / 2,
                y: nodeWithPosition.y - nodeWithPosition.height / 2
            };
    
            return node;
        });
        const layoutedNodes = nodes;
        const layoutedEdges = edges;
    
        return { layoutedNodes, layoutedEdges };
    };
    
}




