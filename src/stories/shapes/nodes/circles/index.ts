import { Renderer, IRendererOptions } from "@/renderer"
import { Circle } from "../../../../shapes";
import { initDevtools } from '@pixi/devtools';


export default () => {
  const options: IRendererOptions = {
    viewElement: document.getElementById("invana-container") as HTMLCanvasElement
  }

  const renderer = new Renderer(options);

  const app = renderer.pixiApp
  // globalThis.__PIXI_APP__ = app;
  // for debugging / devtools
  initDevtools({ app: app });

  renderer.init().then(() => {
    console.log("Renderer initialized");

    // with default styling
    const shape = new Circle({
      //  x: 100, y: 100
    }
    );
    shape.setPosition(100, 100)
    renderer.addGfx(shape);

    // with border
    const shapeWithBorder = new Circle({
      x: 300, y: 100,
      fill: { color: "red" }, border: { width: 10 }
    });
    shapeWithBorder.setPosition(300, 100)
    renderer.addGfx(shapeWithBorder);


    // with image
    const shapeWithImage = new Circle({
      // x: 500, y: 100,
      border: { fill: { color: "red" } },
      fill: { imageUrl: "https://invana.io/public/img/vendor-logos/janusgraph.png" }
    });
    shapeWithImage.setPosition(500, 100)
    renderer.addGfx(shapeWithImage);


    // with image
    const gradientFill = new Circle({
      // x: 500, y: 100,
      border: { fill: { color: "red" } },
      fill: { imageUrl: "https://invana.io/public/img/vendor-logos/janusgraph.png" }
    });
    gradientFill.setPosition(100, 300)
    renderer.addGfx(gradientFill);

  });

  return () => {
    renderer.destroy();
  };
};