import { ILink, INode } from "../graphCanvas/types";


export default class StateCtrl {

    // canvas: Canvas;
    nodes: Map<string, INode>;
    links: Map<string, ILink>
    // selectedItems: INode[] | ILink[] ; 


    constructor(){
        // this.canvas = canvas
        this.links = new Map();
        this.nodes = new Map();
    }

    clearAll() {
        this.links = new Map();
        this.nodes = new Map();
    }

    getNodes(): INode[]{
        return Array.from(this.nodes.values())
    }

    getLinks(): ILink[]{
        return Array.from(this.links.values())
    }

    getNeighborLinks(node:INode){
        return this.getLinks().filter(link => link.source.id === node.id || link.target.id  === node.id );

    }

    isINode(obj: INode | string | number) {
        return typeof obj === 'object' && obj !== null && 'id' in obj && 'type' in obj;
    }

    addData = (nodes: INode[], links: ILink[]) => {
        //TODO -make this upsert
        for (const node of nodes){
            console.log("==node====", node);
            if (! this.nodes.has(node.id)){
                this.nodes.set(node.id, node);
            }
        }

        for (const link of links){
            console.log("==link====", link);
            if (! this.links.has(link.id)){
                this.links.set(link.id, link);
            }
            // if (!this.isINode(link.source)) {
            //     // link.source does not adhere to the INode interface
            //     // Your code here
            //     link.source = this.nodes.get(link.source)
            // }
        }
        // this.nodes = nodes;
        // this.links = links;

    }

    updateNodePosition(nodeId: string, x: number, y: number){
        // console.log("Updating position of node ", node.id, this.nodes)

     
        let node: INode | undefined = this.nodes.get(nodeId);
        if (node){
            node.x = x;
            node.y = y;
            node.shapeGfx?.position.set(x, y);    
            this.nodes.set(nodeId, node)
        }
  

        // this.nodes.map((n: INode)=>{
        //     // console.log("====n.id", n.id)
        //     if (node.id == n.id){
        //         // console.log("==*******8", node.id)
        //         node.x = x;
        //         node.y = y;
        //         node.shapeGfx?.position.set(x, y);          
        //     }
        //     return node
        // })

    }

}