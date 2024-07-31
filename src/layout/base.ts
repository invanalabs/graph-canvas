import { GraphCanvas } from "../canvas";
import { ICanvasLink, ICanvasNode } from "../store";


export abstract class LayoutComputerAbstract {

  canvas: GraphCanvas;

  constructor(canvas: GraphCanvas) {
      this.canvas = canvas
  }

  abstract onLayoutComputationEnded(): void
  abstract computeLayout(nodes: ICanvasNode[], links: ICanvasLink[]): void
  abstract reComputeLayout(): void
  abstract moveNode(): void
  abstract onTick(): void
}


