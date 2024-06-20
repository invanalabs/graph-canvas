import { ILinkShapeStyle, INodeShapeStyle, IShapeLabelStyle } from "./styles";


export type INodeStateTypes =  ':default' | ':hovered' | ':selected' | ':inactive' | ':hidden'; 
export type ILinkStateTypes =  ':default' | ':hovered' | ':selected' | ':inactive' | ':hidden';


export interface INodeStyle {
  size: number
  shape: INodeShapeStyle
  label: IShapeLabelStyle
  states: {
      [key in  INodeStateTypes] : INodeStyle
  }
}

export interface ILinkStyle {
  shape: ILinkShapeStyle
  label: IShapeLabelStyle
  states: {
      [key in  ILinkStateTypes] : ILinkStyle
  }
}