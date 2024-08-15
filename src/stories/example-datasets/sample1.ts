import { ICanvasLink, ICanvasNode } from "../../store";

const exampleNodes: ICanvasNode[] = [
  { id: '1', group: 'Person', label: 'Person-1', x: 100, y: 100 },
  { id: '2', group: 'Person', label: 'Person-2', x: 450, y: 100 },
  { id: '3', group: 'Person', label: 'Person-3', x: 100, y: 450 },
  { id: '4', group: 'Person', label: 'Person-4', x: 450, y: 450 },
  { id: '5', group: 'Project', label: 'Project', x: (100+450)/2, y: (100+450)/2, style: {size: 30} },
  { id: '6', group: 'Person', label: 'Person-6', x: 750, y: 450 },

];

const exampleLinks: ICanvasLink[] = [
  { id: '1-2', group: 'follows', label: 'follows', source: '1', target: '2' },
  // { id: '1-2.1', group: 'follows', label: 'default-1-2.1', source: '1', target: '2' },
  // { id: '2-3', group: 'follows', label: 'follows', source: '2', target: '3' },
  { id: '2-4', group: 'follows', label: 'follows', source: '2', target: '4' },
  { id: '3-4', group: 'follows', label: 'follows', source: '3', target: '4' },
  { id: '4-6', group: 'follows', label: 'follows', source: '4', target: '6' },


  { id: '1-5', group: 'contributing_to', label: 'contributing_to', source: '1', target: '5' },
  { id: '2-5', group: 'contributing_to', label: 'contributing_to', source: '2', target: '5' },
  // { id: '3-5', group: 'contributing_to', label: 'contributing_to', source: '3', target: '5' },
  { id: '4-5', group: 'contributing_to', label: 'contributing_to', source: '4', target: '5' },
];


const sample1DataSet: {nodes: ICanvasNode[], links: ICanvasLink[]} = {nodes: exampleNodes, links:exampleLinks}
export {sample1DataSet}