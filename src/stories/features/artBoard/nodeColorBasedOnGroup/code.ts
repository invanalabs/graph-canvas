import { GraphCanvas, ICanvasOptions } from "../../../../canvas";
import miserablesData from "../../../example-datasets/les-miserables/miserables.json";
 

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
    debugMode: true,
    extraSettings: {
      nodeColorBasedOn : 'group',
      linkColorBasedOn : 'default',
    }
  } 
  
  const canvas = new GraphCanvas( canvasOptions );

  canvas.artBoard.init().then(() => {
    canvas.dataStore.add(miserablesData.nodes, miserablesData.links) 
    canvas.artBoard.camera.fitView();
  })

}