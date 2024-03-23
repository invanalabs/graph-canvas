import * as d3 from "d3";
import { INode, ILink } from "../graphCanvas/types";
import StateCtrl from "../state/model";
import Canvas from "../canvas/pixi";



class ForceLayout {
    
 
    canvas : Canvas;

    constructor(canvas: Canvas){
        this.canvas = canvas
    }

    getCenter = () => {
        const {worldWidth, worldHeight} = this.canvas.canvasOptions
        return {centerX: worldWidth/2, centerY: worldHeight/2}
    }

    ticked = (stateCtrl: StateCtrl) => {
        // let _this = this;
        this.canvas.fitView()
        stateCtrl.nodes.forEach((node: INode) => {
            let { x, y } = node;
            stateCtrl.updateNodePosition(node.id, x, y)
            node.shapeInstance.updatePosition(x, y)
            // shapeGfx?.position.set(x, y);
        });

        stateCtrl.links.forEach((link: ILink) => {
            // let { source, target } = link;
            // redraw the links 
            link.shapeInstance.redraw()
        });

        this.canvas.screenBorderDraw();

    }

    runLayout = () =>{
        let _this = this;

        const {nodes, links} = this.canvas.stateCtrl;

        const nodesArray = Array.from(nodes.values())
        const linksArray = Array.from(links.values())

        const { centerX, centerY } = this.getCenter() ;
        const simulation = d3.forceSimulation(nodesArray)
            .force("link", d3.forceLink(linksArray) // This force provides links between nodes
                .id((d: ILink) => d.id) // This sets the node id accessor to the specified function.
                // If not specified, will default to the index of a node.
                .distance(200)
            )
            .force("charge", d3.forceManyBody().strength(-500)) // This adds repulsion (if it's negative) between nodes.
            .force("center", d3.forceCenter(centerX, centerY))
            .force("collision", d3.forceCollide().radius((d: INode) => 20).iterations(2))
            .velocityDecay(0.8);

        simulation
            .force('link')
            .links(linksArray);

        simulation.on("tick", () => this.ticked(this.canvas.stateCtrl));
        simulation.on('end', () => { 
            console.log("=Simulation ended"); 
            simulation.stop();
            _this.canvas.fitView();
        });
        return simulation
    }


}

export default ForceLayout;