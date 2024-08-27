import { GraphCanvas } from "../../../canvas";
import miserablesData from "../../example-datasets/les-miserables/miserables.json";
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


  canvas.artBoard.init().then(() => {
    canvas.dataStore.add(miserablesData.nodes, miserablesData.links)
    canvas.artBoard.camera.fitView();
  })

  onStoryDown(() => {
    canvas.artBoard.renderer.destroy();
  });
}