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
    {id: '1', group: 'DemoNode', label: 'simple label',  x: -100, y: -100,  },
    {id: '3', group: 'DemoNode', label: '<h3>Heading here</h3><p>This is formated <em>italic</em> <strong>strong</strong> text.</p>',  x: -100 , y: -400, },
    // {id: '4', group: 'DemoNode', label: 'image:jpg',   x: -100, y: -300, },
    // {id: '5', group: 'DemoNode', label: 'icon:Unicode', x: 100, y: -100, icon: '\u2729' }, //'\uf007'}
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