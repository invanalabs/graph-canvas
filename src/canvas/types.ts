

export type StringOrNumber = String | Number;

export type RendererType = 'webgpu' | 'webgl' 

export interface ShapesIndex {
    [key: string]: string | number | object;
}

export interface ScreenOptions {
    width: number
    height: number
}

export type BorderType = 'solid' | 'dotted'; 


/* node and link styles started */
 
export interface ShapeBackgroundType {
    color: string | number
    opacity: number
}

export interface ShapeBorderType {
    thickness: number
    color: string | number
    type: BorderType
}

export interface ShapeFontType {
    family : string
    size: number
}

export interface TextType {
    color: string | number
    font : ShapeFontType
}

export interface IconType extends TextType {
    content: string | number
}

export interface ShapeLabelType {
    background: ShapeBackgroundType
    padding : number
    border: ShapeBorderType
    text: TextType
}



export interface NodeShapeType {
    background: ShapeBackgroundType
    border: ShapeBorderType
    icon: IconType
}
export interface LinkShapeType {
    opacity: number
    thickness: number
    color: string | number

}


export interface NodeStyleType {
    size: number
    shape: NodeShapeType
    label: ShapeLabelType
    states: {
        [key in  ':hovered' | ':selected' | ':inactive'] : NodeStyleType
    }
}

export interface LinkStyleType {
    shape: LinkShapeType
    label: ShapeLabelType
    states: {
        [key in  ':hovered' | ':selected' | ':inactive'] : LinkStyleType
    }
}

/* node and link styles ended */

export interface NodeStyleMapType {
    [key: string]: NodeStyleType
}

export interface LinkStyleMapType {
    [key: string]: LinkStyleType
}

export interface GraphicsStyles {
    nodes: NodeStyleMapType
    links: LinkStyleMapType
}

export interface CanvasOptions {
    viewDiv: HTMLCanvasElement | HTMLDivElement
    // screen: ScreenOptions
    background?: string | number // use hex instead of number
    renderer?: RendererType // RendereTypes.keys()
    resolution?: number
    styles?: GraphicsStyles
}