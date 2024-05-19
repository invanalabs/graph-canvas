
import * as PIXI from 'pixi.js';
import { CanvasLink, CanvasNode } from '../types';
import GraphCanvas from '../../canvas/canvas';
import { NodeContainerChildNames } from '../constants';
import { NodeStyleDefaults } from '../defaults';
import { deepMerge } from '../../utils/merge';
import BaseShape from '../base';


export class NodeShapeBase extends BaseShape {
    declare originalData: CanvasNode;
    declare data: CanvasNode;
    declare dragPoint: PIXI.Point
    declare labelGfx: PIXI.Graphics;
    declare shapeGfx: PIXI.Graphics;


    constructor(data: CanvasNode, canvas: GraphCanvas) {
        super(data, canvas)
        this.data = this.processData(data)
        // setup intractions
        this.setupInteractions()
    }

    processData = (data: CanvasNode) => {
        console.log("======data.style before", data.group, JSON.stringify(data.style),)
        data.style = data.style ? deepMerge(NodeStyleDefaults, data.style) : NodeStyleDefaults
        console.log("======data.style after", data.group, JSON.stringify(data.style));
        data = { ...{ x: 0, y: 0 }, ...data }
        return data
    }

    setInactive = () => {
        console.log(`Inactive triggered on node - ${this.data.id}`);
        this.gfxContainer.alpha = 0.2
    }

    unSetInactive = () => {
        console.log(`unSetInactive triggered on node - ${this.data.id}`);
        this.gfxContainer.alpha = 1;
    }

    setHover = () => {
        console.log(`Hover triggered on node - ${this.data.id}`);
        if (this.shapeGfx) {
            const shapeHoveredBorder = this.shapeGfx.getChildByName(NodeContainerChildNames.shapeHoveredBorder)
            if (shapeHoveredBorder) {
                shapeHoveredBorder.visible = true
            }
        }        
    }

    setUnHover = () => {
        console.log(`UnHovered triggered on node - ${this.data.id}`);
        if (this.shapeGfx) {
            const shapeHoveredBorder = this.shapeGfx.getChildByName(NodeContainerChildNames.shapeHoveredBorder)
            if (shapeHoveredBorder) {
                shapeHoveredBorder.visible = false
            }
        }
    }

    setHoveredOnNeighbors = () => {
        console.log("=setHoveredOnNeighbors triggered")
        const neighbors: { nodes: CanvasNode[], links: CanvasLink[] } = this.canvas.graph.getNeighbors(this.data);
        console.log("getNeighbors", neighbors)
        neighbors.nodes.forEach((node: CanvasNode) => {
            node.gfxInstance?.setHover();
        })
        neighbors.links.forEach((link: CanvasLink) => {
            link.gfxInstance?.setHover();
        });
    }

    setUnHoveredOnNeighbors = () => {
        console.log("=setUnHoveredOnNeighbors triggered")
        const neighbors: { nodes: CanvasNode[], links: CanvasLink[] } = this.canvas.graph.getNeighbors(this.data);
        console.log("getNeighbors", neighbors)
        neighbors.nodes.forEach((node: CanvasNode) => {
            node.gfxInstance?.setUnHover();
        })
        neighbors.links.forEach((link: CanvasLink) => {
            link.gfxInstance?.setUnHover();
        });
    }

    setSelected = () => {
        console.log(`Select triggered on node - ${this.data.id}`);
        if (this.shapeGfx) {
            const shapeSelectedBorder = this.shapeGfx.getChildByName(NodeContainerChildNames.shapeSelectedBorder);
            if (shapeSelectedBorder) {
                shapeSelectedBorder.visible = true
            }
        }
    }

    setUnSelected = () => {
        console.log(`UnSelect triggered on node - ${this.data.id}`);
        if (this.shapeGfx) {
            const shapeSelectedBorder = this.shapeGfx.getChildByName(NodeContainerChildNames.shapeSelectedBorder);
            // console.log("shapeSelectedBorder", shapeSelectedBorder)
            if (shapeSelectedBorder) {
                shapeSelectedBorder.visible = false
            }
        }
    }

    setSelectedOnNeighbors = () => {
        console.log("=setSelectedOnNeighbors triggered")
        const neighbors: { nodes: CanvasNode[], links: CanvasLink[] } = this.canvas.graph.getNeighbors(this.data);
        console.log("getNeighbors", neighbors)
        neighbors.nodes.forEach((node: CanvasNode) => {
            node.gfxInstance?.setSelected();
        })
        neighbors.links.forEach((link: CanvasLink) => {
            link.gfxInstance?.setSelected();
        });
    }

