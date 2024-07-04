import { NodeShapeBase } from "../../renderer/shapes/nodes"
import { CircleStyleDefaults } from "../../renderer/shapes/nodes/circle/defaults"
import { INodeStyle, IShapeState } from "../../renderer/types"
import CanvasItemBase from "./base"
import { CanvasLink } from "./links"
import {  ICanvasNode } from "./types"


export class CanvasNode extends CanvasItemBase implements ICanvasNode {

  x: number = 0
  y: number = 0

  icon?: string;

  links: CanvasLink[] = [];
  neighbors: {nodes: CanvasNode[], links: CanvasLink[]} ;

  gfxInstance: NodeShapeBase | undefined = undefined

  state: IShapeState = ":default"

  style: INodeStyle


  constructor(props: ICanvasNode){
    super(props)
    // position
    this.x = props.x || 0
    this.y = props.y || 0

    this.icon = props.icon;

    this.state = props.state ? props.state : ":default"
    this.links  =  []
    this.neighbors = {nodes:[], links: []}
    this.style = CircleStyleDefaults 
  }

  setLinks(links: CanvasLink[]){
    this.links = links
  }

  setState(stateName: IShapeState){
    this.state = stateName
  }

  setNeighbors(neighbors: {nodes: CanvasNode[], links: CanvasLink[]}){
    this.neighbors = neighbors
  }


}
