import { GraphCanvas } from "../../../canvas";
import largeData from "../../example-datasets/large-data/largeData.json";
// import miserablesData from "../../example-datasets/les-miserables/miserables.json";


export default () => {

  const canvasDiv = document.getElementById("graphCanvas") as HTMLCanvasElement

  const canvas = new GraphCanvas({
    viewElement: canvasDiv,
    debugMode: true
  });


  canvas.artBoard.init().then(() => {
    canvas.dataStore.add(largeData.nodes, largeData.links)
    canvas.artBoard.camera.fitView();
  })

}