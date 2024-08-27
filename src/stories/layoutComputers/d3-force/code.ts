import { GraphCanvas } from "../../../canvas";
import D3ForceLayoutComputer from "../../../layout/d3-force";
import D3ForceOptionsToolBar from "../../../plugins/d3ForceToolBar";
import ArtBoardStatusBar from "../../../plugins/statusBar";
import { miserablesData } from "../../example-datasets/les-miserables-no-positions";
import { onStoryDown } from "../../utils/storyDown";
 

export default () => {

  const canvasDiv = document.getElementById("graphCanvas") as HTMLCanvasElement

  const canvas = new GraphCanvas({
    viewElement: canvasDiv,
    extraSettings: {
      nodeColorBasedOn: 'group',
      nodeSizeBasedOn: 'degree'
    }
  });

  const toolbar = new D3ForceOptionsToolBar(canvas.artBoard);
  const toolBarHTMLDiv = toolbar.render()
  canvasDiv.parentNode?.appendChild(toolBarHTMLDiv)


  const statusBarToolbar = new ArtBoardStatusBar(canvas.artBoard);
  const statusBarHTMLDiv = statusBarToolbar.render()
  canvasDiv.parentNode?.appendChild(statusBarHTMLDiv)

 
  canvas.artBoard.init().then(() => {
    canvas.dataStore.add(miserablesData.nodes, miserablesData.links)

    const d3LayoutInstance = new D3ForceLayoutComputer(canvas.artBoard.canvas);
    d3LayoutInstance?.computeLayout(
      canvas.artBoard.canvas.dataStore.getNodes(),
      canvas.artBoard.canvas.dataStore.getLinks()
    );

    canvas.artBoard.camera.fitView();
  })

  onStoryDown(() => {
    canvas.artBoard.renderer.destroy();
  });
}