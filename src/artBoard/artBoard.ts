import { ArtBoardBase } from "./base";
import { GraphCanvas } from "../canvas";
import { TextureSource } from "pixi.js";


export class ArtBoard extends ArtBoardBase {


  constructor(canvas: GraphCanvas) {
    super(canvas);
    this.disableDefaultBrowserDoubleClick()
  }

  disableDefaultBrowserDoubleClick() {

    document.addEventListener('mousedown', function (event) {
      if (event.detail > 1) {
        event.preventDefault();
        // of course, you still do not know what you prevent here...
        // You could also check event.ctrlKey/event.shiftKey/event.altKey
        // to not prevent something useful.
      }
    }, false);
  }



  // round = (value: number) => Math.round(value * 1000) / 1000;

  // updateVisibility = () => {

  //   const _this = this;
  //   // culling
  //   // const cull = new Cull();
  //   // cull.addAll(nodesLayer.children);
  //   // cull.addAll(labelsLayer.children);
  //   // cull.addAll(linksLayer.children);
  //   // cull.cull(app.renderer.screen);



  //   // Create a cull instance
  //   this.cull.addAll(this.viewport.children); // Add the viewport's children to be culled
  //   this.cull.cull(this.pixiApp.renderer.screen);


  //   // console.log(
  //   //   [...cull._targetList].filter(x => x.visible === true).length,
  //   //   [...cull._targetList].filter(x => x.visible === false).length
  //   // );

  //   // levels of detail
  //   const zoom = _this.viewport.scale.x;
  //   const zoomSteps = [0.1, 0.2, 0.4, Infinity];
  //   const zoomStep = zoomSteps.findIndex(zoomStep => zoom <= zoomStep);

  //   _this.canvas.dataStore.getNodes().forEach((node: CanvasNode) => {
  //     // const nodeGfx = nodeDataToNodeGfx.get(nodeData);
  //     // const circleBorder = nodeGfx.getChildByName(CIRCLE_BORDER);
  //     // const icon = nodeGfx.getChildByName(ICON);
  //     // const labelGfx = nodeDataToLabelGfx.get(nodeData);
  //     // const label = labelGfx.getChildByName(LABEL);
  //     // const labelBackground = labelGfx.getChildByName(LABEL_BACKGROUND);

  //     // if (node.gfxInstance) {
  //     //   //@ts-ignore
  //     //   node.gfxInstance?.labelGfx.visible = zoomStep >= 2;

  //     // }


  //     // circleBorder.visible = zoomStep >= 1;
  //     // icon.visible = zoomStep >= 2;
  //     // label.visible = zoomStep >= 3;
  //     // labelBackground.visible = zoomStep >= 3;
  //   });

  //   _this.canvas.dataStore.getLinks().forEach((link: CanvasLink) => {
  //     // const linkGfx = linkDataToLinkGfx.get(linkData);
  //     // const line = linkGfx.getChildByName(LINE);
  //     // if (link.gfxInstance) {
  //     //   //@ts-ignore
  //     //   link.gfxInstance?.labelGfx.visible = zoomStep >= 1;
  //     // }
  //   });



  // };

  // async loadFont(fontFamilyname: string, fontPath: string){
  //   // https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/webfonts/fa-solid-900.woff2
  //   const font = new FontFace(fontFamilyname, 'url('+fontPath+')');
  //   font.load().then(function(loadedFont) {
  //     // Add the font to the document
  //     console.log("font loaded ", fontFamilyname )
  //     document.fonts.add(loadedFont);
  //   })

  // }

  // draw() {
  //   this.renderer.render()
  // }



  destroy() {
    if (!this.isDestroyed) {
      this.pixiApp.destroy(true, { children: true, texture: true, textureSource: true, context: true, style: true });
      this.isDestroyed = true; // Set the custom flag to true
      // Remove the canvas element from the DOM
      // if (this.pixiApp.canvas && this.pixiApp.canvas.parentNode) {
      //   this.pixiApp.canvas.parentNode.removeChild(this.pixiApp.canvas);
      // }
      // Optionally, nullify the reference to the canvas
      // this.pixiApp.canvas = null;
      console.log("The PIXI app and canvas have been destroyed.");
    }
  }

}