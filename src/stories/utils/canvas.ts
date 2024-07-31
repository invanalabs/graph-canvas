import { GraphCanvas, ICanvasOptions } from "../../canvas";
import ArtBoardToolBar from "../../plugins/toolbar";
import ArtBoardStatusBar from "../../plugins/statusBar";
import { ICanvasLink, ICanvasNode } from "../../store";
import DagreLayoutComputer from "../../layout/dagre";
import LayoutSwitcherToolBar from "../../plugins/layouts/layoutSwitcher";
import DagreOptionsToolBar from "../../plugins/dagreToolBar";
import D3ForceLayoutComputer from "../../layout/d3-force";
import D3ForceOptionsToolBar from "../../plugins/d3ForceToolBar";
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

    // options.plugins = [ArtBoardToolBar, ArtBoardStatusBar]
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


        const toolbar = new ArtBoardToolBar(canvas.artBoard);
        const toolBarHTMLDiv = toolbar.render()
        html.appendChild(toolBarHTMLDiv)


        const artBoardStatusBar = new ArtBoardStatusBar(canvas.artBoard);
        const messageDiv = artBoardStatusBar.render()
        html.appendChild(messageDiv)

        if (layout == "d3-force") {
          const layoutToolBar = new D3ForceOptionsToolBar(canvas.artBoard);
          const layoutToolBarDiv = layoutToolBar.render()
          html.appendChild(layoutToolBarDiv)

          // start treee layout
          const d3LayoutInstance = new D3ForceLayoutComputer(canvas.artBoard.canvas);
          d3LayoutInstance?.computeLayout(
            canvas.artBoard.canvas.dataStore.getNodes(),
            canvas.artBoard.canvas.dataStore.getLinks()
          );


        } else if (layout === "dagre") {
          const layoutToolBar = new DagreOptionsToolBar(canvas.artBoard);
          const layoutToolBarDiv = layoutToolBar.render()
          html.appendChild(layoutToolBarDiv)

          // start treee layout
          const dagreLayoutInstance = new DagreLayoutComputer(canvas.artBoard.canvas);

          dagreLayoutInstance?.computeLayout(
            canvas.artBoard.canvas.dataStore.getNodes(),
            canvas.artBoard.canvas.dataStore.getLinks()
          );


        }

        // const layoutToolBar = new LayoutSwitcherToolBar(canvas.artBoard);
        // const layoutToolBarDiv  = layoutToolBar.render()
        // html.appendChild(layoutToolBarDiv)

        canvas.artBoard.camera.fitView();

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
