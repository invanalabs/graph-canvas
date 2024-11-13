import { Renderer, IRendererOptions } from "../../../"
import * as PIXI from "pixi.js";

export default () => {
  const options: IRendererOptions = {
    viewElement: document.getElementById("invana-container") as HTMLCanvasElement
  }

  const renderer = new Renderer(options);
  renderer.init().then(() => {
    console.log("Renderer initialized");
    // Create a graphics object
    const circle = new PIXI.Graphics();
    circle.circle(100, 100, 10); // x, y, radius
    circle.fill(0xff0000); // Red color

    circle.circle(200, 200, 10); // x, y, radius
    circle.fill(0xff0000); // Red color

    circle.circle(300, 200, 10); // x, y, radius
    circle.fill(0xff0000); // Red color

    renderer.viewport.addChild(circle);
  });

  return () => {
    renderer.destroy();
  };
};