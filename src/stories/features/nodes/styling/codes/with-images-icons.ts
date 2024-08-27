import { GraphCanvas } from "../../../../../canvas";
import { ICanvasLink, ICanvasNode } from "../../../../../store";
import { onStoryDown } from "../../../../utils/storyDown";



export default () => {

  const canvasDiv = document.getElementById("graphCanvas") as HTMLCanvasElement

  const canvas = new GraphCanvas({
    viewElement: canvasDiv,
    
  });


  // https://www.toptal.com/designers/htmlarrows/symbols/
  const nodes: ICanvasNode[] = [
    {id: '1', group: 'DemoNode', label: 'image:svg',  x: -100, y: -100, image: 'https://icons.getbootstrap.com/assets/icons/person.svg', },
    {id: '3', group: 'DemoNode', label: 'image:png',  x: -100 , y: -200, image: 'https://cdn-icons-png.flaticon.com/128/12540/12540614.png'},
    {id: '4', group: 'DemoNode', label: 'image:jpg',   x: -100, y: -300, image: 'https://pbs.twimg.com/profile_images/977119121002323969/Jg7jfoO8_400x400.jpg'},
    {id: '5', group: 'DemoNode', label: 'icon:Unicode', x: 100, y: -100, icon: '\u2729' }, //'\uf007'}
    {id: '6', group: 'DemoNode', label: 'icon:HTMLCode', x: 100, y: -200, icon: '&percnt;' },//'\uf007'}
    {id: '7', group: 'DemoNode', label: 'icon:FontAwesome', x: 100, y: -300, icon: '\uF14E', 
      style: { shape: {icon: {font: {family: 'FontAwesome'}}}}  
    }//'\uf007'}

    


]

  const links: ICanvasLink[] = []

  canvas.artBoard.init().then(() => {

    canvas.artBoard.loadFont('FontAwesome','https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-solid-900.woff2').then(()=>{
      canvas.dataStore.add(nodes, links)
      canvas.artBoard.camera.fitView();
    })

  })


  onStoryDown(() => {
    canvas.artBoard.renderer.destroy();
  });

}