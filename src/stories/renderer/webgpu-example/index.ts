import { Renderer, IRendererOptions } from "../../../"
import * as PIXI from "pixi.js";
import { generateGridPositions } from "../../utils";

export default () => {
  const options: IRendererOptions = {
    viewElement: document.getElementById("invana-container") as HTMLCanvasElement
  }

  const renderer = new Renderer(options);
  renderer.init().then(() => {
    console.log("Renderer initialized");

    const positions = generateGridPositions({ rows: 100, columns: 100, gridSpacing: 50, size: 10 });

    for (const position of positions) {
      const circle = new PIXI.Graphics();
      circle.circle(position.x, position.y, position.size); // x, y, radius
      circle.fill(0xff0000); // Red color
      renderer.addGfx(circle);
    }
  });

  return () => {
    renderer.destroy();
  };
};