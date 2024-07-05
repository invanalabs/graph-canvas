import {  Graphics } from 'pixi.js';


export const createDebugPoint = (color:string="#ffff00", size: number = 2, opacity: number=0.5) => {
  const gfx = new Graphics()
  gfx.beginFill(color, opacity);
  gfx.drawCircle(0, 0, size);
  gfx.endFill();
  return gfx
}