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
    {id: '1', group: 'DemoNode', label: 'all interactions enabled', isDraggable: true, isSelectable: true, isHoverable: true,  x: 200, y: -100,  },
    {id: '3', group: 'DemoNode', label: 'drag :: disabled', isDraggable: false,  x: -100 , y: -200, },
    {id: '4', group: 'DemoNode', label: 'select :: disabled', isSelectable: false,   x: -100, y: -300, },
    {id: '5', group: 'DemoNode', label: 'hover :: disabled', isHoverable: false,  x: -100, y: -100, }, //'\uf007'}
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