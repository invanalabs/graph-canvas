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

        // const { centerX, centerY } = this.getCenter();
        const nodes = this.canvas.dataStore.getNodes();
        const links = this.canvas.dataStore.getLinks();
        const simulation = d3.forceSimulation(nodes)
            .force("link",d3.forceLink(links).id((link) => link.id)) // .distance((link)=> 250)
            .force("charge", d3.forceManyBody().strength(-700)) // This adds repulsion (if it's negative) between nodes.
            // .force("center", d3.forceCenter(centerX, centerY))
            // .force("center", d3.forceCenter())
            // .force("collision", d3.forceCollide().radius((d) => d.style.size + 15)) ///.iterations(2))
            // .velocityDecay(0.4)
            // .stop()
            .tick(100)


            // .force('link').links(links)

            // .on("tick", this.ticked.bind(this))
            .on('end', () => {
                console.log("=Simulation ended");
                _this.simulation.stop();
                _this.ticked();
                _this.canvas.artBoard.camera.fitView();
                // _this.canvas.pixiApp.renderer.generateTexture

            });
        return simulation
    }

    getCenter = () => {
        const { worldWidth, worldHeight } = this.canvas.artBoard.getCanvasSizeOptions();
        return { centerX: worldWidth / 2, centerY: worldHeight / 2 }
    }

    ticked = () => {
        // let _this = this;
        // console.log
        this.canvas.artBoard.camera.fitView();
        this.canvas.artBoard.renderer.tick()
    }

    reDoLayout = () => {
        this.simulation.alpha(0.1).restart();
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