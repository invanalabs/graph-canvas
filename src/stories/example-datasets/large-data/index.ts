import { ICanvasLink, ICanvasNode } from "../../../store"
import rawData from "./largeData.json"


const largeData = {
    nodes: rawData.nodes.map(node=>{
        const nodeCleaned: ICanvasNode = {
            id: node.id,
            label: node.id.toString(),
            group: 'DemoNode',
            
            x: node.x,
            y: node.y,
            // size: 10
        }
        return nodeCleaned

    }), 
    links: rawData.links.map(link=>{
        const linkCleaned : ICanvasLink = {
            id: `${link.source.id}-${link.target.id}`,
            group: 'test-link',
            source: link.source.id,
            target: link.target.id,
            shapeName: 'straightLine'

        }
        return linkCleaned
    })}

export default largeData;