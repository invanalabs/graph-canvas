import * as L from 'leaflet';
import * as PIXI from 'pixi.js';

export class PIXILeafLetOverlay extends L.Layer {
  private _pixiApp: PIXI.Application;
  private _pixiContainer: PIXI.Container;
  private _initialZoom!: number;
  private _wgsOrigin!: L.LatLng;
  private _wgsInitialShift!: L.Point;
  private _mapInitialZoom!: number;
  private _center!: L.LatLng;
  private _zoom!: number;
  private _bounds!: L.Bounds;
  private _map!: L.Map;

  utils = {
    latLngToLayerPoint: (latLng: L.LatLngExpression, zoom?: number): L.Point => {
      zoom = zoom === undefined ? this._initialZoom : zoom;
      return this._map.project(L.latLng(latLng), zoom);
    },
    layerPointToLatLng: (point: L.Point, zoom?: number): L.LatLng => {
      zoom = zoom === undefined ? this._initialZoom : zoom;
      return this._map.unproject(L.point(point), zoom);
    },
    getScale: (zoom?: number): number => {
      if (zoom === undefined) return this._map!.getZoomScale(this._map!.getZoom(), this._initialZoom);
      return this._map.getZoomScale(zoom, this._initialZoom);
    },
    getRenderer: (): PIXI.Application => {
      return this._pixiApp;
    },
    getContainer: (): PIXI.Container => {
      return this._pixiContainer;
    },
    getMap: (): L.Map => {
      return this._map!;
    },
  };

  constructor(
    private _drawCallback: (utils: any, event?: L.LeafletEvent) => void,
    pixiApp: PIXI.Application,
    options?: L.LayerOptions
  ) {
    super();
    L.Util.setOptions(this, options);
    this._pixiApp = pixiApp;
    this._pixiContainer = this._pixiApp.stage;
  }

  onAdd(map: L.Map): this {
    this._map = map;
    this._initialZoom = map.getZoom();
    this._wgsOrigin = L.latLng([0, 0]);
    this._wgsInitialShift = map.project(this._wgsOrigin, this._initialZoom);
    this._mapInitialZoom = map.getZoom();

    this._addContainer();
    this._setEvents();

    this._update({ type: 'add' });
    return this;
  }

  _addContainer(): void {
    const container = this._pixiApp.canvas;
    container.style.position = 'absolute';
    this.getPane()?.appendChild(container);
  }

  _setEvents(): void {
    const events = this.getEvents();
    for (const evt in events) {
      this._map!.on(evt, events[evt], this);
    }
  }

  getEvents(): L.LeafletEventHandlerFnMap {
    return {
      zoom: this._onZoom,
      move: this._onMove,
      moveend: this._update,
    };
  }

  _onZoom(): void {
    this._updateTransform(this._map!.getCenter(), this._map!.getZoom());
  }

  _onMove(e: L.LeafletEvent): void {
    if (this.options.shouldRedrawOnMove?.(e)) {
      this._update(e);
    }
  }

  _updateTransform(center: L.LatLng, zoom: number): void {
    const scale = this._map!.getZoomScale(zoom, this._zoom);
    const viewHalf = this._map!.getSize().multiplyBy(0.5 + (this.options.padding || 0));
    const currentCenterPoint = this._map!.project(this._center, zoom);
    const topLeftOffset = viewHalf.multiplyBy(-scale).add(currentCenterPoint)
      .subtract(this._map!._getNewPixelOrigin(center, zoom));

    L.DomUtil.setTransform(this._pixiApp.view, topLeftOffset, scale);
  }

  _update(e: L.LeafletEvent): void {
    const p = this.options.padding || 0;
    const mapSize = this._map!.getSize();
    const min = this._map!.containerPointToLayerPoint(mapSize.multiplyBy(-p)).round();

    this._bounds = new L.Bounds(min, min.add(mapSize.multiplyBy(1 + p * 2)).round());
    this._center = this._map!.getCenter();
    this._zoom = this._map!.getZoom();

    this._redraw(this._bounds.min, e);
    L.DomUtil.setPosition(this._pixiApp.view, this._bounds.min);
  }

  _redraw(offset: L.Point, e: L.LeafletEvent): void {
    const scale = this._map!.getZoomScale(this._zoom, this._initialZoom);
    const shift = this._map!.latLngToLayerPoint(this._wgsOrigin)
      .subtract(this._wgsInitialShift.multiplyBy(scale))
      .subtract(offset);

    this._pixiContainer.scale.set(scale);
    this._pixiContainer.position.set(shift.x, shift.y);
    this._drawCallback(this.utils, e);
  }
}
