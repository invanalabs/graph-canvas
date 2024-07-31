import * as d3 from "d3";
import { GraphCanvas } from "../canvas";
import { CanvasLink, CanvasNode, ICanvasLink, ICanvasNode } from "../store";
import { LayoutComputerAbstract } from "./base";


export default class D3ForceLayoutComputer implements LayoutComputerAbstract{


    canvas: GraphCanvas;
    simulation: d3.Simulation<CanvasNode, undefined>

    constructor(canvas: GraphCanvas) {
        this.canvas = canvas
        this.simulation = this.createLayoutSimulation();
        console.debug("Make sure 'npm install d3-force' is installed")
    }

    createLayoutSimulation() {
        // Set min and max link lengths
        const minLinkLength = 100;
        const maxLinkLength = 450;
        const { centerX, centerY } = this.getCenter();       
        const simulation = d3.forceSimulation(this.canvas.dataStore.getNodes())
        .force("link", d3.forceLink(this.canvas.dataStore.getLinks()).id((d) => d.id)
            .distance(() => {
                const desiredLength = 250;
                return Math.max(minLinkLength, Math.min(maxLinkLength, desiredLength));
            }))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(centerX, centerY))
        .force("collide", d3.forceCollide().radius((d: CanvasNode) => d.style.size * 3))
        .tick(200)
        .on("tick", this.onTick.bind(this))
        .on("end", this.onLayoutComputationEnded.bind(this));



        // const simulation = d3.forceSimulation(nodes)
        //     .force("link", d3.forceLink(links).id((d: CanvasLink) => d.id)
        //         .distance((d: CanvasLink) => {
        //             const desiredLength = 250;  // Example desired length
        //             return Math.max(minLinkLength, Math.min(maxLinkLength, desiredLength))
        //     }))
        //     .force("charge", d3.forceManyBody().strength(-580)) // This adds repulsion (if it's negative) between nodes.
        //     .force("center", d3.forceCenter(centerX, centerY))
        //     .force("collide", d3.forceCollide().radius((d: CanvasNode) => {
        //         return d.style.size * 3
        //     }))//.iterations(1))//
        //     // .force("x", d3.forceX(worldWidth/2))//.strength(0.1))
        //     // .force("y", d3.forceY(worldHeight/2))//.strength(0.1))
        //     // .force("collision", d3.forceCollide((d) => d.size + 15).iterations(2))
        //     // .velocityDecay(0.4)
        //     // .alphaTarget(0.3) // stay hot
        //     // .velocityDecay(0.1) // low friction
        //     // .force("x", d3.forceX().strength(0.01))
        //     // .force("y", d3.forceY().strength(0.01))
        //     // .force("collision", d3.forceCollide().radius((node)=> node.size ))
        //     .tick(500)
        //     .on("tick", () => {
        //         this.canvas.dataStore.updateMessage("Updating layout ...")
        //         // this.canvas.artBoard.renderer.tick()
        //     })
        //     .on('end', this.onLayoutComputationEnded.bind(this))
        return simulation
    }

    getCenter = () => {
        const { worldWidth, worldHeight } = this.canvas.artBoard.getCanvasSizeOptions();
        return { centerX: worldWidth / 2, centerY: worldHeight / 2 }
    }

    onTick = () => {
        this.canvas.dataStore.updateMessage("Updating layout ...");

        // this.canvas.dataStore.getNodes().forEach((node: CanvasNode)=> {
        //     this.canvas.dataStore.moveNodeTo(node.id, node.x, node.y)
        // })
        // this.canvas.artBoard.renderer.tick()
        // this.canvas.artBoard.camera.fitView()    

        // this.onTick()
    }

    onLayoutComputationEnded = () => {
        console.log("=Simulation ended");
        this.simulation.stop();
        this.canvas.dataStore.updateMessage("Updating layout finished.")
        console.log("===this.canvas.artBoard.renderer", this.canvas.artBoard.renderer)
        if (this.canvas.artBoard.renderer){
            this.canvas.artBoard.renderer.tick()
            this.canvas.artBoard.camera.fitView()    
        }
    }

    reComputeLayout = () => {
        this.simulation.alpha(0.1).restart();
    }

    computeLayout(nodes: CanvasNode[], links: CanvasLink[]) {
        // Update the simulation links with new data
        this.simulation.nodes(nodes);
        // this.simulation.nodes().push(nodes);
        this.simulation.force("link").links(links);
        // this.simulation.force("link").links().push(links);
        this.reComputeLayout(); // Experimental
    }
 
}

