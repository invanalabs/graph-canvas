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



// export default class LayoutComputerBase implements LayoutComputerAbstract {

//   canvas: GraphCanvas;

//   constructor(canvas: GraphCanvas) {
//     this.canvas = canvas
//   }



//   onLayoutComputationEnded = () => {
//     console.log("=Simulation ended");
//     this.simulation.stop();
//     this.canvas.dataStore.updateMessage("Updating layout finished.")
//     this.canvas.artBoard.renderer.tick()
//     this.canvas.artBoard.camera.fitView()
// }

// }
