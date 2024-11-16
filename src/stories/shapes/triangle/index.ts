import { Renderer, IRendererOptions } from "../../.."
import { Triangle } from "../../../graphics";


export default () => {
  const options: IRendererOptions = {
    viewElement: document.getElementById("invana-container") as HTMLCanvasElement
  }

  const renderer = new Renderer(options);
  renderer.init().then(() => {
    console.log("Renderer initialized");

    // with default styling
    const shape = new Triangle();
    shape.x = 100
    shape.y = 100;
    renderer.addGfx(shape);

    // with border
    const shapeWithBorder = new Triangle({ border: { width: 10 } });
    shapeWithBorder.x = 500
    shapeWithBorder.y = 100;
    renderer.addGfx(shapeWithBorder);

  });

  return () => {
    renderer.destroy();
  };
};