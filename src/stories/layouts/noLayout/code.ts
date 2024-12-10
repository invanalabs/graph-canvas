import FlowCanvas from "../../../app/app";
import { CanvasNode } from "../../../core/types";


const initialNodes: CanvasNode[] = [
    {id: '1', data: {}, type: 'card', position: { x: -100, y: -100 }},
    { id: '2', data: {}, type: 'card', position: { x: 0, y: 0 }},
    { id: '3', data: {}, type: 'card', position: { x: 100, y: 100 }}

]

const fc = FlowCanvas({
    initialNodes
})

export default fc
