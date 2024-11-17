import { Renderer, IRendererOptions } from "@/renderer"
import { Circle } from "../../../shapes";


export default () => {
  const options: IRendererOptions = {
    viewElement: document.getElementById("invana-container") as HTMLCanvasElement
  }

  const renderer = new Renderer(options);
  renderer.init().then(() => {
    console.log("Renderer initialized");

    // with default styling
    const shape = new Circle();
    shape.setPosition(100, 100)
    renderer.addGfx(shape);

    // with border
    const shapeWithBorder = new Circle({ fill: { color: "red" }, border: { width: 10 } });
    shapeWithBorder.setPosition(300, 100)
    renderer.addGfx(shapeWithBorder);

  });

  return () => {
    renderer.destroy();
  };
};