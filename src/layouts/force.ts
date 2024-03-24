import * as d3 from "d3";
import { INode, ILink } from "../graphCanvas/types";
import StateCtrl from "../state/model";
import Canvas from "../canvas/pixi";



class ForceLayout {


    canvas: Canvas;
    simulation : d3.forceSimulation;

    constructor(canvas: Canvas) {
        this.canvas = canvas
        let _this  = this;
        const { centerX, centerY } = this.getCenter();
        this.simulation = d3.forceSimulation(this.canvas.stateCtrl.getNodes())
            .force("link", d3.forceLink(this.canvas.stateCtrl.getLinks()) // This force provides links between nodes
                .id((link: ILink) => link.id) // This sets the node id accessor to the specified function.
                // If not specified, will default to the index of a node.
                .distance((link:ILink)=> 250).strength(1)
            )
            .force("charge", d3.forceManyBody().strength(-40)) // This adds repulsion (if it's negative) between nodes.
            .force("center", d3.forceCenter(centerX, centerY))
            .force("collision", d3.forceCollide().radius((d: INode) => d.size + 20).iterations(2))
            // .velocityDecay(0.4)
            .tick(200);

        this.simulation
            .force('link')
            .links(this.canvas.stateCtrl.getLinks());
                 
        this.simulation.on("tick", this.ticked.bind(this));
        this.simulation.on('end', () => {
            console.log("=Simulation ended");
            _this.simulation.stop();
            _this.ticked();
            _this.canvas.fitView();
        });
    }

    getCenter = () => {
        const { worldWidth, worldHeight } = this.canvas.canvasOptions
        return { centerX: worldWidth / 2, centerY: worldHeight / 2 }
    }

    ticked = () => {
        // let _this = this;
        // console.log
        this.canvas.fitView();
        this.canvas.renderer.tick()
    }

    reDoLayout = () => {
        this.simulation.alpha(0.1).restart();
    }

    add2Layout(nodes: INode[], links: ILink[]){
     
        // Update the simulation links with new data
        this.simulation.nodes(this.simulation.nodes().concat(nodes));
        this.simulation.force("link").links(links);
 
        // const selectedNodes = this.canvas.stateCtrl.getNodes();
        
        // const { center, } = this.canvas.getCenter(selectedNodes)
        // this.simulation.force("center", d3.forceCenter(center.x, center.y))


        // this.simulation.nodes().push(nodes);
        // this.simulation.force("link").links().push(links);

        this.reDoLayout(); // Experimental
    }

    // runLayout = () => {
    //     let _this = this;

    //     const { nodes, links } = this.canvas.stateCtrl;

    //     const nodesArray = Array.from(nodes.values())
    //     const linksArray = Array.from(links.values())
        



    //     return this.simulation
    // }


}

export default ForceLayout;