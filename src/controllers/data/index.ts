import { ILink, INode } from "../../canvas/types";


export default class DataCtrl {

    nodes: INode[];
    links: ILink[];

    constructor(nodes: INode[], links: ILink[] ){
        this.links = links;
        this.nodes = nodes;
    }

    addData = (nodes: INode[], links: ILink[]) => {
        // make this upsert
        this.nodes = nodes;
        this.links = links;
    }

    updateNodePosition(node: INode, x: number, y: number){
        // console.log("Updating position of node ", node.id, this.nodes)
        this.nodes.map((n: INode)=>{
            // console.log("====n.id", n.id)
            if (node.id == n.id){
                // console.log("==*******8", node.id)
                node.x = x;
                node.y = y;
                node.shapeGfx?.position.set(x, y);          
            }
            return node
        })

    }

}