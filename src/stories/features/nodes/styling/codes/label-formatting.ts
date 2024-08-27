import { GraphCanvas } from "../../../../../canvas";
import { ICanvasLink, ICanvasNode } from "../../../../../store";
import { onStoryDown } from "../../../../utils/storyDown";



export default () => {

  const canvasDiv = document.getElementById("graphCanvas") as HTMLCanvasElement

  const canvas = new GraphCanvas({
    viewElement: canvasDiv,
    
    styles: {
      // nodes: {
      //   Project: {
      //     label: {
      //       text: {
      //         color:  "#A02334"
      //       }
      //     }
      //   }
      // }
    }
  });


  // https://www.toptal.com/designers/htmlarrows/symbols/
//   const nodes: ICanvasNode[] = [
//     {id: '1', group: 'DemoNode', label: 'simple label',  x: -100, y: -100,  },
//     {id: '3', group: 'DemoNode', label: '<h3>Heading here</h3><p>This is formated <em>italic</em> <strong>strong</strong> text.</p>',  x: -100 , y: -300, },
//     // {id: '4', group: 'DemoNode', label: 'image:jpg',   x: -100, y: -300, },
//     // {id: '5', group: 'DemoNode', label: 'icon:Unicode', x: 100, y: -100, icon: '\u2729' }, //'\uf007'}
//     // {id: '6', group: 'DemoNode', label: 'icon:HTMLCode', x: 100, y: -200, icon: '&percnt;' },//'\uf007'}
// ]

//   const links: ICanvasLink[] = []


  const nodes: ICanvasNode[] = [
    { id: '1', group: 'Person', label: 'Person-1', x: 100, y: 100, image: 'https://icons.getbootstrap.com/assets/icons/person.svg',
      style:{
        label: {
          text: {
            color:  "#A02334"
          }
        }
      } 
     },
    { id: '2', group: 'Person', label: 'blue text, <strong><em>formatted</em></strong> and word wrapped ', x: 450, y: 100,
      style:{
        label: {
          text: {
            color:  "#51829B",
            font: {
              wordWrapWidth: 160
            }
          }
        }
      } 

     },
    { id: '3', group: 'Person', label: 'Person-3', x: 100, y: 450 },
    { id: '4', group: 'Person', label: 'Person-4', x: 450, y: 450 },
    { id: '5', group: 'Project', label: '<h3>Invana Studio</h3><p>Opensource network based visualizer. <em>formated</em> <strong>text</strong> text.</p>',
        x: (100+450)/2, y: (100+450)/2,
        image: 'https://icons.getbootstrap.com/assets/icons/building.svg',
    },
    { id: '6', group: 'Person', label: 'Person-6', x: 750, y: 450 }
  ];
  
  const links: ICanvasLink[] = [
    { id: '1-2', group: 'follows', label: 'follows', source: '1', target: '2' },
    { id: '2-4', group: 'follows', label: 'follows', source: '2', target: '4' },
    { id: '3-4', group: 'follows', label: 'follows', source: '3', target: '4' },
    { id: '4-6', group: 'follows', label: 'follows', source: '4', target: '6' },
    { id: '1-5', group: 'contributing_to', label: 'contributing_to', source: '1', target: '5' },
    { id: '2-5', group: 'contributing_to', label: 'contributing_to', source: '2', target: '5' },
    { id: '4-5', group: 'contributing_to', label: 'contributing_to', source: '4', target: '5' }
  ];



  canvas.artBoard.init().then(() => {

      canvas.dataStore.add(nodes, links)
      canvas.artBoard.camera.fitView();

  })


  onStoryDown(() => {
    canvas.artBoard.renderer.destroy();
  });

}