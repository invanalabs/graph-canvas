import { deepMerge } from "@/utils"
import { INodeStyle, NodeShapeBase, nodeStyleDefaults } from "../base"

export interface IRectangleStyle extends INodeStyle {
  radius: number
  width: number
  height: number
}


export const rectangleDefaults: IRectangleStyle = {
  ...nodeStyleDefaults,
  size: 5,
  width: 40,
  height: 10,
  radius: 3,
}

export class Rectangle extends NodeShapeBase {

  style: IRectangleStyle

  constructor(style: Partial<IRectangleStyle> = rectangleDefaults) {
    super();
    this.style = deepMerge(rectangleDefaults, style) as IRectangleStyle

    this.drawBase()
    this.setShapeStyle()
  }

  drawBase(): void {
    // draw circle
    this.roundRect(
      this.style.x,
      this.style.y,
      this.style.width * this.style.size,
      this.style.height * this.style.size,
      this.style.radius
    );
  }


}