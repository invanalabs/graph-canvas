import { Texture } from "pixi.js"
import { INodeStateTypes, INodeStyle } from "../types";
import drawCircleShape, { DrawCirclePrimitiveType } from "../primitives/lines/circle";
import { ArtBoard } from "../../artBoard";


class INodeStateTexture {
  // default
  declare label?: Texture;
  declare shape: Texture;
}



export interface INodeStateTexturesMap {
  // a single group can have multiple textures, depending on 
  // the node size requirement - centrality / default
  // color by property.value or other
  group: string // used for generating color profile
  unique_key: string // group+size or group+property.fieldValue
  states: {
    [key in INodeStateTypes]: INodeStateTexture
  }
}


export default class TextureStore {
  /*
      this will create textures for each node shape type
  */
  // use unique_key field of INodeStateTexturesMap as the key
  texturesMap: Map<string, INodeStateTexturesMap>  // string is `unique_key` which is `group+size`
  artBoard: ArtBoard

  constructor(artBoard: ArtBoard) {
    this.artBoard = artBoard
    this.texturesMap = new Map()
  }

  createNodeShapeTexture = (props: DrawCirclePrimitiveType) => {
    const shapeGfx = drawCircleShape(props);
    const resolution = this.artBoard.canvas.options.resolution?.nodes;
    console.log("====resolution", resolution)
    return this.artBoard.pixiApp.renderer.generateTexture(shapeGfx, { resolution: resolution });
  }

  // createLabelTexture = (props : LabelPrimitiveType) => {
  //     const labelGfx = drawLabelShape(props);
  //     return this.canvas.pixiApp.renderer.generateTexture(labelGfx);
  // }

  createNodeTexture = (props: { size: number, group: string, style: INodeStyle }) => {
    console.log("====createNodeTexture", props);

    const unique_key = `${props.group}-${props.size}`
    const defaultStyle = props.style;
    console.log("====defaultStyle", defaultStyle)
  

    // default textures
    // default - shape
    let defaultStateStyle: INodeStateTexture = {
      shape: this.createNodeShapeTexture({
        size: defaultStyle.size,
        background: defaultStyle?.shape.background,
        border: defaultStyle?.shape.border
      })
    }
    // default - label
    // nodeStyleTexture['states'][':default']['label']  = this.createLabelTexture({
    //     // label: this.data.label,
    //     ...defaultStyle?.label
    // })

    // hovered textures 
    // hovered - shape
    const hoveredPadding = 0;
    const hoveredStyle = props.style?.states[':hovered'];

    let hoveredStateStyle: INodeStateTexture = {
      shape: this.createNodeShapeTexture({
        size: props.style.size + hoveredPadding,
        background: hoveredStyle.shape.background,
        border: hoveredStyle.shape.border
      })
    }

    // selected textures
    // selected - shape
    const selectedPadding = hoveredPadding + 2;
    const selectedStyle = props.style?.states[':selected'];
    // nodeStyleTexture['states'][':selected'] = {}
    // nodeStyleTexture['states'][':selected'][shape] =

    let selectedStateStyle: INodeStateTexture = {
      shape: this.createNodeShapeTexture({
        size: props.style.size + props.style?.shape.border.thickness + selectedPadding,
        background: selectedStyle.shape.background,
        border: selectedStyle.shape.border
      })
    }

    let nodeStyleTexture: INodeStateTexturesMap = {
      unique_key: unique_key,
      group: props.group,
      states: {
        ":default": defaultStateStyle,
        ":hovered": hoveredStateStyle,
        ":selected": selectedStateStyle,

        // fix :inactive and :hidden later
        ":inactive": selectedStateStyle,
        ":hidden": selectedStateStyle
      }
    }

    this.texturesMap.set(unique_key, nodeStyleTexture)
    return nodeStyleTexture;
  }

  getOrCreateTexture(props: { size: number, group: string, style: INodeStyle }) {
    console.log("====getOrCreateTexture", props);
    const unique_key = `${props.group}-${props.size}`;
    if (this.texturesMap.has(unique_key)) {
      return { texture: this.texturesMap.get(unique_key), isCreated: false }
    } else {
      return { texture: this.createNodeTexture(props), isCreated: true }
    }
  }

  // createLinkTexture = (linkStyle: ILinkStyle) => {

  // }
}