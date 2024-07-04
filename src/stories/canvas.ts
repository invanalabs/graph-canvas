import { GraphCanvas, ICanvasOptions } from "../canvas";
import ToolBar from "../plugins/toolbar";
import { ICanvasLink, ICanvasNode } from "../store";
import D3ForceLayout from "./layouts/d3-force/layout";
import DagreLayout from "./layouts/dagre/layout";


export const createCanvas = (nodes: ICanvasNode[], links: ICanvasLink[], canvasOptions?: ICanvasOptions,
  layout: null | 'd3-force' | 'dagre' = null
) => {
  const html = document.createElement("div");

  const canvasDiv = document.createElement("canvas");
  canvasDiv.style.height = '100vh';
  canvasDiv.style.width = '100vw';
  // canvasDiv.style.background = "#444"
  html.appendChild(canvasDiv)

  document.addEventListener("DOMContentLoaded", function (event) {
    console.log("=DOM is ready", event,)
    const options: ICanvasOptions = (canvasOptions) ? { ...canvasOptions, viewElement: canvasDiv } : {
      viewElement: canvasDiv,
      debugMode: true
    }
    console.log("====options", options)
    const canvas = new GraphCanvas(options);

    const fontFamilyname = 'FontAwesome';
    const fontUrl = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/webfonts/fa-solid-900.woff2'

    const font = new FontFace(fontFamilyname, 'url(' + fontUrl + ')');
    font.load().then(function (loadedFont) {
      console.log("font loaded ", fontFamilyname)
      document.fonts.add(loadedFont);




      canvas.dataStore.add(nodes, links)

      if (layout === 'd3-force') {
        const layoutInstance = new D3ForceLayout(canvas);
        layoutInstance?.add2Layout(nodes, links);
      }
      else if (layout === 'dagre') {
        const layoutInstance = new DagreLayout(canvas);
        layoutInstance?.add2Layout(nodes, links);
      }



      canvas.artBoard.camera.fitView();
      // canvas.camera.moveNodesToWorldCenter();

      const toolbar = new ToolBar(canvas.artBoard);
      const toolBarHTMLDiv = toolbar.render()
      html.appendChild(toolBarHTMLDiv)
    })

  }, false);
  return html
}
