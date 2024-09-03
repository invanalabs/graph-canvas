import { ArtBoard } from "../../../artBoard";
import { GraphCanvas } from "../../../canvas";
import { CanvasNode, ICanvasLink, ICanvasNode } from "../../../store";
import { OnNodeAddedEventData } from "../../../store/events/types";
import { onStoryDown } from "../../utils/storyDown";
import { createPixiLayer, MarkerData, PixiLayer } from "./pixiLeaflet";
import L, { Map as LeafletMap, LatLngExpression, Point, Layer } from 'leaflet';


export default () => {
  const canvasDiv = document.getElementById("graphCanvas") as HTMLCanvasElement;
  // const mapContainer = document.getElementById("mapContainer") as HTMLDivElement;


  // Define some marker data with lat/lng positions
  const nodes: ICanvasNode[] = [
    { id: "hyderabad", group: "City", label: "Hyderabad ", x: 10, y: 0, geoPosition: [17.3662545, 78.3517307] },
    { id: "chennai", group: "City", label: "Chennai", x: 100, y: 100, geoPosition: [13.0474733, 80.0442028] },
    // { latlng: [51.495, -0.08] },
  ];

  // const markers: ICanvasNode[] = [
  //   { id: '1', group: 'Person', label: 'Ravi',  x: 100, y: 200 },
  //   { id: '2', group: 'Project', label: 'Graph Canvas',  x: 450, y: 200 },
  //   { id: '3', group: 'Project', label: 'Graph Engine',  x: 350, y: 350 }    
  // ]
  const links: ICanvasLink[] = [
    { id: 'hyderabad-chennai', group: 'route', label: 'hyd-che-route', source: 'hyderabad', target: 'chennai', shapeName: 'straightLine' },
  ]


  // Create an instance of the PixiLayer and add it to the map
  // const pixiLayer = createPixiLayer({ markers }).addTo(map);


  const canvas = new GraphCanvas({
    viewElement: canvasDiv,
    backgroundAlpha: 0, // 0 is transparent
    // background: "#ff00ff",
    extraSettings: {
      nodeColorBasedOn: 'group',
      nodeSizeBasedOn: 'degree'
    },
  });

  canvas.artBoard.init().then(() => {



    // addd the data 
    const newData = canvas.dataStore.add(nodes, links)
    // Create a Leaflet map
    const map = L.map('mapContainer').setView([17.3662545, 78.3517307], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map)

    const pixiLayer: PixiLayer = new PixiLayer({ graphCanvas: canvas }).addTo(map);
    pixiLayer.addMarkers(newData.nodes)
    // canvas.artBoard.camera.fitView()
  });

  // canvas.dataStore.on("node:data:onAdded", ({ node}: OnNodeAddedEventData) =>{
  //   node.updateNodePosition(node.geoPosition[0], node.geoPosition[1])
  // })

  onStoryDown(() => {
    canvas.artBoard.renderer.destroy();
  });
}