    setUnSelectedOnNeighbors = () => {
        console.log("=setUnSelectedOnNeighbors triggered")
        const neighbors: { nodes: CanvasNode[], links: CanvasLink[] } = this.canvas.graph.getNeighbors(this.data);
        console.log("getNeighbors", neighbors)
        neighbors.nodes.forEach((node: CanvasNode) => {
            node.gfxInstance?.setUnSelected();
        })
        neighbors.links.forEach((link: CanvasLink) => {
            link.gfxInstance?.setUnSelected();
        });
    }

    pointerOver() {
        console.log("==node pointerOver", this.data.id)
        // this.canvas.graph.getNodes().forEach((node: CanvasNode) => {
        //     node.gfxInstance?.setInactive();
        // })
        // this.canvas.graph.getLinks().forEach((link: CanvasLink) => {
        //     link.gfxInstance?.setInactive();
        // })
        this.setHover();
        this.setHoveredOnNeighbors()
    }

    pointerOut() {
        console.log("==node pointerOut", this.data.id)
        // this.canvas.graph.getNodes().forEach((node: CanvasNode) => {
        //     node.gfxInstance?.unSetInactive();
        // })
        // this.canvas.graph.getLinks().forEach((link: CanvasLink) => {
        //     link.gfxInstance?.unSetInactive();
        // })
        this.setUnHover()
        this.setUnHoveredOnNeighbors()
    }



    onDragStart = (event: PIXI.FederatedPointerEvent) => {
        this.dragPoint = event.data.getLocalPosition(this.gfxContainer.parent);
        console.log("onDragStart triggered", this.dragPoint)
        event.stopPropagation();
        // this.dragPoint.x -= this.gfxContainer.x;
        // this.dragPoint.y -= this.gfxContainer.y;
        this.gfxContainer.parent.on("pointermove", this.onDragMove);
        this.setSelected()
        this.setSelectedOnNeighbors();
    };

    onDragMove = (event: PIXI.FederatedPointerEvent) => {
        const newPoint = event.data.getLocalPosition(this.gfxContainer.parent);
        console.log("onDragMove triggered", newPoint)
        console.log("onDragMove", newPoint, this.dragPoint)
        const x = newPoint.x //- this.dragPoint.x;
        const y = newPoint.y //- this.dragPoint.y;   
        this.canvas.graph.moveNodeTo(this.data.id, x, y)
        // update node positions data 
        const neighborLinks = this.canvas.graph.getNeighborLinks(this.data);
        this.canvas.renderer.reRenderLinks(neighborLinks)
        this.setSelectedOnNeighbors(); // TODO - fix this performance ; use stage=hovered/selected may be instead for re-render
    };

    onDragEnd = (event: PIXI.FederatedPointerEvent) => {
        console.log("onDragEnd triggered")
        event.stopPropagation()
        this.gfxContainer.parent.off("pointermove", this.onDragMove);
        this.setUnSelected();
        this.setUnSelectedOnNeighbors();
    };

    setupInteractions() {
        console.log("===setupInteractions triggered")
        // Remove all listeners
        this.gfxContainer.removeAllListeners();

        // listeners for hover effect
        this.gfxContainer
            .on("pointerover", this.pointerOver.bind(this))
            .on("pointerout", this.pointerOut.bind(this))
            .on('pointerdown', this.onDragStart.bind(this))
            .on('pointerup', this.onDragEnd.bind(this))
            .on('pointerupoutside', this.onDragEnd.bind(this))
    }

    draw = (renderShape = true, renderLabel = true) => {
        // clear shape first
        this.clear();
        // draw shape
        if (renderShape) {
            this.gfxContainer.x = this.data.x;
            this.gfxContainer.y = this.data.y;
            this.shapeGfx = this.drawShape();
            this.gfxContainer.addChild(this.shapeGfx);
        }

        // draw label
        if (renderLabel) {
            this.labelGfx = this.drawLabel();
            if (this.labelGfx) {
                this.gfxContainer.addChild(this.labelGfx);
            }
        }

        // update the position 
        if (renderShape) {
            if (this.data.x && this.data.y) {
                this.setGfxPosition(this.data?.x, this.data?.y)
            }
        }

        this.setState(this.data.state)
    }
}