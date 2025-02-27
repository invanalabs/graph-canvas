import { GraphCanvas, ICanvasOptions } from "../../../../canvas";
import ArtBoardToolBar from "../../../../plugins/toolbar";
import { sample1DataSet } from "../../../example-datasets/sample1";
import { onStoryDown } from "../../../utils/storyDown";
 

export default () => {

  const canvasDiv = document.getElementById("graphCanvas") as HTMLCanvasElement

  const canvasOptions: ICanvasOptions = {
    // styles: {
    //     nodes: {
    //         Project: {
    //             size: 40
    //         }
    //     },
    //     links: {}
    // }
    viewElement: canvasDiv,
    
    extraSettings: {
      nodeColorBasedOn : 'default',
      linkColorBasedOn : 'group',
    }
  } 
  
  const canvas = new GraphCanvas( canvasOptions );
 
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