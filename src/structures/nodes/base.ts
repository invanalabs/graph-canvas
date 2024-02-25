import { INode, ILink } from "../../canvas/types";
import * as PIXI from 'pixi.js';



export abstract class BaseShape {
    constructor() {}

    abstract draw(data: INode | ILink): PIXI.Container<PIXI.DisplayObject>;
    abstract update(data: INode | ILink): void;
}
  