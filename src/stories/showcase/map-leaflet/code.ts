import { ArtBoard } from "../../../artBoard";
import { GraphCanvas } from "../../../canvas";
import { onStoryDown } from "../../utils/storyDown";
import { createPixiLayer, MarkerData, PixiLayer } from "./pixiLeaflet";
import L, { Map as LeafletMap, LatLngExpression, Point, Layer } from 'leaflet';


export default () => {
  const canvasDiv = document.getElementById("graphCanvas") as HTMLCanvasElement;
  // const mapContainer = document.getElementById("mapContainer") as HTMLDivElement;

  // Create a Leaflet map
  const map = L.map('mapContainer').setView([17.3662545, 78.3517307], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  }).addTo(map);

  // Define some marker data with lat/lng positions
  const markers: MarkerData[] = [
    { latlng: [17.3662545, 78.3517307] },
    { latlng: [51.515, -0.1] },
    { latlng: [51.495, -0.08] },
  ];


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
    const pixiLayer = new PixiLayer({ graphCanvas: canvas, markers: markers }).addTo(map);
    // pixiLayer.addMarker()
  });

  // onStoryDown(() => {
  //   canvas.artBoard.renderer.destroy();
  // });
}
