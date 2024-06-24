// import * as PIXI from 'pixi.js';

// export class DraggableSprite extends PIXI.Sprite {
//     private dragData: PIXI.FederatedPointerEvent | null = null;
//     private dragPoint: PIXI.Point = new PIXI.Point();

//     constructor(texture: PIXI.Texture) {
//         super(texture);
//         this.interactive = true;
//         // this.buttonMode = true;
//         // this.anchor.set(0.5);

//         // Bind event handlers to this instance
//         this.onDragStart = this.onDragStart.bind(this);
//         this.onDragMove = this.onDragMove.bind(this);
//         this.onDragEnd = this.onDragEnd.bind(this);

//         // Attach event listeners
//         this.on('pointerdown', this.onDragStart);
//     }

//     private onDragStart(event: PIXI.FederatedPointerEvent): void {
//         this.dragData = event.data;
//         this.dragPoint.copyFrom(this.dragData.getLocalPosition(this.parent));
//         this.alpha = 0.5;

//         // Attach the global move and up listeners to the stage
//         this.parent.on('pointermove', this.onDragMove);
//         this.parent.on('pointerup', this.onDragEnd);
//         this.parent.on('pointerupoutside', this.onDragEnd);
//     }

//     private onDragMove(): void {
//         if (this.dragData) {
//             const newPosition = this.dragData.getLocalPosition(this.parent);
//             this.x = newPosition.x - this.dragPoint.x;
//             this.y = newPosition.y - this.dragPoint.y;
//         }
//     }

//     private onDragEnd(): void {
//         this.alpha = 1;
//         this.dragData = null;

//         // Remove the global move and up listeners from the stage
//         this.parent.off('pointermove', this.onDragMove);
//         this.parent.off('pointerup', this.onDragEnd);
//         this.parent.off('pointerupoutside', this.onDragEnd);
//     }
// }
