import { Renderer, IRendererOptions } from "@/renderer"
import { Rectangle } from "../../../shapes"


export default () => {
  const options: IRendererOptions = {
    viewElement: document.getElementById("invana-container") as HTMLCanvasElement
  }

  const renderer = new Renderer(options);
  renderer.init().then(() => {
    console.log("Renderer initialized");

    // with default styling
    const shape = new Rectangle({ fill: { alpha: 0.8 } });
    shape.setPosition(100, 100)
    renderer.addGfx(shape);

    // with border
    const shapeWithBorder = new Rectangle({ fill: { color: "green" }, border: { width: 10 } });
    shapeWithBorder.setPosition(500, 100)
    renderer.addGfx(shapeWithBorder);

  });

  return () => {
    renderer.destroy();
  };
};