import { Renderer, IRendererOptions } from "../../.."
import { SymmetricalPolygon } from "../../../graphics";


export default () => {
  const options: IRendererOptions = {
    viewElement: document.getElementById("invana-container") as HTMLCanvasElement
  }

  const renderer = new Renderer(options);
  renderer.init().then(() => {
    console.log("Renderer initialized");

    // with default styling
    const shape = new SymmetricalPolygon();
    shape.x = 100
    shape.y = 100;
    renderer.addGfx(shape);

    // with border
    const shapeWithBorder = new SymmetricalPolygon({ border: { width: 10 } });
    shapeWithBorder.x = 500
    shapeWithBorder.y = 100;
    renderer.addGfx(shapeWithBorder);



    // draw square
    const square = new SymmetricalPolygon({ sidesCount: 4 });
    square.x = 100
    square.y = 300;
    renderer.addGfx(square);



    // draw pentagon
    const pentagon = new SymmetricalPolygon({ sidesCount: 5 });
    pentagon.x = 300
    pentagon.y = 100;
    renderer.addGfx(pentagon);

    // draw hexagon
    const hexagon = new SymmetricalPolygon({ sidesCount: 6 });
    pentagon.x = 100
    pentagon.y = 600;
    renderer.addGfx(hexagon);

  });

  return () => {
    renderer.destroy();
  };
};