import { ArtBoardBase } from "./base";
import { GraphCanvas } from "../canvas";


export class ArtBoard extends ArtBoardBase {


  constructor(canvas: GraphCanvas) {
    super(canvas)
    this.canvas = canvas
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
    this.pixiApp.destroy()
  }

}