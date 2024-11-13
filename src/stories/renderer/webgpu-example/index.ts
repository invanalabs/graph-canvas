import { Renderer, IRendererOptions } from "../../.."
import * as PIXI from "pixi.js";

export default () => {
  const options: IRendererOptions = {
    preference: "webgpu",
    viewElement: document.getElementById("invana-container") as HTMLCanvasElement
  }
  console.log("===story options", options)
  const renderer = new Renderer(options);
  renderer.init().then(() => {
    console.log("Renderer initialized");

    // const
    // Create a graphics object
    const circle = new PIXI.Graphics();
    // Draw the circle
    circle.beginFill(0xff0000); // Red color
    circle.drawCircle(100, 100, 50); // x, y, radius
    circle.endFill();

    renderer.viewport.addChild(circle);
  });

  return () => {
    renderer.destroy();
  };
};