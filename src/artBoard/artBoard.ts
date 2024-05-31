import { ArtBoardBase } from "./base";
import { Camera } from "./camera";
import { GraphCanvas } from "../canvas";
import { Renderer } from "./renderer";


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
  }

  draw() {
    this.renderer.renderAll()
  }

  clear() {
    this.renderer.clear()
  }

}