import L from 'leaflet';
import * as PIXI from 'pixi.js';
import { GraphCanvas } from '../../../canvas';
import 'leaflet/dist/leaflet.css';
import { CanvasLink, CanvasNode } from '../../../store';

export interface MarkerData {
    latlng: L.LatLngExpression;
}

export interface PixiLayerOptions extends L.LayerOptions {
    markers?: MarkerData[];
    graphCanvas: GraphCanvas; // Accept pixiApp as an option
}

export class PixiLayer extends L.Layer {
    private _map!: L.Map;
    private _pixiApp!: PIXI.Application;
    private _container!: HTMLCanvasElement;
    private _markers: MarkerData[];
    private options: PixiLayerOptions

    constructor(options: PixiLayerOptions) {
        super(options);
        this._markers = options?.markers || [];
        this.options = options
        this._pixiApp = options.graphCanvas.artBoard.pixiApp 
    }

    addMarker(marker: MarkerData){
       this._markers.push(marker)
       // draw the marker on canvas 
    }

    // removeMarker(marker: MarkerData ){
    //   this._markers.push(marker)

    // }

    onAdd(map: L.Map): this {
        this._map = map;

        // Attach PIXI view (canvas) to Leaflet's overlay pane if it hasn't been added yet
        if (!this._pixiApp.canvas.parentNode) {
            this._container = this._pixiApp.canvas as HTMLCanvasElement;
            this._map.getPanes().overlayPane.appendChild(this._container);
        } else {
            this._container = this._pixiApp.canvas as HTMLCanvasElement;
        }

        // Bind map events to Pixi update function
        map.on('move', this._update, this);
        map.on('zoomend', this._update, this);
        map.on('moveend', this._update, this);

        this._update();

        return this;
    }

    onRemove(map: L.Map): this {
        // Only remove the PIXI canvas from the map if this layer added it
        if (this._pixiApp.view.parentNode === this._map.getPanes().overlayPane) {
            L.DomUtil.remove(this._container);
        }

        // Remove event listeners
        map.off('move', this._update, this);
        map.off('zoomend', this._update, this);
        map.off('moveend', this._update, this);

        // If a custom PIXI.Application was provided, don't destroy it
        if (!this.options.pixiApp) {
            this._pixiApp.destroy(true, { children: true, texture: true, baseTexture: true });
        }

        return this;
    }

    private _update = (): void => {
        const bounds = this._map.getBounds();
        const topLeft = this._map.latLngToLayerPoint(bounds.getNorthWest());
        const size = this._map.getSize();

        // Position the PIXI container
        L.DomUtil.setPosition(this._container, topLeft);
        this._pixiApp.renderer.resize(size.x, size.y);

        // Update PIXI graphics based on map state
        this._drawMarkers();
    }

    private _drawMarkers(): void {
        const container = this._pixiApp.stage;

        // Clear existing graphics
        container.removeChildren();

        // Draw each marker
        this._markers.forEach(marker => {
            const markerPosition = this._map.latLngToLayerPoint(marker.latlng);

            // Create a PIXI graphics object for the marker
            const markerGraphics = new PIXI.Graphics();
            markerGraphics.beginFill(0xff0000); // Red color for the marker
            markerGraphics.drawCircle(0, 0, 5); // Circle with radius 5
            markerGraphics.endFill();

            // Position the marker on the map
            markerGraphics.x = markerPosition.x;
            markerGraphics.y = markerPosition.y;

            // Add the marker to the PIXI container
            container.addChild(markerGraphics);
        });
    }
}

 
