import { GraphCanvas } from "../../../../../canvas";
import { ICanvasLink, ICanvasNode } from "../../../../../store";
import { onStoryDown } from "../../../../utils/storyDown";



export default () => {

  const canvasDiv = document.getElementById("graphCanvas") as HTMLCanvasElement

  const canvas = new GraphCanvas({
    viewElement: canvasDiv,
    debugMode: true
  });


  // https://www.toptal.com/designers/htmlarrows/symbols/
  const nodes: ICanvasNode[] = [
    {id: '1', group: 'DemoNode', label: 'Default (isDraggable+Interactive)', isDraggable: true,  isInteractive: true,  x: 200, y: -100,  },
    {id: '3', group: 'DemoNode', label: 'isDraggable=false', isDraggable: false,  x: -100 , y: -200, },
    {id: '5', group: 'DemoNode', label: 'isInteractive=false', isInteractive: false,  x: -100, y: -100, }, //'\uf007'}
    // {id: '6', group: 'DemoNode', label: 'icon:HTMLCode', x: 100, y: -200, icon: '&percnt;' },//'\uf007'}
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