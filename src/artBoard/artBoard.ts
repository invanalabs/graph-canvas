import { ArtBoardBase } from "./base";
import { Camera } from "./camera";
import { GraphCanvas } from "../canvas";
import { Renderer } from "../renderer/renderer";
// import { Cull } from '@pixi-essentials/cull';
import { ILinkStateUpdateEventData, INodeStateUpdateEventData, OnLinkAddedEventData,
  OnNodeAddedEventData, OnNodeDeletedEventData, OnNodeLinksUpdatedEventData, OnNodePositionUpdatedEventData } from "../store/events/types";
import { CanvasLink } from "../store";



export class ArtBoard extends ArtBoardBase {

  renderer: Renderer
  camera: Camera
  // cull: Cull

  constructor(canvas: GraphCanvas) {
    super(canvas)
    this.canvas = canvas
    this.renderer = new Renderer(this)
    this.camera = new Camera(this)
    this.setUpRenderOnEventListers()
  }

  setUpRenderOnEventListers() {

    this.canvas.dataStore.on('node:data:onAdded', ({ id, node }: OnNodeAddedEventData) => {
      console.log("node:data:onAdded", id, node);
      this.renderer.renderNode(node)
    });

    this.canvas.dataStore.on('node:gfx:onMoved', ({ id, node }: OnNodePositionUpdatedEventData) => {
      console.log("node:gfx:onMoved updatedto", id, node.x, node.y);
      node.gfxInstance?.setPosition(node.x, node.y);
      // redraw links too 
      node.links.forEach((link_: CanvasLink) => {
        const link = this.canvas.dataStore.links.get(link_.id)
        if (link)
        link.gfxInstance?.redraw();
      })
    });

    this.canvas.dataStore.on("node:gfx:onStateUpdated", ({id, node, state, event, setNeighborsToo}: INodeStateUpdateEventData)=>{
      console.log("node:gfx:onStateUpdated", id, state);
      if (node)
      node.gfxInstance?.applyStateUpdate(setNeighborsToo, event)
    })

    this.canvas.dataStore.on("link:gfx:onStateUpdated", ({id, link, state, event, setNeighborsToo}: ILinkStateUpdateEventData)=>{
      console.log("link:gfx:onStateUpdated", id, state);
      if (link)
      link.gfxInstance?.applyStateUpdate(setNeighborsToo, event)
    })

    // add link:data:onAdded event listener
    this.canvas.dataStore.on('link:data:onAdded', ({ id, link }: OnLinkAddedEventData) => {
      console.log("link:data:onAdded", id, link);
      this.renderer.renderLink(link);
    });

    // add node:data:onDeleted event listener
    this.canvas.dataStore.on('node:data:onDeleted', ({ id, node }: OnNodeDeletedEventData) => {
      console.log("node:data:onDeleted", id, node);
    });

    // add "link:data:onDeleted" event listener
    this.canvas.dataStore.on('link:data:onDeleted', ({ id, link }: OnLinkAddedEventData) => {
      console.log("link:data:onDeleted", id, link);
    });

    // add "link:data:onDeleted" event listener
    this.canvas.dataStore.on('node:data:onLinksUpdated', ({ id, node }: OnNodeLinksUpdatedEventData) => {
      console.log("node:data:onLinksUpdated", id, node);
    });







  }


  round = (value: number) => Math.round(value * 1000) / 1000;

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

  draw() {
    this.renderer.renderAll()
  }

  clear() {
    this.renderer.clear()
  }

}