import { deepMerge } from "@/utils";
import { INodeStyle, NodeShapeBase, nodeStyleDefaults } from "../base";

export const circleDefauts: ICircleStyle = nodeStyleDefaults

export interface ICircleStyle extends INodeStyle { }

export class Circle extends NodeShapeBase {

  style: ICircleStyle

  constructor(style: Partial<ICircleStyle> = circleDefauts) {
    super();
    this.style = deepMerge(circleDefauts, style) as ICircleStyle
    this.drawBase()
    this.setShapeStyle()
  }

  drawBase(): void {
    this.circle(this.style.x, this.style.y, this.style.size);
  }

}