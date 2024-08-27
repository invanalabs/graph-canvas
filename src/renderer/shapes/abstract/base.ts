
import * as PIXI from 'pixi.js';
import { CanvasLink, CanvasNode } from '../../../store';
import { IShapeState } from '../../types';
import { ArtBoard } from '../../../artBoard';
import { ICanvasShape } from '../types';
import { NodeContainerChildNames } from '../constants';
 

export abstract class ShapeAbstractBase implements ICanvasShape {

    data!: CanvasNode | CanvasLink
    artBoard: ArtBoard
    containerGfx: PIXI.Container;

    labelGfx?: PIXI.Graphics;
    shapeGfx!: PIXI.Graphics;
    debugBorderGfx?: PIXI.Graphics


    isLabelVisible: boolean = true
    isShapeVisible: boolean = true;

    // for state based graphics :hovered and :highlighted
    declare hoveredGfx: PIXI.Graphics;
    declare highlightedGfx: PIXI.Graphics;

    abstract processData(data: CanvasLink | CanvasNode): CanvasLink | CanvasNode;

    // neighbors
    abstract getNeighBors(): {nodes: CanvasNode[], links: CanvasLink[]}
    // layers
    abstract moveToFrontLayer(): void;
    abstract moveToDataLayer(): void;

    abstract setupInteractionTriggers(): void

    abstract drawShape(): PIXI.Graphics 
    abstract drawLabel(): PIXI.Graphics 
 

    constructor(data: CanvasNode | CanvasLink, artBoard: ArtBoard) {
        this.artBoard = artBoard;
        this.containerGfx = new PIXI.Container({ isRenderGroup: true }) // this will make moving this container GPU powered
        this.containerGfx.sortableChildren = true;
    }

    hideLabel = () => {
        console.debug("===hideLabel triggered", this.data.id)
        if (this.labelGfx) {
            this.labelGfx.visible = false
            this.data.isLabelVisible = false
        }
    }

    showLabel = () => {
        console.debug("===showLabel triggered", this.data.id)
        if (this.labelGfx) {
            this.labelGfx.visible = true
            this.data.isLabelVisible = true
        }
    }
    showLabelBg() {
        if (this.labelGfx) {
            const textBg = this.labelGfx.getChildByName(NodeContainerChildNames.labelBackground);
            if (textBg) {
                textBg.visible = true
                // textBg.fi
            }
        }
    }

    hideLabelBg() {
        if (this.labelGfx) {
            const textBg = this.labelGfx.getChildByName(NodeContainerChildNames.labelBackground);
            if (textBg) {
                textBg.visible = false
            }
        }
    }


    setInteractive(val: boolean = true) {
        console.log("=====setInteractive", val, this.data.isInteractive, this.data.is)
        this.containerGfx.interactive = val;
        if (val === true) {
            console.log("setInteractive is true")
            this.setInteractiveRecursive(this.containerGfx)
            this.setupInteractionTriggers()
        }
        else {
            this.removeInteractionTriggers();
        }
    }

    // Function to recursively set interactive and cursor properties on all children
    setInteractiveRecursive(container: PIXI.Container) {
        container.interactive = true;
        container.cursor = 'pointer';
        container.children.forEach((child) => {
            this.setInteractiveRecursive(child as PIXI.Graphics);
        });
    }


    removeInteractionTriggers() {
        this.containerGfx.removeAllListeners();
    }

    setState(stateName: IShapeState, setNeighborsToo: boolean = false, event?: PIXI.FederatedPointerEvent) {
        if (this.data.state === stateName) return
        this.artBoard.canvas.dataStore.setState(this.data, stateName, setNeighborsToo, event)
    }

    drawDebugBorder(x: number, y: number) {
        // Calculate the bounding box
        console.log("===drawDebugBorder", this.data.id, x, y)
        // const borderGfx = this.artBoard.viewport.getChildByName(NodeContainerChildNames.debugBorder)
        if (this.debugBorderGfx) {
            // const position = this.containerGfx.getBounds();
            // const position = this.containerGfx.getLocalBounds()
            this.debugBorderGfx.position.set(x, y)
        } else {
            const bounds = this.containerGfx.getBounds();
            // const position = event ? event.data.getLocalPosition(): {x: bounds.x, y: bounds.y}
            // Draw a debug box around the bounding box
            this.debugBorderGfx = new PIXI.Graphics();
            this.debugBorderGfx.label = NodeContainerChildNames.debugBorder
            this.debugBorderGfx.lineStyle(2, 0x00ff00);
            this.debugBorderGfx.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
            this.debugBorderGfx.endFill()
            this.containerGfx.addChild(this.debugBorderGfx);
        }
    }


    triggerMuted = (event?: PIXI.FederatedPointerEvent) => {
        // console.debug(`triggerMuted triggered on node - ${this.data.id}`);
        this.containerGfx.alpha = 0.2
        this.hideLabelBg()
    }

    triggerDefault = (event?: PIXI.FederatedPointerEvent) => {
        // console.debug(`triggerDefault triggered on node - ${this.data.id}`);
        this.containerGfx.alpha = 1;
        this.hideLabelBg()
        // this.containerGfx.visible = true
    }

    // triggerHidden = (event?: PIXI.FederatedPointerEvent) => {
    //   this.containerGfx.visible = false;
    // }

