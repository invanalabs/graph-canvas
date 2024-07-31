import { GraphCanvas, ICanvasOptions } from "../canvas";
import ToolBar from "../plugins/toolbar";
import MessageBar from "../plugins/messageBar";
import { ICanvasLink, ICanvasNode } from "../store";
import DagreLayoutComputer from "../layout/dagre";
import LayoutsToolBar from "../plugins/layouts";
// import * as dat from 'dat.gui';


export const createCanvas = (nodes: ICanvasNode[], links: ICanvasLink[], canvasOptions?: ICanvasOptions,
  layout: null | 'd3-force' | 'dagre' = null
) => {
  const html = document.createElement("div");
  const canvasDiv = document.createElement("canvas");
  canvasDiv.style.height = '100vh';
  canvasDiv.style.width = '100vw';
  canvasDiv.style.background = "#222222"
  html.appendChild(canvasDiv)


  document.addEventListener("DOMContentLoaded", function (event) {
    // console.log("=DOM is ready", event,)
    const options: ICanvasOptions = (canvasOptions) ? { ...canvasOptions, viewElement: canvasDiv } : {
      viewElement: canvasDiv,
      debugMode: true
    }

    // options.plugins = [ToolBar, MessageBar]
    // console.log("====options", options)
    const canvas = new GraphCanvas(options,);

    canvas.artBoard.init().then(() => {
      // console.log("====start_drawing started")
      const fontFamilyname = 'FontAwesome';
      const fontUrl = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/webfonts/fa-solid-900.woff2'
      const font = new FontFace(fontFamilyname, 'url(' + fontUrl + ')');
      font.load().then(function (loadedFont) {
        // console.log("font loaded ", fontFamilyname)
        document.fonts.add(loadedFont);

        // canvas.artBoard.
        canvas.dataStore.add(nodes, links)


        const toolbar = new ToolBar(canvas.artBoard);
        const toolBarHTMLDiv = toolbar.render()
        html.appendChild(toolBarHTMLDiv)


        const messageBar = new MessageBar(canvas.artBoard);
        const messageDiv  = messageBar.render()
        html.appendChild(messageDiv)

        const layoutToolBar = new LayoutsToolBar(canvas.artBoard);
        const layoutToolBarDiv  = layoutToolBar.render()
        html.appendChild(layoutToolBarDiv)

        
        // if (layout === 'd3-force') {
        //   // const layoutInstance = new D3ForceLayoutComputer(canvas);
        //   // layoutInstance?.computeLayout(nodes, links);
        // }
        // else if (layout === 'dagre') {
        //   const layoutInstance = new DagreLayoutComputer(canvas);
        //   layoutInstance?.computeLayout(nodes, links);
        // }else{
        //   canvas.artBoard.camera.fitView();
        // }
        // canvas.camera.moveNodesToWorldCenter();
        // draw toolbar 

        // Creating a GUI and a subfolder.
        // const gui = new dat.GUI();
        // const folder1 = gui.addFolder('Renderer');
        // const helperUtils = { redraw: ()=> canvas.artBoard.renderer.render()};
        // gui.add(helperUtils,'redraw');





      })
    })

  }, false);
  return html
}
