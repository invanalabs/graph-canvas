import { ArtBoard } from "../../artBoard"
import { GraphicsLayer, LAYER_GRAPHICS_TYPES_CONSTANTS } from "../graphics/layer"
import { CanvasLink, CanvasNode } from "../../store"


export const LAYER_TYPES_CONSTANTS = {
  FRONT: "FRONT",
  DATA: 'DATA',
  ANNOTATIONS: 'ANNOTATIONS',
  MAP: "MAP"
}

export type ILayerItemTypes =  "NODES" | "LINKS" //| "LINK_SHAPES" | "LINK_LABELS";

// export type ILayerGfxType = 



export class GraphicsStore {

  artBoard: ArtBoard
  // geoLayer: GraphicsLayer
  frontLayer: GraphicsLayer
  dataLayer: GraphicsLayer
  annotationLayer: GraphicsLayer


  constructor(artBoard: ArtBoard) {
    this.artBoard = artBoard

    // create layers

    // z-index from 0
    // this.geoLayer = new GraphicsLayer(this, LAYER_TYPES_CONSTANTS.MAP, 0);

    // z-index from 5
    this.dataLayer = new GraphicsLayer(LAYER_TYPES_CONSTANTS.DATA, 5);
    this.artBoard.viewport.addChild(this.dataLayer.baseLayer);

    // z-index from 10
    this.annotationLayer = new GraphicsLayer(LAYER_TYPES_CONSTANTS.ANNOTATIONS, 10);
    this.artBoard.viewport.addChild(this.annotationLayer.baseLayer);

    // z-index from 15
    this.frontLayer = new GraphicsLayer(LAYER_TYPES_CONSTANTS.FRONT, 15);
    this.artBoard.viewport.addChild(this.frontLayer.baseLayer);
  }

 

  clear() {
    console.log("Cleaning data from CanvasLayers")
    this.dataLayer.clear();
    this.frontLayer.clear()
    this.annotationLayer.clear();
    // this.geoLayer.clear()
  }

  private addGfxToLayer(item: CanvasNode | CanvasLink, gfxType: ILayerItemTypes,  layer: GraphicsLayer){
    if (gfxType === LAYER_GRAPHICS_TYPES_CONSTANTS.NODES){
        // item.layer = layer.nodeGfxLayer.name
        // remove from old, fi applicable
        if (item.gfxInstance){
          layer.addNodeGfx(item.gfxInstance?.containerGfx)
        }
    }
    else if (gfxType === LAYER_GRAPHICS_TYPES_CONSTANTS.LINKS){
        // item.layer = layer.nodeGfxLayer.name
        if (item.gfxInstance){
          layer.addLinkGfx(item.gfxInstance?.containerGfx)
        }
    }
    else{
        console.error(`Failed to add ${item} because gfxType=${gfxType} is not supported`)
    }
}

addGfxToFrontLayer(item: CanvasNode | CanvasLink, gfxType: ILayerItemTypes) {
    console.log("addGfxToFrontLayer triggered", gfxType,  this.dataLayer)
    this.addGfxToLayer(item, gfxType, this.frontLayer)
    // this.canvas.camera.viewport.addChild(gfx)
}

addToDataLayer(item: CanvasNode | CanvasLink, gfxType: ILayerItemTypes) {
    console.log("addToDataLayer triggered", gfxType,  this.dataLayer)
    this.addGfxToLayer(item, gfxType, this.dataLayer)
    // this.canvas.camera.viewport.addChild(gfx)
}

private remoGfxFromLayer(item: CanvasNode | CanvasLink, gfxType: ILayerItemTypes,  layer: GraphicsLayer){
    if (gfxType === LAYER_GRAPHICS_TYPES_CONSTANTS.NODES){
        // item.layer = null
        if (item.gfxInstance){
            layer.removeNodeGfx(item.gfxInstance?.containerGfx)
        }
    }
    else if (gfxType === LAYER_GRAPHICS_TYPES_CONSTANTS.LINKS){
        // item.layer = null
        if (item.gfxInstance){
            layer.removeLinkGfx(item.gfxInstance?.containerGfx)
        }
    }
    else{
        console.error(`Failed to add ${item} because gfxType=${gfxType} is not supported`)
    }
}


removeGfxFromFrontLayer(item: CanvasNode | CanvasLink,  gfxType: ILayerItemTypes){
    this.remoGfxFromLayer(item, gfxType, this.frontLayer)
}

removeGfxFromDataLayer(item: CanvasNode | CanvasLink,  gfxType: ILayerItemTypes){
    this.remoGfxFromLayer(item, gfxType, this.dataLayer)
}

moveGfxToFrontLayer(item: CanvasNode | CanvasLink,  gfxType: ILayerItemTypes){
    // remove from existing layer
    if (item.layer === LAYER_TYPES_CONSTANTS.DATA){
        this.removeGfxFromDataLayer(item, gfxType)
    }
    else if (item.layer === LAYER_TYPES_CONSTANTS.FRONT){
        console.error("Failed to move the gfx to frontLayer, its already in frontLayer");
    }
    // add to new layer 
    this.addGfxToLayer(item, gfxType, this.frontLayer)

    // if (gfxType === LAYER_GRAPHICS_TYPES_CONSTANTS.NODES || gfxType === LAYER_GRAPHICS_TYPES_CONSTANTS.LINKS){
    //     console.error(`Failed to move ${item} because gfxType=${gfxType} is not supported`)
    // }
}

moveGfxToDataLayer(item: CanvasNode | CanvasLink, gfxType: ILayerItemTypes,){
    // remove from existing layer
    if (item.layer === LAYER_TYPES_CONSTANTS.FRONT){
        this.removeGfxFromFrontLayer(item, gfxType)
    }
    else if (item.layer === LAYER_TYPES_CONSTANTS.DATA){
        console.error("Failed to move the gfx to dataLayer, its already in dataLayer");
    }
    // add to new layer 
    this.addGfxToLayer(item, gfxType, this.dataLayer)

    // if (gfxType === LAYER_GRAPHICS_TYPES_CONSTANTS.NODES || gfxType === LAYER_GRAPHICS_TYPES_CONSTANTS.LINKS){
    //     console.error(`Failed to move ${item} because gfxType=${gfxType} is not supported`)
    // }
}

// moveGfxToAnnotationLayer(gfx: Graphics){
    
// }

// addGfxToAnnotationLayer(gfx: Graphics) {

// }


// removeGfxToAnnotationLayer(gfx: Graphics){

// }

}