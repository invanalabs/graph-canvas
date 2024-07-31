import { GraphCanvas } from "../canvas";
import { CanvasLink, CanvasNode, ICanvasLink, ICanvasNode } from "../store";
import { LayoutComputerAbstract } from "./base";


export class NoLayoutComputer implements LayoutComputerAbstract {

  canvas: GraphCanvas;

  constructor(canvas: GraphCanvas) {
      this.canvas = canvas
  }
 
  onLayoutComputationEnded(){
    this.onTick()
  }

  computeLayout(nodes: CanvasNode[], links: CanvasLink[]){
    console.log("Ignoring reComputeLayout because this is NoLayoutComputer")
    nodes.forEach((node: CanvasNode) => {
      this.canvas.artBoard.renderer.renderNode(node)
    })
    links.forEach((link: CanvasLink) => {
      this.canvas.artBoard.renderer.renderLink(link)
      // this.onLayoutComputationEnded()
    })
    this.onLayoutComputationEnded()

  }

  reComputeLayout(){
    console.log("Ignoring reComputeLayout because this is NoLayoutComputer")
    this.onLayoutComputationEnded()
  }
  
  moveNode(){
    console.error("moveNode not implemented")
  }

  onTick(){
    this.canvas.artBoard.renderer.tick()
  }

}


