import * as d3 from "d3";
import { INode, ILink } from "../canvas/types";



class ForceLayout {
    
    width : number; // layout width
    height : number; // layout height

    constructor(width: number, height: number){
        this.width = width;
        this.height = height;
    }

    getCenter = () => {
        return {centerX: this.width/2, centerY: this.height/2}
    }

    runLayout = (nodes: INode[], links: ILink[]) =>{
        const { centerX, centerY } = this.getCenter() ;
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links) // This force provides links between nodes
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
            .links(links);
        return simulation
    }


}

export default ForceLayout;