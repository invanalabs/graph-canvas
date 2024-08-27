import { GraphCanvas } from "../../../canvas";
import DagreLayoutComputer from "../../../layout/dagre";
import DagreOptionsToolBar from "../../../plugins/dagreToolBar";
import ArtBoardStatusBar from "../../../plugins/statusBar";
import { treeData } from "../../example-datasets/treeData";
import { onStoryDown } from "../../utils/storyDown";
 

export default () => {

  const canvasDiv = document.getElementById("graphCanvas") as HTMLCanvasElement

  const canvas = new GraphCanvas({
    viewElement: canvasDiv,
    
  });

  const toolbar = new DagreOptionsToolBar(canvas.artBoard);
  const toolBarHTMLDiv = toolbar.render()
  canvasDiv.parentNode?.appendChild(toolBarHTMLDiv)


  const statusBarToolbar = new ArtBoardStatusBar(canvas.artBoard);
  const statusBarHTMLDiv = statusBarToolbar.render()
  canvasDiv.parentNode?.appendChild(statusBarHTMLDiv)

 
  canvas.artBoard.init().then(() => {
    canvas.dataStore.add(treeData.nodes, treeData.links)

    const d3LayoutInstance = new DagreLayoutComputer(canvas.artBoard.canvas);
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