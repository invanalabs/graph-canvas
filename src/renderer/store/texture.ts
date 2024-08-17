import { Texture } from "pixi.js"
import {  IIconStyle, INodeStyle, IShapeState } from "../types";
import drawCircleShape, { DrawCirclePrimitiveType } from "../primitives/nodes/circle";
import { ArtBoard } from "../../artBoard";
import drawIconShape from "../primitives/icon";
import drawImageShape from "../primitives/image";


class INodeStateTexture {
  // default
  declare label?: Texture;
  declare shape: Texture;
}



export interface INodeStateshapeTexturesMap {
  // a single group can have multiple textures, depending on 
  // the node size requirement - centrality / default
  // color by property.value or other
  group: string // used for generating color profile
  unique_key: string // group+size or group+property.fieldValue
  states: {
    [key in IShapeState]: INodeStateTexture
  }
}


export default class TextureStore {
  /*
      this will create textures for each node shape type
  */
  // use unique_key field of INodeStateshapeTexturesMap as the key
  shapeTexturesMap: Map<string, INodeStateshapeTexturesMap>  // string is `unique_key` which is `group+size`
  iconTexturesMap: Map<string, Texture>
  imagePromiseMap: Map<string, Promise<Texture>>
  
  artBoard: ArtBoard

  constructor(artBoard: ArtBoard) {
    this.artBoard = artBoard
    this.shapeTexturesMap = new Map()
    this.iconTexturesMap = new Map()
    this.imagePromiseMap = new Map()
  }


  createImagePromise = (imageUrl: string) => {
    const resolution = imageUrl.endsWith('.svg') ? this.artBoard.canvas.options.resolution?.svgImages :this.artBoard.canvas.options.resolution?.images 
    return drawImageShape(imageUrl, resolution)
  }


  createIconTexture = (props: IIconStyle) => {
    const resolution = this.artBoard.canvas.options.resolution?.icons;
    const iconText = drawIconShape(props, resolution)
    return this.artBoard.pixiApp.renderer.generateTexture({ target:iconText, resolution: resolution, antialias: true });
  }

  createNodeShapeTexture = (props: DrawCirclePrimitiveType) => {
    const shapeGfx = drawCircleShape(props);
    const resolution = this.artBoard.canvas.options.resolution?.nodes;
    return this.artBoard.pixiApp.renderer.generateTexture({ target: shapeGfx, resolution: resolution, antialias: true });
  }

  // createLabelTexture = (props : LabelPrimitiveType) => {
  //     const labelGfx = drawLabelShape(props);
  //     return this.canvas.pixiApp.renderer.generateTexture(labelGfx);
  // }

  createNodeTexture = (props: { size: number, group: string, style: INodeStyle }) => {
    const unique_key = `${props.group}-${props.size}`
    const defaultStyle = props.style;
    // default textures
    // default - shape
    const defaultStateStyle: INodeStateTexture = {
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
    // const hoveredStyle = props.style?.states[':hovered'];

    // const hoveredStateStyle: INodeStateTexture = {
    //   shape: this.createNodeShapeTexture({
    //     size: props.style.size + hoveredPadding,
    //     background: hoveredStyle.shape.background,
    //     border: hoveredStyle.shape.border
    //   })
    // }

    // selected textures
    // highlighted - shape
    const highlightedPadding = hoveredPadding + 4;
    const highlightedStyle = props.style?.states[':highlighted'];

    const highlightedStateStyle: INodeStateTexture = {
      shape: this.createNodeShapeTexture({
        size: props.style.size + props.style?.shape.border.thickness + highlightedPadding,
        background: highlightedStyle.shape.background,
        border: highlightedStyle.shape.border
      })
    }

    const selectedPadding = hoveredPadding + 12;
    const selectedStyle = props.style?.states[':selected'];
     // selected - shape
     const selectedStateStyle: INodeStateTexture = {
       shape: this.createNodeShapeTexture({
         size: props.style.size + props.style?.shape.border.thickness + selectedPadding,
         background: selectedStyle.shape.background,
         border: selectedStyle.shape.border
       })
     }

    const nodeStyleTexture: INodeStateshapeTexturesMap = {
      unique_key: unique_key,
      group: props.group,
      states: {
        ":default": defaultStateStyle,
        // ":hovered": hoveredStateStyle,
        ":highlighted": highlightedStateStyle,
        ':selected': selectedStateStyle,

        // fix :inactive and :hidden later
        ":inactive": highlightedStateStyle,
        // ":hidden": highlightedStateStyle
      }
    }

    this.shapeTexturesMap.set(unique_key, nodeStyleTexture)
    return nodeStyleTexture;
  }

  getOrCreateShapeTexture(props: { size: number, group: string, style: INodeStyle }) {
    const unique_key = `${props.group}-${props.size}`;
    if (this.shapeTexturesMap.has(unique_key)) {
      return { texture: this.shapeTexturesMap.get(unique_key), isCreated: false }
    } else {
      return { texture: this.createNodeTexture(props), isCreated: true }
    }
  }


  getOrCreateIconTexture(props:   IIconStyle) {
    const unique_key = props.content;
    if (this.iconTexturesMap.has(unique_key)) {
      return { iconTexture: this.iconTexturesMap.get(unique_key), isCreated: false }
    } else {
      return { iconTexture: this.createIconTexture(props), isCreated: true }
    }
  }


  getOrcreateImagePromise(imageUrl: string) {
    // const unique_key = imageUrl;
    if (this.imagePromiseMap.has(imageUrl)) {
      return { imagePromise: this.imagePromiseMap.get(imageUrl), isCreated: false }
    } else {
      return { imagePromise: this.createImagePromise(imageUrl), isCreated: true }
    }
  }
  // createLinkTexture = (linkStyle: ILinkStyle) => {

  // }
}