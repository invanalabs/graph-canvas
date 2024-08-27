import { ArtBoard } from "../../../artBoard";
import { GraphCanvas } from "../../../canvas";
import miserablesData from "../../example-datasets/les-miserables/miserables.json";
import { onStoryDown } from "../../utils/storyDown";
import L, { Map as LeafletMap, LatLngExpression, Point, Layer } from 'leaflet';
import * as PIXI from 'pixi.js';
import 'leaflet/dist/leaflet.css';
import { Viewport } from "pixi-viewport";

class PixiOverlay {
  private map: LeafletMap;
  private app: PIXI.Application;
  private container: PIXI.Container;
  private overlay: L.LayerGroup;
  private viewport: Viewport

  constructor(map: LeafletMap, artBoard: ArtBoard) {
    this.map = map;
    this.app = artBoard.pixiApp;
    this.container = new PIXI.Container();
    this.viewport = artBoard.viewport
    this.viewport.addChild(this.container);
    this.overlay = L.layerGroup().addTo(this.map);
    this.initLeafletOverlay();
  }

  private initLeafletOverlay(): void {
    L.DomUtil.setPosition(this.app.canvas as HTMLElement, L.point(0, 0));
    L.DomEvent.on(this.app.canvas as HTMLElement, 'click', L.DomEvent.stopPropagation);

    this.overlay.on('add', () => {
      this.map.getPanes().overlayPane.appendChild(this.app.canvas as HTMLElement);
      this.app.renderer.resize(this.map.getSize().x, this.map.getSize().y);
      this.map.on('move', this.redraw, this);
      this.redraw();
    });

    this.overlay.on('remove', () => {
      this.map.getPanes().overlayPane.removeChild(this.app.canvas as HTMLElement);
      this.map.off('move', this.redraw, this);
    });
  }

  private redraw(): void {
    const bounds = this.map.getBounds();
    const topLeft = this.map.latLngToLayerPoint(bounds.getNorthWest());

    L.DomUtil.setPosition(this.app.canvas as HTMLElement, topLeft);

    this.container.children.forEach((node: PIXI.DisplayObject) => {
      const sprite = node as PIXI.Sprite & { latLng: L.LatLng };
      const latLng = sprite.latLng;
      const pixiPoint = this.map.latLngToLayerPoint(latLng);
      sprite.position.set(pixiPoint.x - topLeft.x, pixiPoint.y - topLeft.y);
    });

    this.app.render();
  }

  public addNode(lat: number, lng: number): void {
    const node = new PIXI.Graphics();
    node.beginFill(0xff0000);
    node.drawCircle(0, 0, 10);
    node.endFill();
    node.zIndex = 700;

    (node as PIXI.Sprite & { latLng: L.LatLng }).latLng = L.latLng(lat, lng);

    this.container.addChild(node);
    this.redraw();
  }
}

export default () => {
  const canvasDiv = document.getElementById("graphCanvas") as HTMLDivElement;
  const mapContainer = document.getElementById("mapContainer") as HTMLDivElement;


  const canvas = new GraphCanvas({
    viewElement: canvasDiv,
    backgroundAlpha: 0.4,
    extraSettings: {
      nodeColorBasedOn: 'group',
      nodeSizeBasedOn: 'degree'
    },
  });

  canvas.artBoard.init().then(() => {
    const map = L.map(mapContainer).setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map);

    const pixiOverlay = new PixiOverlay(map, canvas.artBoard);

    pixiOverlay.addNode(51.505, -0.09); // Center
    pixiOverlay.addNode(51.515, -0.1);  // North-West
    pixiOverlay.addNode(51.495, -0.08); // South-East


    onStoryDown(() => {
      canvas.artBoard.renderer.destroy();
    });
  });


}
