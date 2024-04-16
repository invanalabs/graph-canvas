import { ShapeTemplate, NodeBackground } from "./templates.utils"


export interface NodeTemplate extends ShapeTemplate {
    size: number
    background: NodeBackground
}

export interface LinkTemplate extends ShapeTemplate {
    thickness: number
}