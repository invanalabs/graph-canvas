import * as d3 from "d3";
import { GraphCanvas } from "../../../canvas";
import { ICanvasLink, ICanvasNode } from "../../../store";



class D3ForceLayout {


    canvas: GraphCanvas;
    simulation: d3.forceSimulation;

    constructor(canvas: GraphCanvas) {
        this.canvas = canvas
        this.simulation = this.createLayoutSimulation();
    }

    createLayoutSimulation() {
        const _this = this;

        // Set min and max link lengths
        const minLinkLength = 100;
        const maxLinkLength = 350;



        const { centerX, centerY } = this.getCenter();
        const { worldWidth, worldHeight } = this.canvas.artBoard.getCanvasSizeOptions()
        const nodes = this.canvas.dataStore.getNodes();
        const links = this.canvas.dataStore.getLinks();
        const simulation = d3.forceSimulation(nodes)
            // .force("link",d3.forceLink(links).id((link) => link.id))//.distance((link)=> 250))
            .force("link", d3.forceLink(links).id(d => d.id)
                .distance(d => {
                    const desiredLength = 250;  // Example desired length
                    return Math.max(minLinkLength, Math.min(maxLinkLength, desiredLength))
                }))
            // .force("link", d3.forceLink(links))
            .force("charge", d3.forceManyBody().strength(-100)) // This adds repulsion (if it's negative) between nodes.
            .force("center", d3.forceCenter(centerX, centerY))
            .force("collide", d3.forceCollide().radius((d) => {
                console.log("===collide d", d)
                return d.style.size * 2
            }))//.iterations(1))//
            // .force("x", d3.forceX(worldWidth/2))//.strength(0.1))
            // .force("y", d3.forceY(worldHeight/2))//.strength(0.1))
            // .force("collision", d3.forceCollide((d) => d.size + 15).iterations(2))
            // .velocityDecay(0.4)
            // .stop()
            // .alphaTarget(0.3) // stay hot
            // .velocityDecay(0.1) // low friction
            // .force("x", d3.forceX().strength(0.01))
            // .force("y", d3.forceY().strength(0.01))

            // .force("charge", d3.forceManyBody().strength((d, i) => i ? 0 : -width * 2 / 3))
            // .force("collision", d3.forceCollide().radius((node)=> node.size ))
            .tick(100)
            .on("tick", () => {
                this.canvas.dataStore.updateMessage("Updating layout ...")
            })
            .on('end', this.onSimulationEnded.bind(this))
        return simulation
    }

    getCenter = () => {
        const { worldWidth, worldHeight } = this.canvas.artBoard.getCanvasSizeOptions();
        return { centerX: worldWidth / 2, centerY: worldHeight / 2 }
    }

    onSimulationEnded = () => {
        console.log("=Simulation ended");
        this.simulation.stop();
        this.canvas.artBoard.renderer.tick()
    }

    reDoLayout = () => {
        // this.simulation.alpha(0.1).restart();
        this.simulation.restart();

    }

    add2Layout(nodes: ICanvasNode[], links: ICanvasLink[]) {

        // Update the simulation links with new data
        this.simulation.nodes(this.simulation.nodes().concat(nodes));
        this.simulation.force("link").links(links);

        // const { center, } = this.canvas.getCenter(selectedNodes)
        // this.simulation.force("center", d3.forceCenter(center.x, center.y))


        // this.simulation.nodes().push(nodes);
        // this.simulation.force("link").links().push(links);

        this.reDoLayout(); // Experimental
    }

    // runLayout = () => {
    //     let _this = this;

    //     const { nodes, links } = this.canvas.graph;

    //     const nodesArray = Array.from(nodes.values())
    //     const linksArray = Array.from(links.values())




    //     return this.simulation
    // }


}

export default D3ForceLayout;