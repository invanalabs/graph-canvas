import { Renderer, IRendererOptions } from "../../.."
import { Rectangle } from "../../../graphics";


export default () => {
  const options: IRendererOptions = {
    viewElement: document.getElementById("invana-container") as HTMLCanvasElement
  }

  const renderer = new Renderer(options);
  renderer.init().then(() => {
    console.log("Renderer initialized");

    // with default styling
    const circle = new Rectangle();
    circle.x = 100
    circle.y = 100;
    renderer.addGfx(circle);

    // with border
    const circleWithBorder = new Rectangle({ border: { width: 10 } });
    circleWithBorder.x = 500
    circleWithBorder.y = 100;
    renderer.addGfx(circleWithBorder);

  });

  return () => {
    renderer.destroy();
  };
};