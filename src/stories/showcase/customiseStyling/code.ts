import { GraphCanvas, ICanvasOptions } from "../../../canvas";
import ArtBoardToolBar from "../../../plugins/toolbar";
import { LinkStyleDefaults } from "../../../renderer/shapes/links/defaults";
import { deepMerge } from "../../../utils/merge";
import { sample1DataSet } from "../../example-datasets/sample1";
import { onStoryDown } from "../../utils/storyDown";


export default () => {

  const canvasDiv = document.getElementById("graphCanvas") as HTMLCanvasElement

  const canvasOptions: ICanvasOptions = {
    background: "#08345c",
    viewElement: canvasDiv,
    styles: {
      defaultLinkStyle: deepMerge(LinkStyleDefaults, {
        shape: { color: "#ffffff" }, label: {
          text: { color: "#ffffff" }, background: {
            color: "#333333",
            opacity: 0.5
          }
        },
      })
    },
    debugMode: true,
    extraSettings: {
      nodeColorBasedOn: 'default',
    }
  }

  const canvas = new GraphCanvas(canvasOptions);

  const toolbar = new ArtBoardToolBar(canvas.artBoard);
  const toolBarHTMLDiv = toolbar.render()
  canvasDiv.parentNode?.appendChild(toolBarHTMLDiv)

  canvas.artBoard.init().then(() => {
    canvas.dataStore.add(sample1DataSet.nodes, sample1DataSet.links)
    canvas.artBoard.camera.fitView();
  })


  onStoryDown(() => {
    canvas.artBoard.renderer.destroy();
  });

}