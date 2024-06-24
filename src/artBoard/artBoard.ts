import { ArtBoardBase } from "./base";
import { Camera } from "./camera";
import { GraphCanvas } from "../canvas";
import { Renderer } from "../renderer/renderer";
import { CanvasLink, LinkEventData, NodeEventData } from "../store";


export class ArtBoard extends ArtBoardBase {

  renderer: Renderer
  camera: Camera

  constructor(canvas: GraphCanvas) {
    super(canvas)
    this.canvas = canvas
    this.renderer = new Renderer(this)
    this.camera = new Camera(this)
    this.setUpRenderOnEventListers()
  }

  setUpRenderOnEventListers() {

    this.canvas.dataStore.on('nodeAdded', ({ id, node }: NodeEventData) => {
      console.log("nodeAdded", id, node);
      this.renderer.renderNode(node)
    });

    this.canvas.dataStore.on('nodeUpdated:position', ({ id, node }: NodeEventData) => {
        console.log("nodeUpdated:position updatedto", id, node.x, node.y);
        // if (node.gfxInstance){
          //@ts-ignore
          node.gfxInstance.setPosition(node.x, node.y);

          node.links.forEach((link: CanvasLink) => {
            link.gfxInstance?.redraw();
          })
        // }
    });

    // add linkAdded event listener
    this.canvas.dataStore.on('linkAdded', ({ id, link }: LinkEventData) => {
      console.log("linkAdded", id, link);
      this.renderer.renderLink(link);
    });

    // add nodeDeleted event listener
    this.canvas.dataStore.on('nodeDeleted', ({ id, node }: NodeEventData) => {
      console.log("nodeDeleted", id, node);
    });

    // add linkDeleted event listener
    this.canvas.dataStore.on('linkDeleted', ({ id, link }: LinkEventData) => {
      console.log("linkDeleted", id, link);
    });

    // add linkDeleted event listener
    this.canvas.dataStore.on('nodeUpdated:links', ({ id, node }: NodeEventData) => {
      console.log("nodeUpdated:links", id, node);
    });

  }

  draw() {
    this.renderer.renderAll()
  }

  clear() {
    this.renderer.clear()
  }

}