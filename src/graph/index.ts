import { CanvasLink, CanvasNode, IdString } from "../graphics/types";
import { deepMerge } from "../utils/merge";
import GraphCanvas from "../canvas/canvas";
import { NodeStyleDefaults } from "../graphics/defaults";
import { NodeStyleMapType, NodeStyleType } from "../canvas/types";
import stc from "string-to-color";


export default class GraphData {

    nodes: Map<IdString, CanvasNode>
    links: Map<IdString, CanvasLink>
    canvas: GraphCanvas

    constructor(canvas: GraphCanvas) {
        this.canvas = canvas
        this.nodes = new Map()
        this.links = new Map()
    }

    generateNodeStyle(node: CanvasNode, nodeStyleFromCanvasOptions: NodeStyleMapType) {
        let style: NodeStyleType;

        console.log("====this.canvas.options.extraSettings.nodeColorBasedOn", this.canvas.options.extraSettings.nodeColorBasedOn)
        // P3 - color by group
        if (this.canvas.options.extraSettings.nodeColorBasedOn === "group") {
            style = deepMerge(NodeStyleDefaults, { shape: { background: { color: stc(node.group) } } })
            console.log("====nodeColorBasedOn", style)
        } else {
            style = NodeStyleDefaults
        }

        // P2 - style defined in the nodeStyleFromCanvasOptions ie., use defined in canvasOptions 
        style = deepMerge(style, nodeStyleFromCanvasOptions[node.group] || {})

        // P1 - this has the highest priority, 
        style = deepMerge(style, node?.style || {});


        if (this.canvas.options.extraSettings.nodeSizeBasedOn === "degree") {
            const nodeSize = this.getNodeSizeBasedOnDegree(node, style);
            console.log("nodeSize", nodeSize);
            style = deepMerge(style, { size: nodeSize })
        }

        return style
    }

    private getNodeSizeBasedOnDegree(node: CanvasNode, style: NodeStyleType) {
        if (node.degree.total === 1) {
            return style?.size;
        }

        const size = style?.size + (node.degree.total * 0.02)
        // if (size > style.size * 2){
        //     return style.size * 2
        // }
        return size

    }

    add(nodes: Array<CanvasNode>, links: Array<CanvasLink>) {
        const _this = this;
        console.log("adding nodes and links", this.nodes, this.links)

        const nodeStyleFromCanvasOptions = _this.canvas.options?.styles?.nodes || {}
        const linkStyles = _this.canvas.options?.styles?.links || {}

        console.log("=====nodeStyleFromCanvasOptions", JSON.stringify(nodeStyleFromCanvasOptions))
        nodes.forEach(node => {
            if (_this.nodes.get(node.id)) {
                throw new Error(`${node.id} already found in the nodes`)
            }
            _this.nodes.set(node.id, node)
        })

        links.forEach(link => {
            if (typeof link.source !== 'object') {
                const sourceNode = this.nodes.get(link.source)
                console.log("====sourceNode", sourceNode)
                if (sourceNode) {
                    link.source = sourceNode
                } else {
                    throw Error(`${link.source} not found in nodes: ${this.nodes} `)
                }
            }
            if (typeof link.target !== 'object') {
                const targetNode = this.nodes.get(link.target);
                console.log("====targetNode", targetNode)
                if (targetNode) {
                    link.target = targetNode
                } else {
                    throw Error(`${link.target} not found in node: ${this.nodes} `)
                }
            }
            if (linkStyles[link.group]) {
                link.style = deepMerge(linkStyles[link.group], link?.style | {})
            }
            _this.links.set(link.id, link)
        })

        let nodesToRender: Array<CanvasNode> = [];
        let linksToRender: Array<CanvasLink> = [];


        let nodeIds: Array<string> = []
        if (links.length > 0){
            nodeIds = [...new Set(links.map(link => [link.source.id, link.target.id]).flat(2))]
        }else{
            nodeIds =  nodes.map(node => node.id)
        }

        console.log("====113nodeIds, ", nodeIds)


        console.log("===nodeIds", nodeIds)
        nodeIds.forEach(nodeId => {
            let node = _this.nodes.get(nodeId)
            node.degree = _this.calcDegree(node.id)
            node.style = this.generateNodeStyle(node, nodeStyleFromCanvasOptions);
            console.log("====node.style", node)

            // create texture 
            _this.canvas.textureManager.getOrCreateTexture({ size: node.style?.size, group: node.group, style: node.style })
            _this.nodes.set(node.id, node)
            nodesToRender.push(node);
        })
        console.log("======nodesToRender", nodesToRender)

        nodesToRender = this.getNodesByIds(nodesToRender.map(node => node.id))
        linksToRender = this.getLinksByIds(links.map(link => link.id))
 
        // console.log("new Links", JSON.stringify(newLinks) )
        this.canvas.renderer.render(nodesToRender, linksToRender)
    }

    calcDegree(nodeId: IdString) {
        let incoming: number = 0;
        let outgoing: number = 0;
        this.links.forEach((link) => {
            if (link.source.id === nodeId) {
                outgoing++
            }
            if (link.target.id === nodeId) {
                incoming++
            }
        })
        return { incoming, outgoing, total: incoming + outgoing }
    }

    update(nodes: Array<CanvasNode>, links: Array<CanvasLink>) {

    }

    delete(nodes: Array<IdString>, links: Array<IdString>) {

    }

    moveNodeTo(nodeId: IdString, x: number, y: number) {
        console.debug("Updating position of node ", nodeId, x, y)
        let node: CanvasNode | undefined = this.nodes.get(nodeId);
        if (node) {
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

    getNodes(): CanvasNode[] {
        return Array.from(this.nodes.values())
    }

    getLinks(): CanvasLink[] {
        return Array.from(this.links.values())
    }

    getNeighborLinks(node: CanvasNode): CanvasLink[] {
        // return this.getLinks().filter(link => link.source.id === node.id || link.target.id === node.id);
        const {links} = this.getNeighbors(node);
        return links
    }

    getNeighbors(node: CanvasNode): { nodes: CanvasNode[], links: CanvasLink[] } {


        let neighborLinks: CanvasLink[] = [];

        const relatedNodes: Map<IdString, CanvasNode> = new Map();
        this.getLinks().forEach(link => {
            if (link.source.id === node.id || link.target.id === node.id){
                neighborLinks.push(link);

                relatedNodes.set(link.source.id, link.source);
                relatedNodes.set(link.target.id, link.target);
            }
            
        });



        // const links = this.getNeighborLinks(node);
        // links.forEach((link: CanvasLink) => {

        // })
        // console.log("==relatedNodes", relatedNodes, relatedNodes.values())
        const _: { nodes: CanvasNode[], links: CanvasLink[] } = { nodes: Array.from(relatedNodes.values()), links: neighborLinks };
        console.log("====getNeighbors", _)
        return _
    }

}