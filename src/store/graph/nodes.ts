import { NodeShapeBase } from "../../renderer/shapes/nodes"
import { NodeStyleDefaults } from "../../renderer/shapes/nodes/circle/defaults"
import { INodeStyle, IShapeState } from "../../renderer/types"
import { deepMerge } from "../../utils/merge"
import CanvasItemBase from "./base"
import { CanvasLink } from "./links"
import {  ICanvasNode } from "./types"


export class CanvasNode extends CanvasItemBase implements ICanvasNode {


  // _x: number = 0
  // _y: number = 0

  x: number = 0
  y: number = 0

  // used to detect the change in the position
  previousX: number = 0
  previousY: number = 0

  icon?: string;
  image?: string

  shapeName?: 'circle' 

  // links: CanvasLink[] = [];
  neighbors: {nodes: CanvasNode[], links: CanvasLink[]} ;

  degree?: {
    incoming: number,
    outgoing: number,
    total: number
  }


  gfxInstance: NodeShapeBase | undefined = undefined

  state: IShapeState = ":default"

  style: INodeStyle = NodeStyleDefaults


  isHoverable = true
  isSelectable = true
  isDraggable = true

  constructor(props: ICanvasNode){
    super(props)
    // position
    this.x = props.x || 0
    this.y = props.y || 0

    this.icon = props.icon;
    this.image = props.image;

    this.shapeName = props.shapeName? props.shapeName :  "circle"

    this.state = props.state ? props.state : ":default"
    this.neighbors = {nodes:[], links: []}
    this.degree = {
      incoming: 0,
      outgoing: 0,
      total: 0,
    }

    // this.style = NodeStyleDefaults 
    this.style = deepMerge( NodeStyleDefaults,  props?.style || {})
    // this.style = props?.style


    this.isHoverable = props.isHoverable === undefined ? true : props.isHoverable 
    this.isSelectable = props.isSelectable === undefined ? true : props.isSelectable
    this.isDraggable = props.isDraggable === undefined ? true : props.isDraggable  


    // this.isHoverable = props.isHoverable === undefined || props.isHoverable === true ? true : false 
    // this.isSelectable = props.isSelectable === undefined || props.isSelectable === true ? true : false 
    // this.isDraggable = props.isDraggable === undefined || props.isDraggable === true ? true : false  
  }

  toJson(): ICanvasNode{
    return {
      id: this.id,
      group: this.group,
      label: this.label,
      properties: this.properties,
      shapeName: this.shapeName,
      x: this.x,
      y: this.y
    }
  }

  // setLinks(links: CanvasLink[]){
  //   this.links = links
  // }

  setState(stateName: IShapeState){
    this.state = stateName
  }

  setNeighbors(neighbors: {nodes: CanvasNode[], links: CanvasLink[]}){
    this.neighbors = neighbors
    // this.links = neighbors.links;
    this.degree = {
      incoming: 0,
      outgoing: 0,
      total: neighbors.links.length,
    }
  }

  setStyle(style: INodeStyle) {
    this.style = style
  }

  updateNodePosition( x: number, y: number) {
    // console.log("==updateNodePosition", x,y, this.x, this.y) 
      if (this.previousX !== x && this.previousY !== y){
        // console.log("######updateNodePosition", x, y)
        this.previousX = this.x;
        this.previousY = this.y;
        this.x = x;
        this.y = y;
        
        this.gfxInstance?.setPosition(x, y)
      }
  }

  getMaxHeight(){
    const padding = 2;
    return this.style.size + this.style.states?.[":selected"].shape?.border.thickness 
    + this.style.states?.[":highlighted"].shape?.border.thickness + (padding * 2)
  }

  getMaxWidth(){
    const padding = 2;
    return this.style.size + this.style.states?.[":selected"].shape?.border.thickness 
    + this.style.states?.[":highlighted"].shape?.border.thickness + (padding * 2)
  }
  // redrawNeighbors(){
  //   this.neighbors.links.forEach((link_: CanvasLink) => {
  //     const link = this.artBoard.canvas.dataStore.links.get(link_.id)
  //     if (link)
  //       link.gfxInstance?.redraw();
  //   })
  // }

  // get x() {
  //   return this._x;
  // }

  // set x(n: number) {
  //   this._x = n;
  // }

  // get y() {
  //   return this._y;
  // }

  // set y(n: number) {
  //   this._y = n;
  // }
  // reCalculateStyle(){
  //   console.error("reCalculateStyle implemented")
  // }
}
