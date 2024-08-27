import { GraphCanvas } from "../../../../canvas";
import { ICanvasLink, ICanvasNode } from "../../../../store";
import { onStoryDown } from "../../../utils/storyDown";



export default () => {

  const canvasDiv = document.getElementById("graphCanvas") as HTMLCanvasElement

  const canvas = new GraphCanvas({
    viewElement: canvasDiv,
    
  });

  const nodes: ICanvasNode[] = [
    {
      id: '1', group: 'DemoNode', label: 'Default',  x: (window.innerWidth / 2) - 100, y: window.innerHeight / 2
    },
    {
      id: '3', group: 'DemoNode', label: 'Highlighted', state: ':highlighted', x: (window.innerWidth / 2) + 100, y: window.innerHeight / 2
    },
    {
      id: '4', group: 'DemoNode', label: 'Muted', state: ':muted', x: (window.innerWidth / 2) - 100, y: (window.innerHeight / 2) + 100
    },
    {
      id: '5', group: 'DemoNode', label: 'Selected', state: ':selected',  x: (window.innerWidth / 2) + 100, y: (window.innerHeight / 2) + 100
    }
  ]

  const links: ICanvasLink[] = []

  canvas.artBoard.init().then(() => {
    canvas.dataStore.add(nodes, links)
    canvas.artBoard.camera.fitView();
  })


  onStoryDown(() => {
    canvas.artBoard.renderer.destroy();
  });

}