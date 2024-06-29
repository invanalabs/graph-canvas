import { NodeShapeBase } from "../../renderer/shapes/nodes"
import { CircleStyleDefaults } from "../../renderer/shapes/nodes/circle/defaults"
import { INodeStateTypes, INodeStyle } from "../../renderer/types"
import CanvasItemBase from "./base"
import { CanvasLink } from "./links"
import {  ICanvasNode } from "./types"


export class CanvasNode extends CanvasItemBase implements ICanvasNode {

  x: number = 0
  y: number = 0

  links: CanvasLink[] = [];
  neighbors: {nodes: CanvasNode[], links: CanvasLink[]} ;

  gfxInstance: NodeShapeBase | undefined = undefined

  state: INodeStateTypes = ":default"

  style: INodeStyle


  constructor(props: ICanvasNode){
    super(props)
    // position
    this.x = props.x || 0
    this.y = props.y || 0

    this.state = props.state ? props.state : ":default"
    this.links  =  []
    this.neighbors = {nodes:[], links: []}
    this.style = CircleStyleDefaults 
  }

  setLinks(links: CanvasLink[]){
    this.links = links
  }

  setState(stateName: INodeStateTypes){
    this.state = stateName
  }

  setNeighbors(neighbors: {nodes: CanvasNode[], links: CanvasLink[]}){
    this.neighbors = neighbors
  }


}