    triggerSelected = (event?: PIXI.FederatedPointerEvent,  setNeighborsToo: boolean = false) => {
        // console.debug(`Selected triggered on node - ${this.data.id}`);
        if (this.shapeGfx) {
            const shapeSelectedBorder = this.shapeGfx.getChildByName(NodeContainerChildNames.shapeSelectedBorder)
            if (shapeSelectedBorder) {
                shapeSelectedBorder.visible = true
            }
            this.triggerHighlighted(event, true)
            // this.triggerUnHighlighted(event)
        }
        if (setNeighborsToo ) {
            const neighbors = this.getNeighBors()
            neighbors.nodes.forEach((node: CanvasNode) => {
                node.gfxInstance?.triggerSelected()
            })
            neighbors.links.forEach((link: CanvasLink) => {
                link.gfxInstance?.triggerSelected()
            });
        }
        // this.moveToFrontLayer();
    }

    triggerUnSelected = (event?: PIXI.FederatedPointerEvent,  setNeighborsToo: boolean = false) => {
        // console.debug(`UnSelected triggered on node - ${this.data.id}`);
        if (this.shapeGfx) {
            const shapeSelectedBorder = this.shapeGfx.getChildByName(NodeContainerChildNames.shapeSelectedBorder)
            if (shapeSelectedBorder) {
                shapeSelectedBorder.visible = false
            }
            this.triggerUnHighlighted(event, true)
        }
        // this.moveToDataLayer()
             if (setNeighborsToo ) {
            const neighbors = this.getNeighBors()
            neighbors.nodes.forEach((node: CanvasNode) => {
                node.gfxInstance?.triggerUnSelected()
            })
            neighbors.links.forEach((link: CanvasLink) => {
                link.gfxInstance?.triggerUnSelected()
            });
        }
    }

    triggerHighlighted = (event?: PIXI.FederatedPointerEvent, setNeighborsToo: boolean = false) => {
        // console.debug(`triggerHighlighted on node - ${this.data.id}`);
        this.moveToFrontLayer()
        if (this.shapeGfx) {
            const shapeHighlightedBorder = this.shapeGfx.getChildByName(NodeContainerChildNames.shapeHighlightedBorder);
            if (shapeHighlightedBorder) {
                shapeHighlightedBorder.visible = true
            }
            // this.showLabel()
        }

        if (setNeighborsToo ) {
            const neighbors = this.getNeighBors()
            neighbors.nodes.forEach((node: CanvasNode) => {
                // node.gfxInstance?.triggerHighlighted()
                node.gfxInstance?.setState(":highlighted", false, event)
            })
            neighbors.links.forEach((link: CanvasLink) => {
                link.gfxInstance?.setState(":highlighted", false, event)
            });
        }
    }

    triggerUnHighlighted = (event?: PIXI.FederatedPointerEvent, setNeighborsToo: boolean = false) => {
        // console.debug(`triggerUnHighlighted on node - ${this.data.id}`);
        this.moveToDataLayer()
        if (this.shapeGfx) {
            const shapeHighlightedBorder = this.shapeGfx.getChildByName(NodeContainerChildNames.shapeHighlightedBorder);
            if (shapeHighlightedBorder) {
                shapeHighlightedBorder.visible = false
            }
            // this.hideLabel()

        }

        if (setNeighborsToo ) {
            const neighbors = this.getNeighBors()
            neighbors.nodes.forEach((node: CanvasNode) => {
                node.gfxInstance?.setState(":default", false, event)
            })
            neighbors.links.forEach((link: CanvasLink) => {
                link.gfxInstance?.setState(":default", false, event)
            });
        }

    }
    applyStateUpdate(setNeighborsToo: boolean = false, event?: PIXI.FederatedPointerEvent) {
        // if (this.data.id.toString().length === 1) {
        //     console.debug("pointer applyStateUpdate state", this.data.id, this.data.state)
        // }
        const stateName = this.data.state
        if (stateName === ":default") {
            this.triggerUnHighlighted(event, setNeighborsToo);
            this.triggerUnSelected(event)
            this.triggerDefault(event);
        }
        else if (stateName === ":highlighted") {
            this.triggerHighlighted(event, setNeighborsToo)
        }
        else if (stateName === ":selected") {
            this.triggerSelected(event)
        }
        else if (stateName === ":muted") {
            this.triggerUnHighlighted(event);
            this.triggerUnSelected(event)
            this.triggerMuted(event)
        }

    }

    draw(renderShape: boolean = true, renderLabel: boolean = true){
        console.log("====draw", renderShape, renderLabel)
        // clear shapeName first
        this.clear();
        // draw shapeName
        if (renderShape) {
            this.shapeGfx = this.drawShape();
            this.containerGfx.addChild(this.shapeGfx);
        }
        // draw label
        if (renderLabel) {
            this.labelGfx = this.drawLabel();
            if (this.labelGfx) { this.containerGfx.addChild(this.labelGfx); }
        }
        this.applyStateUpdate()
        this.setInteractive(this.data.isInteractive)
    }
    

    reDraw = (renderShape = true, renderLabel = true) => {
        console.log("reDraw ", this.data.id)
        this.draw(renderShape, renderLabel);
    }


    clear = () => {
        this.containerGfx.removeChildren();
        this.removeInteractionTriggers()
    }
    
    destroy(): void {
        this.containerGfx.destroy({ children: true, texture: true, textureSource: true, context: true, style: true });
    }
 
}


