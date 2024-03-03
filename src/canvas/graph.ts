import Circle from '../structures/nodes/circle';
import { ILink, INode, GraphCanvasSetting } from './types';
import * as d3 from "d3";
import CanvasCtrl from '../controllers/canvas';
import DataCtrl from '../controllers/data';


class GraphCanvas {

    settings: GraphCanvasSetting;
    dataCtrl: DataCtrl;
    canvasCtrl: CanvasCtrl; // rendering graphics 

    constructor(settings: GraphCanvasSetting) {
        this.settings = settings;
        this.dataCtrl = new DataCtrl([], []);
        this.canvasCtrl = new CanvasCtrl(settings.canvas, this.dataCtrl);
    }

    createSimulation = (nodes: INode[], edges: ILink[]) => {
        const { screenWidth, screenHeight } = this.canvasCtrl.viewportSettings;
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(edges) // This force provides links between nodes
                .id((d: ILink) => d.id) // This sets the node id accessor to the specified function.
                // If not specified, will default to the index of a node.
                .distance(200)
            )
            .force("charge", d3.forceManyBody().strength(-500)) // This adds repulsion (if it's negative) between nodes.
            .force("center", d3.forceCenter(screenWidth / 2, screenHeight / 2))
            .force("collision", d3.forceCollide().radius((d: INode) => 20).iterations(2))
            .velocityDecay(0.8);

        simulation
            .force('link')
            .links(edges);
        return simulation
    }


    ticked = (nodes: INode[], edges: ILink[]) => {
        nodes.forEach((node: INode) => {
            let { x, y, shapeGfx } = node;
            shapeGfx?.position.set(x, y);
        });

        // edges.forEach((link) => {
        //     let { source, target } = link;
        //     link.shapeGfx = EdgeGraphics({ source, target, app })
        //     artBoard.addChild(link.shapeGfx);
        // });

        // visualLinksGfxs.endFill();
    }

    addData = (nodes: INode[], links: ILink[]) => {
        console.log("Adding nodes and edges", nodes, links)
        let _this = this;

        // add data to store 
        this.dataCtrl.addData(nodes, links)

        // clear canvas
        // this.viewport.removeChildren(); // fix this 

        // render nodes 

        // render links 

        // set canvas events

        // // add to graphology
        // nodes.forEach((node: INode) => {
        //     _this.graphData.addNode(node.id, node);
        // });

        // render nodes
        this.dataCtrl.nodes.map((node: INode) => {
            if (!node.shapeGfx) {
                const shapeContainer = new Circle(_this)
                node.shapeGfx = shapeContainer.draw(node)
                _this.canvasCtrl.addShape(node.shapeGfx);
                // _this.artBoard.addChild(node.shapeGfx);
            }
        });

        // render links 
        this.dataCtrl.links.map((link: ILink) => {
            if (link.shapeGfx) {
                // const shapeContainer = new
            }
        })

        const simulation = this.createSimulation(nodes, links);
        simulation.on("tick", () => this.ticked(nodes, links));
        simulation.on('end', function () { console.log("=Simulation ended"); simulation.stop(); _this.canvasCtrl.fitView(); });
    }



}


export default GraphCanvas;