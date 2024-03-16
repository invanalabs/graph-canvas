import { ILink, INode } from "../graphCanvas/types";


export default class StateCtrl {

    // canvas: Canvas;
    nodes: INode[];
    links: ILink[];
    // selectedItems: INode[] | ILink[] ; 


    constructor(nodes: INode[], links: ILink[] ){
        // this.canvas = canvas
        this.links = links;
        this.nodes = nodes;
    }

    addData = (nodes: INode[], links: ILink[]) => {
        //TODO -make this upsert
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