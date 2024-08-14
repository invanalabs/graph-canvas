import { GraphCanvas } from "../../../canvas";
import { ICanvasLink, ICanvasNode } from "../../../store";


export default () => {

  const canvasDiv = document.getElementById("graphCanvas") as HTMLCanvasElement

  const canvas = new GraphCanvas({
    viewElement: canvasDiv,
    debugMode: true
  });

  const nodes: ICanvasNode[] = [
    { id: '1', group: 'Person', label: 'Ravi', shapeName: 'circle', x: 100, y: 200 },
    { id: '2', group: 'Project', label: 'Graph Canvas', shapeName: 'circle', x: 450, y: 200 },
    { id: '3', group: 'Project', label: 'Graph Engine', shapeName: 'circle', x: 350, y: 350 }    
  ]
  const links: ICanvasLink[] = [
    { id: '1-2', group: 'authored', label: '1-2:authored', source: '1', target: '2', shapeName: 'straightLine' },
    { id: '1-3', group: 'authored', label: '1-3:authored', source: '1', target: '3', shapeName: 'straightLine' }
  ]

  canvas.artBoard.init().then(() => {
    canvas.dataStore.add(nodes, links)
    canvas.artBoard.camera.fitView();
  })

}