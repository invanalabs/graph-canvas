import { Renderer, IRendererOptions } from "@/renderer"
import { initDevtools } from '@pixi/devtools';
import { StraightLine } from "../../../../shapes";


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
    const shape = new StraightLine({
      source: { x: 100, y: 100 },
      target: { x: 200, y: 200 }
    });
    renderer.addGfx(shape);


    // with default styling
    const shapeWithColor = new StraightLine({
      source: { x: 100, y: 150 },
      target: { x: 200, y: 250 },
      style: { fill: { color: 'red' } }
    });
    renderer.addGfx(shapeWithColor);




  });

  return () => {
    renderer.destroy();
  };
};