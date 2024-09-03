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
    private _markers: { [key: string]:  CanvasNode } = {}
    private options: PixiLayerOptions

    constructor(options: PixiLayerOptions) {
        super(options);
        this._markers = {};
        this.options = options
        this._pixiApp = options.graphCanvas.artBoard.pixiApp
    }

    addMarkers(nodes: CanvasNode[]){
        nodes.forEach(node => { this._markers[node.id] = node })
        // links.forEach(link => { this._markers[link.id] = link })
        // draw the marker on canvas 
        this._update()
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
        // // Optionally, call this to update the layer on zoom/pan
        // map.on('viewreset', this._update, this);

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
        if (this._pixiApp) {
            this._pixiApp.destroy(true, { children: true, texture: true, textureSource: true });
        }

        return this;
    }

    private _update = (): void => {
        console.log("=====_update", this._map)
        // Update the layer on zoom/pan (optional)
    
        const bounds = this._map.getBounds();
        const topLeft = this._map.latLngToLayerPoint(bounds.getNorthWest());
        const mapSize = this._map.getSize();
        const canvasSize = this._pixiApp.renderer.screen;

        // Position the PIXI container
        L.DomUtil.setPosition(this._container, topLeft);
        console.log("====size", mapSize.x, mapSize.y, this._pixiApp.renderer.screen)
        if (mapSize.x !== canvasSize.x || mapSize.y !== canvasSize.y){
            this._pixiApp.renderer.resize(mapSize.x, mapSize.y);
        }

        // Update PIXI graphics based on map state
        this._positionMarkers();
    }

    private _positionMarkers(): void {
        // this.options.graphCanvas.artBoard.viewport.removeChildren()

        Object.keys(this._markers).forEach(nodeId => {
            const node: CanvasNode = this._markers[nodeId];
            console.log(`Key: ${nodeId}, Value: ${node.geoPosition}`);
            // const markerPosition = this._map.latLngToLayerPoint(node.geoPosition);
            // console.log("Node, is ", nodeId, markerPosition)
            // node.updateNodePosition(markerPosition.x, markerPosition.y)
            // //@ts-ignore
            node.updateNodePosition(node.geoPosition[0], node.geoPosition[1])
        });

 
    }


    // _reset() {
    //     const bounds = this._map.getBounds();
    //     const topLeft = this._map.latLngToLayerPoint(bounds.getNorthWest());
    //     const size = this._map.getSize();

    //     L.DomUtil.setPosition(this._container, topLeft);
    //     this._container.style.width = size.x + 'px';
    //     this._container.style.height = size.y + 'px';
    // }
}

 
