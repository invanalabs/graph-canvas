
import * as PIXI from 'pixi.js';
import { CanvasLink } from '../types';
import GraphCanvas from '../../canvas/canvas';
import { LinkStyleDefaults } from '../defaults';
import { deepMerge } from '../../utils/merge';
import BaseShape from '../base';
import drawStraightLineShape from '../../primitives/lines/straightLine';
import drawArrowHeadShape from '../../primitives/arrowHead';
import drawLabelShape from '../../primitives/label';
import { LinkContainerChildNames } from '../constants';


export class LinkShapeBase extends BaseShape {

    declare data: CanvasLink
    declare originalData: CanvasLink;
    declare labelGfx: PIXI.Graphics;
    declare shapeGfx: PIXI.Graphics;

    constructor(data: CanvasLink, canvas: GraphCanvas) {
        super(data, canvas)
        this.data = this.processData(data)
        this.shapeGfx = new PIXI.Graphics();
        this.labelGfx = new PIXI.Graphics();

        // setup intractions
        this.setupInteractions()
    }

    processData = (data: CanvasLink) => {
        data.style = data.style ? deepMerge(LinkStyleDefaults, data.style) : LinkStyleDefaults
        return data;
    }

    setInactive = () => {
        console.log(`Inactive triggered on link - ${this.data.id}`);
        this.gfxContainer.alpha = 0.2
    }

    unSetInactive = () => {
        console.log(`unSetInactive triggered on link - ${this.data.id}`);
        this.gfxContainer.alpha = 1;
    }

    setHover = () => {
        console.log(`Hover triggered on link - ${this.data.id}`);
        if (this.shapeGfx) {
            const shapeHoveredBorder = this.shapeGfx.getChildByName(LinkContainerChildNames.shapeHoveredBorder)
            if (shapeHoveredBorder) {
                shapeHoveredBorder.visible = true
            }
        }
    }

    setUnHover = () => {
        console.log(`UnHover triggered on link - ${this.data.id}`);
        if (this.shapeGfx) {
            const shapeHoveredBorder = this.shapeGfx.getChildByName(LinkContainerChildNames.shapeHoveredBorder)
            if (shapeHoveredBorder) {
                shapeHoveredBorder.visible = false
            }
        }
    }


    setSelected = () => {
        console.log(`setSelected triggered on link - ${this.data.id}`);
        if (this.shapeGfx) {
            const shapeHoveredBorder = this.shapeGfx.getChildByName(LinkContainerChildNames.shapeHoveredBorder)
            if (shapeHoveredBorder) {
                shapeHoveredBorder.visible = true
            }
        }
    }

    setUnSelected = () => {
        console.log(`setUnSelected triggered on link - ${this.data.id}`);
        if (this.shapeGfx) {
            const shapeHoveredBorder = this.shapeGfx.getChildByName(LinkContainerChildNames.shapeHoveredBorder)
            if (shapeHoveredBorder) {
                shapeHoveredBorder.visible = false
            }
        }
    }
    pointerOver() {
        console.log("==link pointerOver", this.data.id)
        this.setHover()
    }

    pointerOut() {
        console.log("==link pointerOut", this.data.id)
        this.setUnHover()
    }



    setupInteractions() {
        console.log("===setupInteractions triggered on link", this.gfxContainer)
        // Remove all listeners
        this.gfxContainer.removeAllListeners();

        // listeners for hover effect
        this.gfxContainer
            .on("pointerover", this.pointerOver.bind(this))
            .on("pointerout", this.pointerOut.bind(this))
    }

    calcLabelPosition = (labelGfx: PIXI.Graphics, shapeGfx: PIXI.Graphics) => {
        console.error("calcLabelPosition Not Implemented")
    }

    calcLabelAngle = (shapeGfx: PIXI.Graphics) => {
        console.error("calcLabelAngle Not Implemented")
    }

    calcStartAndEndPoints = () => {
        console.error("calcStartAndEndPoints not Implemented")
    }

    // calcArrowAngle = (arrow: PIXI.Graphics, startPoint: PIXI.Point, endPoint: PIXI.Point,  points: number[], ) => {
    //     console.error("calcArrowAngle not implemented")
    // }

    // drawArrow = (startPoint: PIXI.Point, endPoint: PIXI.Point) => {
    //     const arrow = drawArrowHeadShape({startPoint, endPoint, ...this.data.style?.shape})
    //     return arrow;
    // }

    drawLabel = () => {
        console.log("Line.drawLabel")
        // const labelString = this.data.label ? this.data.label : `${this.data.source?.id}-->${this.data.target?.id}`
        if (this.data.label) {
            const labelGfx = drawLabelShape({ label: this.data.label, ...this.data.style?.label })
            labelGfx.name = LinkContainerChildNames.label
            return labelGfx
        } else {
            return new PIXI.Graphics()
        }
    }

    // drawPath = (shapeLine: PIXI.Graphics, startPoint: PIXI.Point, endPoint: PIXI.Point) => {
    //     console.error("Not implemented");

    // }

    drawShape = () => {
        console.log("Line.drawShape triggered", this.data)

        let { startPoint, endPoint } = this.calcStartAndEndPoints();
        // console.log("startPoint, endPoint", JSON.stringify(startPoint), JSON.stringify(endPoint))
        // let shape = new PIXI.Graphics();
        this.shapeGfx.removeChildren();
        this.shapeGfx.name = LinkContainerChildNames.shape


        // draw path
        const shapeLine = drawStraightLineShape({ startPoint, endPoint, ...this.data.style?.shape })
        shapeLine.name = LinkContainerChildNames.shapeLine
        shapeLine.zIndex = 1000

        // add arrow
        const arrow = drawArrowHeadShape({ startPoint, endPoint, ...this.data.style?.shape })

        shapeLine.addChild(arrow)
        this.shapeGfx.addChild(shapeLine)

        // shape hoveredBorder
        // const shapeHoveredBorder = new PIXI.Graphics();
        const shapeHoveredBorder = drawStraightLineShape({ startPoint, endPoint, ...this.data.style.states[':hovered'].shape })
        shapeHoveredBorder.visible = false
        shapeHoveredBorder.name = LinkContainerChildNames.shapeHoveredBorder
        // shapeHoveredBorder.zIndex = 10
        const hoveredArrow = drawArrowHeadShape({ startPoint, endPoint, ...this.data.style?.states[':hovered'].shape })
        shapeHoveredBorder.addChild(hoveredArrow)


        this.shapeGfx.addChild(shapeHoveredBorder)
        // shapeLine.closePath()

        return this.shapeGfx
    }

    // renderShape=true, renderLabel=true
    draw = (renderShape = true, renderLabel = true) => {
        // clear shape first
        console.log(`draw renderShape=${renderShape}; renderLabel=${renderLabel}`)

        // draw shape
        if (renderShape) {
            if (this.shapeGfx) {
                this.shapeGfx.removeChildren();
            }
            this.shapeGfx = this.drawShape();
            this.gfxContainer.addChild(this.shapeGfx);
        }
        // draw label
        if (renderLabel) {
            this.labelGfx = this.drawLabel();
            this.gfxContainer.addChild(this.labelGfx);
        }

        if (renderShape) {
            this.calcLabelPosition(this.labelGfx, this.shapeGfx)
        }

        this.setState(this.data.state)

    }
}
