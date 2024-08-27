import * as PIXI from 'pixi.js';
import { CanvasLink, CanvasNode } from '../../store';
import { IShapeState } from '../types';
 

export type INodeShapeTypes = 'circle'; //| 'square' | 'rectangle' | 'traingle';
export type ILinkShapeTypes = 'straight'; //| 'quadratic' | 'loop';


export interface ICanvasShape {

  isLabelVisible: boolean;
  isShapeVisible: boolean;

  // shapes::base
  containerGfx: PIXI.Container;
  shapeGfx: PIXI.Graphics;
  // shapes::conditionally rendered shapes 
  labelGfx?: PIXI.Graphics | undefined;
  hoveredGfx: PIXI.Graphics;
  highlightedGfx: PIXI.Graphics;
  debugBorderGfx?: PIXI.Graphics;

  // data
  data: CanvasLink | CanvasNode;
  processData(data: CanvasLink | CanvasNode): CanvasLink | CanvasNode;


  getNeighBors(): {nodes: CanvasNode[], links: CanvasLink[]}

  // state:
  setState(state: IShapeState, setNeighborsToo: boolean, event?: PIXI.FederatedPointerEvent): void;
  applyStateUpdate(setNeighborsToo?: boolean, event?: PIXI.FederatedPointerEvent): void;
  // state:default
  triggerDefault(event?: PIXI.FederatedPointerEvent): void;
  // state:highlighted
  triggerHighlighted(event?: PIXI.FederatedPointerEvent, setNeighborsToo?: boolean): void;
  triggerUnHighlighted(event?: PIXI.FederatedPointerEvent, setNeighborsToo?: boolean): void;
  // state:selected
  triggerSelected(event?: PIXI.FederatedPointerEvent): void;
  triggerUnSelected(event?: PIXI.FederatedPointerEvent): void;
  // state:muted
  triggerMuted(event?: PIXI.FederatedPointerEvent): void;

  // interactions
  setupInteractionTriggers(): void;
  removeInteractionTriggers(): void;
  // interactions: setup
  setInteractive(val?: boolean): void;
  setInteractiveRecursive(container: PIXI.Container): void;

  // drawing
  drawShape(): PIXI.Graphics | undefined;
  drawLabel(): PIXI.Graphics | undefined;
  draw(options: { renderShape?: boolean; renderLabel?: boolean }): void;
  reDraw(): void;
  clear(): void;
  destroy(): void;

  // layers
  moveToFrontLayer(): void;
  moveToDataLayer(): void;

  // shape::label
  hideLabel(): void;
  showLabel(): void;
  // shape::label::bg
  hideLabelBg(): void;
  showLabelBg(): void;

}


export interface INodeShape extends ICanvasShape {

  // hover
  onPointerOver(event: PIXI.FederatedPointerEvent): void
  onPointerOut(event: PIXI.FederatedPointerEvent): void
  // click
  onPointerDown(event: PIXI.FederatedPointerEvent): void
  onPointerUp(event: PIXI.FederatedPointerEvent): void
  onPointerUpOutside(event: PIXI.FederatedPointerEvent): void
  // dragging
  onDragStart(event: PIXI.FederatedPointerEvent): void
  onDragMove(event: PIXI.FederatedPointerEvent): void
  onDragEnd(event: PIXI.FederatedPointerEvent): void

  reDrawNeighbors(): void

}


export interface ILinkShape extends ICanvasShape {

  sourcePoint: PIXI.Point
  targetPoint: PIXI.Point

  // hover
  onPointerOver(event: PIXI.FederatedPointerEvent): void
  onPointerOut(event: PIXI.FederatedPointerEvent): void
  // click
  pointerDown(event: PIXI.FederatedPointerEvent): void
  pointerUp(event: PIXI.FederatedPointerEvent): void
  pointerUpOutside(event: PIXI.FederatedPointerEvent): void


  calcStartAndEndPoints(): void
  calcLabelPosition(): void
  calcLabelAngle(): void


} 