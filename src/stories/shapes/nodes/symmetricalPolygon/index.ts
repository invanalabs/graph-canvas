import { Renderer, IRendererOptions } from "@/renderer"
import { SymmetricalPolygon } from "../../../../shapes";


export default () => {
  const options: IRendererOptions = {
    viewElement: document.getElementById("invana-container") as HTMLCanvasElement
  }

  const renderer = new Renderer(options);
  renderer.init().then(() => {
    console.log("Renderer initialized");

    // draw triangle
    const shape = new SymmetricalPolygon({
      sidesCount: 3,
      fill: { alpha: 0.5, imageUrl: "https://invana.io/public/img/vendor-logos/janusgraph.png" }
    });
    shape.setPosition(100, 100)
    renderer.addGfx(shape);

    // draw square
    const square = new SymmetricalPolygon({
      sidesCount: 4,
      fill: { alpha: 0.5, imageUrl: "https://invana.io/public/img/vendor-logos/janusgraph.png" }

    });
    square.setPosition(300, 100)
    renderer.addGfx(square);

    // draw pentagon
    const pentagon = new SymmetricalPolygon({
      sidesCount: 5,
      fill: { alpha: 0.5, imageUrl: "https://invana.io/public/img/vendor-logos/janusgraph.png" }

    });
    pentagon.setPosition(100, 300)
    renderer.addGfx(pentagon);

    // draw hexagon
    const hexagon = new SymmetricalPolygon({
      sidesCount: 6,
      fill: { alpha: 0.5, imageUrl: "https://invana.io/public/img/vendor-logos/janusgraph.png" }

    });
    hexagon.setPosition(300, 300)
    renderer.addGfx(hexagon);

    // draw hexagon
    const heptagon = new SymmetricalPolygon({
      sidesCount: 7,
      fill: { alpha: 0.5, imageUrl: "https://invana.io/public/img/vendor-logos/janusgraph.png" }

    });
    heptagon.setPosition(100, 500)
    renderer.addGfx(heptagon);


    // draw octagon
    const octagon = new SymmetricalPolygon({
      sidesCount: 8,
      fill: { alpha: 0.5, imageUrl: "https://invana.io/public/img/vendor-logos/janusgraph.png" }

    });
    octagon.setPosition(300, 500)
    renderer.addGfx(octagon);

  });

  return () => {
    renderer.destroy();
  };
};