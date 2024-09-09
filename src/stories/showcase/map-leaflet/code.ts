import { GraphCanvas } from "../../../canvas";
import { CanvasNode, ICanvasLink, ICanvasNode } from "../../../store";
import { onStoryDown } from "../../utils/storyDown";
import { PIXILeafLetOverlay } from "./pixiLeafletOverlay";
import L, { Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';


export default () => {
  const canvasDiv = document.getElementById("graphCanvas") as HTMLCanvasElement;
  // const mapContainer = document.getElementById("mapContainer") as HTMLDivElement;


  // Define some marker data with lat/lng positions
  const nodes: ICanvasNode[] = [
    { id: "hyderabad", group: "MetroCity", label: "Hyderabad ", geoPosition: [17.4273732,78.3944216] },
    { id: "chennai", group: "MetroCity", label: "Chennai", geoPosition: [13.0474733, 80.0442028] },
    // { latlng: [51.495, -0.08] },
  ];

  const links: ICanvasLink[] = [
    { id: 'hyderabad-chennai', group: 'route', label: 'hyd-che-route', source: 'hyderabad', target: 'chennai', shapeName: 'straightLine' },
  ]


  const canvas = new GraphCanvas({
    viewElement: canvasDiv,
    backgroundAlpha: 0, // 0 is transparent
    // background: "#ff00ff",
    styles: {
      defaultNodeStyle: {
        shape: { background: {color: "#ff0000"}},
        label: { text: {color: "#ff0000"}}
      }
    },
    extraSettings: {
      nodeColorBasedOn: 'group',
      nodeSizeBasedOn: 'degree'
    },
  });

  canvas.artBoard.init().then(() => {



    // addd the data 
    const newData = canvas.dataStore.add(nodes, links)
    // Create a Leaflet map
    const map = L.map('mapContainer').setView([17.3662545, 78.3517307], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map)


    let firstDraw = true;
    let prevZoom: any;

    // Define your draw callback (will be used when redrawing the overlay)
    function drawCallback(utils: any, event: L.LeafletEvent): void {
      // This is where markers and other things should be drawn/redrawn
      console.log("drawCallback", event)
      const zoom = utils.getMap().getZoom();
      const container = utils.getContainer();
      const renderer = utils.getRenderer();
      const project = utils.latLngToLayerPoint;
      const scale = utils.getScale();

      canvas.dataStore.getNodes().forEach((node: CanvasNode) => {
        if (firstDraw) {
          const markerCoords = project(node.geoPosition);
          node.updateNodePosition(markerCoords.x, markerCoords.y)
        }
        if (firstDraw || prevZoom !== zoom) {
          node.gfxInstance.containerGfx.scale.set(1 / scale);
        }
      })
      firstDraw = false;
      prevZoom = zoom;
      renderer.render(container);

    }



    const pixiLayer: PIXILeafLetOverlay = new PIXILeafLetOverlay(drawCallback, canvas.artBoard.pixiApp)
    pixiLayer.addTo(map);
    // pixiLayer.addMarkers(newData.nodes)
  });


  onStoryDown(() => {
    canvas.artBoard.renderer.destroy();
  });
}
