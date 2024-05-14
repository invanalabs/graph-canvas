import { Texture } from "pixi.js"
import GraphCanvas from "../canvas/canvas";
import { LinkStyleType, NodeStateTypesList, NodeStyleType } from "../canvas/types";
import drawCircleShape, { DrawCirclePrimitiveType } from "../primitives/circle";
import drawLabelShape, { LabelPrimitiveType } from "../primitives/label";



class NodeStateTexture {

    // default
    declare label?: Texture;
    declare shape: Texture;


    // declare labelTex: Texture
    // declare labelBackground: Texture

    // declare shapeBackground: Texture
    // declare shapeBorder: Texture

}


// interface NodeStateTexturesMap {
//     [key: NodeStateTypesList]: NodeStateTexture
// }


export interface NodeStateTexturesMap {
    // a single group can have multiple textures, depending on 
    // the node size requirement - centrality / default
    // color by property.value or other
    group: string // used for generating color profile
    unique_key: string // group+size or group+property.fieldValue
    states: {
        [key in  NodeStateTypesList] : NodeStateTexture
    }
}


export default class TextureManager {
    /*
        this will create textures for each node shape type
    */
   // use unique_key field of NodeStateTexturesMap as the key
    texturesMap : Map<string, NodeStateTexturesMap>  // string is `unique_key` which is `group+size`
    canvas: GraphCanvas

    constructor(canvas: GraphCanvas){
        this.canvas = canvas
        this.texturesMap = new Map()
    }

    createNodeShapeTexture = (props : DrawCirclePrimitiveType) => {
        const shapeGfx  = drawCircleShape(props);
        // shapeGfx.
        const resolution = this.canvas.options.resolution
        console.log("====resolution", resolution)
        return this.canvas.pixiApp.renderer.generateTexture(shapeGfx, {resolution: resolution});
    }

    // createLabelTexture = (props : LabelPrimitiveType) => {
    //     const labelGfx = drawLabelShape(props);
    //     return this.canvas.pixiApp.renderer.generateTexture(labelGfx);
    // }

    createNodeTexture = (props: {size: number, group: string,  style: NodeStyleType }) => {
        console.log("====createNodeTexture", props);
        // console.log("====this.data", )

        const unique_key = `${props.group}-${props.size}`
        const defaultStyle = props.style;
        console.log("====defaultStyle", defaultStyle)
        let nodeStyleTexture: NodeStateTexturesMap = {
            unique_key: unique_key,
            group: props.group,
            states: {}
        }

        // default textures
        // default - shape
        nodeStyleTexture['states'][':default'] = {}
        nodeStyleTexture['states'][':default']['shape'] = this.createNodeShapeTexture({
            size: defaultStyle.size,
            background: defaultStyle?.shape.background,
            border: defaultStyle?.shape.border
        })
        // default - label
        // nodeStyleTexture['states'][':default']['label']  = this.createLabelTexture({
        //     // label: this.data.label,
        //     ...defaultStyle?.label
        // })
        
        // hovered textures 
        // hovered - shape
        const hoveredPadding = 0;
        const hoveredStyle = props.style?.states[':hovered'];
        nodeStyleTexture['states'][':hovered'] = {}
        nodeStyleTexture['states'][':hovered']['shape'] = this.createNodeShapeTexture({
            size: props.style.size  + hoveredPadding,
            background: hoveredStyle.shape.background,
            border: hoveredStyle.shape.border
        })

        // selected textures
        // selected - shape
        const selectedPadding = hoveredPadding + 2;
        const selectedStyle = props.style?.states[':selected'];
        nodeStyleTexture['states'][':selected'] = {}
        nodeStyleTexture['states'][':selected']['shape'] = this.createNodeShapeTexture({
            size: props.style.size + props.style?.shape.border.thickness + selectedPadding,
            background: selectedStyle.shape.background,
            border: selectedStyle.shape.border
        })

        this.texturesMap.set(unique_key, nodeStyleTexture)
        return nodeStyleTexture;
    }

    getOrCreateTexture(props: {size: number, group: string, style: NodeStyleType}){
        console.log("====getOrCreateTexture", props);
        const unique_key = `${props.group}-${props.size}`;
        if (this.texturesMap.has(unique_key)){
            return {texture: this.texturesMap.get(unique_key), isCreated: false}
        }else{
            return {texture: this.createNodeTexture(props), isCreated: true}
        }
    }

    // createLinkTexture = (linkStyle: LinkStyleType) => {

    // }
}