import { CanvasLink, CanvasNode, IdString } from "../graphics/types";
import { deepMerge } from "../utils/merge";
import GraphCanvas from "../canvas/canvas";


export default class GraphData {
    
    nodes: Map<IdString, CanvasNode>
    links: Map<IdString, CanvasLink>
    canvas: GraphCanvas

    constructor(canvas: GraphCanvas) {
        this.canvas = canvas
        this.nodes = new Map()
        this.links = new Map()
    }

    add(nodes: Array<CanvasNode>, links: Array<CanvasLink>) {
        const _this = this; 
        console.log("adding nodes and links", this.nodes, this.links)
        
        const nodeStyles = _this.canvas.options?.styles?.nodes || {}
        const linkStyles = _this.canvas.options?.styles?.links || {}

        console.log("=====nodeStyles", JSON.stringify(nodeStyles))
        nodes.forEach(node=> {
            if (_this.nodes.get(node.id)){
                throw new Error(`${node.id} already found in the nodes`)
            }

            if (nodeStyles[node.group]){
                node.style = deepMerge(nodeStyles[node.group], node?.style | {})
            }
            console.log("=====node=====", JSON.stringify(node))
            _this.nodes.set(node.id, node)
        })

        links.forEach(link=>{
            if (typeof link.source !== 'object'){
                const sourceNode = this.nodes.get(link.source) 
                console.log("====sourceNode", sourceNode)
                if (sourceNode){
                    link.source = sourceNode
                }else{
                    throw Error(`${link.source} not found in nodes: ${this.nodes} `)
                }
            }
            if (typeof link.target !== 'object'){
                const targetNode = this.nodes.get(link.target);
                console.log("====targetNode", targetNode)
                if (targetNode){
                    link.target = targetNode
                }else{
                    throw Error(`${link.target} not found in node: ${this.nodes} `)
                }
            }
            if (linkStyles[link.group]){
                link.style = deepMerge(linkStyles[link.group], link?.style | {})
            }
            _this.links.set(link.id, link)
        })

        const newNodes = this.getNodesByIds(nodes.map(node => node.id))
        const newLinks = this.getLinksByIds(links.map(link => link.id))
        // console.log("new Links", JSON.stringify(newLinks) )
        this.canvas.renderer.render(newNodes, newLinks)
    }


    update(nodes: Array<CanvasNode>, links: Array<CanvasLink>) {

    }

    delete(nodes: Array<IdString>, links: Array<IdString>) {

    }

    updateNodePosition(nodeId: IdString, x: number, y: number){
        console.debug("Updating position of node ", nodeId, x, y)     
        let node: CanvasNode | undefined = this.nodes.get(nodeId);
        if (node){
            node.x = x;
            node.y = y;
            node.gfxInstance?.setGfxPosition(x, y);    
            // node.gfxInstance?.updatePosition(x, y)    
            this.nodes.set(nodeId, node)            
        }
    }

    getNodesByIds(nodeIds: IdString[]) {
        return this.getNodes().filter(node => nodeIds.includes(node.id));
    }

    getLinksByIds(linkIds: IdString[]) {
        return this.getLinks().filter(link => linkIds.includes(link.id));
    }
    
    getNodes(): CanvasNode[]{
        return Array.from(this.nodes.values())
    }

    getLinks(): CanvasLink[]{
        return Array.from(this.links.values())
    }

    getNeighborLinks(node:CanvasNode): CanvasLink[] {
        return this.getLinks().filter(link => link.source.id === node.id || link.target.id  === node.id );
    }

    getNeighbors(node: CanvasNode): {nodes: CanvasNode[], links: CanvasLink[]} {
        const links = this.getNeighborLinks(node);
        const relatedNodes: Map<IdString, CanvasNode> = new Map();
        links.forEach((link: CanvasLink)=> {
            relatedNodes.set(link.source.id, link.source);
            relatedNodes.set(link.target.id, link.target);
        })
        console.log("==relatedNodes", relatedNodes, relatedNodes.values())
        const _: {nodes: CanvasNode[], links: CanvasLink[]} =  {nodes: Array.from(relatedNodes.values()), links};
        console.log("====getNeighbors", _)
        return _
    }

}