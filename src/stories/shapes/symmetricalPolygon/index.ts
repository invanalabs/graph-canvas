import { Renderer, IRendererOptions } from "../../.."
import { SymmetricalPolygon } from "../../../graphics";


export default () => {
  const options: IRendererOptions = {
    viewElement: document.getElementById("invana-container") as HTMLCanvasElement
  }

  const renderer = new Renderer(options);
  renderer.init().then(() => {
    console.log("Renderer initialized");

    // draw triangle
    const shape = new SymmetricalPolygon({ sidesCount: 3 });
    shape.x = 100
    shape.y = 100;
    renderer.addGfx(shape);


    // draw square
    const square = new SymmetricalPolygon({ sidesCount: 4 });
    square.x = 300
    square.y = 100;
    renderer.addGfx(square);


    // draw pentagon
    const pentagon = new SymmetricalPolygon({ sidesCount: 5 });
    pentagon.x = 100
    pentagon.y = 300;
    renderer.addGfx(pentagon);

    // draw hexagon
    const hexagon = new SymmetricalPolygon({ sidesCount: 6 });
    pentagon.x = 300
    pentagon.y = 300;
    renderer.addGfx(hexagon);

  });

  return () => {
    renderer.destroy();
  };
};