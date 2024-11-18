import { Renderer, IRendererOptions } from "@/renderer"
import { SymmetricalPolygon } from "../../../shapes";


export default () => {
  const options: IRendererOptions = {
    viewElement: document.getElementById("invana-container") as HTMLCanvasElement
  }

  const renderer = new Renderer(options);
  renderer.init().then(() => {
    console.log("Renderer initialized");

    // draw triangle
    const shape = new SymmetricalPolygon({ sidesCount: 3 });
    shape.setPosition(100, 100)
    renderer.addGfx(shape);

    // draw square
    const square = new SymmetricalPolygon({ sidesCount: 4 });
    square.setPosition(300, 100)
    renderer.addGfx(square);

    // draw pentagon
    const pentagon = new SymmetricalPolygon({ sidesCount: 5 });
    pentagon.setPosition(100, 300)
    renderer.addGfx(pentagon);

    // draw hexagon
    const hexagon = new SymmetricalPolygon({ sidesCount: 6 });
    hexagon.setPosition(300, 300)
    renderer.addGfx(hexagon);

    // draw hexagon
    const heptagon = new SymmetricalPolygon({ sidesCount: 7 });
    heptagon.setPosition(100, 500)
    renderer.addGfx(heptagon);


    // draw octagon
    const octagon = new SymmetricalPolygon({ sidesCount: 8 });
    octagon.setPosition(300, 500)
    renderer.addGfx(octagon);

  });

  return () => {
    renderer.destroy();
  };
};