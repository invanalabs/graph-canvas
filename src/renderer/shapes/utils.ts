import {  Graphics } from 'pixi.js';


export const createDebugPoint = (x: number, y: number) => {
  const gfx = new Graphics()
  gfx.beginFill(0xFFFF00);
  gfx.drawCircle(x, y, 5);
  gfx.endFill();
  return gfx
}