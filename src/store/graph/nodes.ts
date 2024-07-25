import { NodeShapeBase } from "../../renderer/shapes/nodes"
import { NodeStyleDefaults } from "../../renderer/shapes/nodes/circle/defaults"
import { INodeStyle, IShapeState } from "../../renderer/types"
import { deepMerge } from "../../utils/merge"
import CanvasItemBase from "./base"
import { CanvasLink } from "./links"
import {  ICanvasNode } from "./types"


export class CanvasNode extends CanvasItemBase implements ICanvasNode {

  x: number = 0
  y: number = 0

  icon?: string;
  image?: string

  links: CanvasLink[] = [];
  neighbors: {nodes: CanvasNode[], links: CanvasLink[]} ;

  degree?: {
    incoming: number,
    outgoing: number,
    total: number
  }


  gfxInstance: NodeShapeBase | undefined = undefined

  state: IShapeState = ":default"

  style: INodeStyle = NodeStyleDefaults


  constructor(props: ICanvasNode){
    super(props)
    // position
    this.x = props.x || 0
    this.y = props.y || 0

    this.icon = props.icon;
    this.image = props.image;

    this.state = props.state ? props.state : ":default"
    this.links  =  []
    this.neighbors = {nodes:[], links: []}
    this.degree = {
      incoming: 0,
      outgoing: 0,
      total: 0,
    }

    if (this.id === "Valjean"){
      console.log("=====ICanvasNode node.id ", this.style, JSON.stringify(props.style))
    }

    // this.style = NodeStyleDefaults 
    this.style = deepMerge( NodeStyleDefaults,  props?.style || {})
    // this.style = props?.style



  }

  setLinks(links: CanvasLink[]){
    this.links = links
  }

  setState(stateName: IShapeState){
    this.state = stateName
  }

  setNeighbors(neighbors: {nodes: CanvasNode[], links: CanvasLink[]}){
    this.neighbors = neighbors
    this.degree = {
      incoming: 0,
      outgoing: 0,
      total: this.links.length,
    }
  }


}
