import { Renderer, IRendererOptions } from "../../.."
import { Rectangle } from "../../../shapes";


export default () => {
  const options: IRendererOptions = {
    viewElement: document.getElementById("invana-container") as HTMLCanvasElement
  }

  const renderer = new Renderer(options);
  renderer.init().then(() => {
    console.log("Renderer initialized");

    // with default styling
    const shape = new Rectangle();
    shape.x = 100
    shape.y = 100;
    renderer.addGfx(shape);

    // with border
    const shapeWithBorder = new Rectangle({ border: { width: 10 } });
    shapeWithBorder.x = 500
    shapeWithBorder.y = 100;
    renderer.addGfx(shapeWithBorder);

  });

  return () => {
    renderer.destroy();
  };
};