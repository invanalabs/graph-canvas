import { GraphCanvas } from "../canvas";
import { ICanvasLink, ICanvasNode } from "../store";


export abstract class LayoutComputerAbstract {


  canvas: GraphCanvas;

  constructor(canvas: GraphCanvas) {
      this.canvas = canvas
  }

  // abstract getCenter(): {centerX: number, centerY: number}
  abstract onLayoutEnded(): void
  abstract add2Layout(nodes: ICanvasNode[], links: ICanvasLink[]): void
  abstract reDoLayout(): void
  abstract onTick(): void
  
}


