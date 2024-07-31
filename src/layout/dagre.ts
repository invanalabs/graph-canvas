import dagre from "@dagrejs/dagre";
import { GraphCanvas } from "../canvas";
import {  CanvasNode, ICanvasLink,  ICanvasNode } from "../store";


// TODO - implement LayoutComputerAbstract
class DagreLayoutComputer {

    canvas: GraphCanvas;
    // layout: dagre.graphlib.Graph;

    defaultNodeHeight: number = 10 
    defaultNodeWidth: number = 10 

    constructor(canvas: GraphCanvas) {
        this.canvas = canvas
        // this.layout = this.createLayoutSimulation();
        console.debug("Make sure 'npm install @dagrejs/dagre' is installed")
    }

    calcNodeHeight = (nodeSizeInfo: CanvasNode) => {
        // const resolution = this.canvas.options?.resolution | window.devicePixelRatio;
        return  nodeSizeInfo?.style?.size * 4  ||  this.defaultNodeHeight
    }
    
    calcNodeWidth = (nodeSizeInfo: CanvasNode) => {
        return nodeSizeInfo?.style?.size * 4 || this.defaultNodeWidth
    }
    
    getCenter = () => {
        const { worldWidth, worldHeight } = this.canvas.artBoard.getCanvasSizeOptions();
        return { centerX: worldWidth / 4, centerY: worldHeight / 4 }
    }

    ticked = () => {
        // this.canvas.renderer.tick()
    }

    generateLayoutedElements = (nodes: ICanvasNode[], links: ICanvasLink[], direction: string ) => {
        const _this = this;
        // const isHorizontal = direction === "LR";
        // const graphOptions =  direction === "LR" ? {rankSep: 150,} : {rankSep: 100}
        const g = new dagre.graphlib.Graph();
        // Set an object for the graph label
        g.setGraph({});
        // Default to assigning a new object as a label for each new edge.
        g.setDefaultEdgeLabel(function() { return {}; });
        console.log("===direction", direction)
        g.setGraph({ 
            // rankdir: direction, 
            // nodesep:200,
            // ranker: "tight-tree",
            // width: 2000,
            // height: 1000,
            marginx: 100,
            marginy: 100,
            // ...graphOptions
        });

        // set the nodes to dagre.layout
        nodes.forEach((node: ICanvasNode) => {
            g.setNode(node.id, {
                width: _this.calcNodeWidth(node),
                height: _this.calcNodeHeight(node)
            });
        });
    
        // set the links to dagre.layout
        links.forEach((link: ICanvasLink) => {
            // console.log("-=====link", link.source, link.target)
            g.setEdge(link.source.id, link.target.id);
            // {length: 200} // TODO - customise edge length etc here ? may be 
        });

        dagre.layout(g);
     

        nodes.forEach((node: ICanvasNode) => {
            const nodeWithPosition = g.node(node.id);
            console.log("layout of node ", node.id, nodeWithPosition, node)
            node.x = nodeWithPosition.x /// - nodeWithPosition.width / 2;
            node.y = nodeWithPosition.y // - nodeWithPosition.height / 2;
            // node;
        });
  
        // this.layout.nodes().forEach(function(v) {
        //     console.log("==========Node " + v + ": " + JSON.stringify(_this.layout.node(v)));
        // });
        return { layoutedNodes: nodes, layoutedLinks: links };
    }

    computeLayout(nodes: ICanvasNode[], links: ICanvasLink[],  direction: string = "LR") {
        const {layoutedNodes} = this.generateLayoutedElements(nodes, links , direction)
        console.log("====layoutedNodes", layoutedNodes)
        // this.canvas.artBoard.renderer.rePositionNodes(layoutedNodes);
        this.canvas.artBoard.renderer.tick();
        this.canvas.artBoard.camera.fitView();
    }
 
}

export default DagreLayoutComputer;