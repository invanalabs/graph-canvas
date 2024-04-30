import GraphCanvas from "../../../canvas/canvas";
import { CanvasNode, CanvasLink } from "../../../graphics/types";
import dagre from "@dagrejs/dagre";


class DagreLayout {

    canvas: GraphCanvas;
    layout: dagre.graphlib.Graph;

    defaultNodeHeight: number = 10 
    defaultNodeWidth: number = 10 

    constructor(canvas: GraphCanvas) {
        this.canvas = canvas
        this.layout = this.createLayoutSimulation();
    }

    calcNodeHeight = (nodeSizeInfo: CanvasNode) => {
        // const resolution = this.canvas.options?.resolution | window.devicePixelRatio;
        return  nodeSizeInfo?.style?.size  ||  this.defaultNodeHeight
    }
    
    calcNodeWidth = (nodeSizeInfo: CanvasNode) => {
        return nodeSizeInfo?.style?.size || this.defaultNodeWidth
    }
    
    createLayoutSimulation() { 
        const g = new dagre.graphlib.Graph();
        // Set an object for the graph label
        g.setGraph({});
        // Default to assigning a new object as a label for each new edge.
        g.setDefaultEdgeLabel(function() { return {}; });
        return g
    }

    getCenter = () => {
        const { worldWidth, worldHeight } = this.canvas.camera.options;
        return { centerX: worldWidth / 4, centerY: worldHeight / 4 }
    }

    ticked = () => {
        this.canvas.renderer.tick()
    }


    generateLayoutedElements = (nodes: CanvasNode[], links: CanvasLink[], direction: string ) => {
        const _this = this;


        // const isHorizontal = direction === "LR";
        // const graphOptions =  direction === "LR" ? {rankSep: 150,} : {rankSep: 100}
    
        console.log("===direction", direction)
        this.layout.setGraph({ 
            rankdir: direction, 
            // nodesep:200,
            // ranker: "tight-tree",
            // width: 2000,
            // height: 1000,
            marginx: 100,
            marginy: 100,
            // ...graphOptions
        });


        // set the nodes to dagre.layout
        nodes.forEach((node: CanvasNode) => {
            _this.layout.setNode(node.id, {
                width: _this.calcNodeWidth(node),
                height: _this.calcNodeHeight(node)
            });
        });
    
        // set the links to dagre.layout
        links.forEach((link: CanvasLink) => {
            _this.layout.setEdge(link.source, link.target);
            // {length: 200} // TODO - customise edge length etc here ? may be 
        });

        dagre.layout(this.layout);

        nodes.forEach((node: CanvasNode) => {
            const nodeWithPosition = _this.layout.node(node.id);
            console.log("layout of node ", node.id, nodeWithPosition)
            node.x = nodeWithPosition.x /// - nodeWithPosition.width / 2;
            node.y = nodeWithPosition.y // - nodeWithPosition.height / 2;
    
            // node;
        });
  
        // this.layout.nodes().forEach(function(v) {
        //     console.log("==========Node " + v + ": " + JSON.stringify(_this.layout.node(v)));
        // });

        return { layoutedNodes: nodes, layoutedLinks: links };
    }

    add2Layout(nodes: CanvasNode[], links: CanvasLink[],  direction: string = "RL") {
        const {layoutedNodes} = this.generateLayoutedElements(nodes, links , direction)

        console.log("====layoutedNodes")
        this.canvas.renderer.rePositionNodes(layoutedNodes);
        this.canvas.renderer.tick();
    }
 

}

export default DagreLayout;