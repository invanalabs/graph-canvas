import { ILink, INode, GraphCanvasSetting } from './types';
import * as d3 from "d3";
import Canvas from '../canvas/pixi';
import StateCtrl from '../state/model';
// import ForceLayout from '../layouts/force';


class GraphCanvas {

    settings: GraphCanvasSetting;
    stateCtrl: StateCtrl;
    canvasCtrl: Canvas; // rendering graphics 
    // layout :ForceLayout;

    constructor(settings: GraphCanvasSetting) {
        this.settings = settings;
        this.stateCtrl = new StateCtrl([], []);
        this.canvasCtrl = new Canvas(settings.canvas, this.stateCtrl);

    }

    // createSimulation = (nodes: INode[], edges: ILink[]) => {
    //     const { worldWidth, worldHeight } = this.canvasCtrl.camera ;
    //     const simulation = d3.forceSimulation(nodes)
    //         .force("link", d3.forceLink(edges) // This force provides links between nodes
    //             .id((d: ILink) => d.id) // This sets the node id accessor to the specified function.
    //             // If not specified, will default to the index of a node.
    //             .distance(200)
    //         )
    //         .force("charge", d3.forceManyBody().strength(-500)) // This adds repulsion (if it's negative) between nodes.
    //         .force("center", d3.forceCenter(worldWidth/2, worldHeight/2))
    //         .force("collision", d3.forceCollide().radius((d: INode) => 20).iterations(2))
    //         .velocityDecay(0.8);

    //     simulation
    //         .force('link')
    //         .links(edges);
    //     return simulation
    // }


    // ticked = (nodes: INode[], edges: ILink[], stateCtrl: StateCtrl) => {
    //     // let _this = this;
    //     nodes.forEach((node: INode) => {
    //         let { x, y } = node;
    //         stateCtrl.updateNodePosition(node, x, y)
    //         // shapeGfx?.position.set(x, y);
    //     });

    //     // edges.forEach((link) => {
    //     //     let { source, target } = link;
    //     //     link.shapeGfx = EdgeGraphics({ source, target, app })
    //     //     artBoard.addChild(link.shapeGfx);
    //     // });
    //     this.canvasCtrl.fitView();

    //     if (this.canvasCtrl.debug_mode) {
    //         this.canvasCtrl.screenBorderDraw();
    //     }else{
    //         this.canvasCtrl.screenBorderClear();
    //     }

    // }

    addData = (nodes: INode[], links: ILink[]) => {
        console.log("Adding nodes and edges", nodes, links)

        // add data to store 
        this.stateCtrl.addData(nodes, links)
        this.canvasCtrl.layout.runLayout();

        this.canvasCtrl.renderer.render()


        // const simulation = this.createSimulation(nodes, links);
        // simulation.on("tick", () => this.ticked(nodes, links, this.stateCtrl));
        // simulation.on('end', () => { 
        //     console.log("=Simulation ended"); 
        //     simulation.stop();
        //     _this.canvasCtrl.fitView();
        // });
    }



}


export default GraphCanvas;