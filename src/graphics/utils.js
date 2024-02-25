 


export const findPivot = (x, y, angle, radius) => [
    x + Math.cos(angle) * radius,
    y + Math.sin(angle) * radius
  ]
  
  export const midPoint = (sx, sy, tx, ty) => [(sx + tx) / 2, (sy + ty) / 2]
  
  export const length = (sx, sy, tx, ty) => Math.hypot(tx - sx, ty - sy)
  
  export const angle = (sx, sy, tx, ty) => {
    const angle = Math.atan2(sy - ty, sx - tx)
    return angle < 0 ? angle + TWO_PI : angle
  }
  

export const HALF_PI = Math.PI / 2

export const TWO_PI = Math.PI * 2

export const THREE_HALF_PI = HALF_PI * 3