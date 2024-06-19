import { LinkShapeType, NodeShapeType, ShapeLabelType } from "./styles";


export type INodeStateTypes =  ':default' | ':hovered' | ':selected' | ':inactive' | ':hidden'; 
export type ILinkStateTypes =  ':default' | ':hovered' | ':selected' | ':inactive' | ':hidden';


export interface INodeStyle {
  size: number
  shapeName: NodeShapeType
  label: ShapeLabelType
  states: {
      [key in  INodeStateTypes] : INodeStyle
  }
}

export interface ILinkStyle {
  shapeName: LinkShapeType
  label: ShapeLabelType
  states: {
      [key in  ILinkStateTypes] : ILinkStyle
  }
}