import React from "react";
import Graphin, {Behaviors, Components} from "@antv/graphin";
import {Grid, Toolbar} from "@antv/graphin-components";
import {handleToolBarClick, toolBarOptions} from "../plugins/toolbar";
import "@antv/graphin-icons/dist/index.css";
import {NodeContextMenu} from "../plugins/contextMenu";
import {defaultLayoutSettings, miniMapOptions} from "./settings";
import {defaultNodeStyle} from "./settings";
import PropTypes from 'prop-types';
import "./style.css";

const {
    DragCanvas, // Drag the canvas
    ZoomCanvas, //Zoom canvas
    ClickSelect, // Click to select the node
    BrushSelect, //Circle selection operation
    DragNode, // Drag node
    // ResizeCanvas, // automatically adjust canvas width and height
    LassoSelect, // Lasso operation
    DragCombo, // Drag Combo
    ActivateRelations, // associated highlight
    Hoverable // Hover operation,
    // DragNodeWithForce
} = Behaviors;

const {MiniMap} = Components;
const {ContextMenu} = Components;


// @ts-ignore
function GraphCanvasComponent({data, containerId, width, height}) {
    console.log(data);


    // const canvasWidth = container.scrollWidth;
    // const canvasHeight = container.scrollHeight || 600;

    // const getContainer = () => {
    //     return
    // }
    // const getCanvasWidth = () => {
    //     return width ;
    // }
    // const getCanvasHeight = () => {
    //     return height - 30
    // }


    return (
        <div className="grid-plugin-container graph-canvas-container" style={{width: width, height: height}} >
            <Graphin
                data={data}
                className={"graph-canvas"}
                layout={defaultLayoutSettings}
                containerId={containerId}
                defaultNodeStyle={defaultNodeStyle}
                // style={{
                //     "position": "absolute",
                //     "width": getCanvasWidth(),
                //     "height": getCanvasHeight(),
                //     "bottom": 0
                // }}
            >
                <Grid/>
                <MiniMap options={miniMapOptions}/>
                <ZoomCanvas enableOptimize/>
                {/* Drag and Drop Canvas */}
                <DragCanvas/>
                {/* Zoom Canvas */}
                <ZoomCanvas/>
                {/* Drag-and-drop node */}
                <DragNode/>
                {/* Click Node */}
                <DragCombo/>
                {/* Click Node */}
                <ClickSelect/>
                {/* Circle Node */}
                <BrushSelect/>
                <ActivateRelations/>
                {/* <ResizeCanvas graphDOM={this.graphDOM as HTMLDivElement} /> */}
                {/* <TreeCollapse /> */}

                <ContextMenu style={{background: "#fff"}} bindType="node">
                    {(value) => {
                        return <NodeContextMenu {...value} />;
                    }}
                </ContextMenu>

                <LassoSelect/>
                <Hoverable bindType="edge"/>
                <Hoverable bindType="node"/>

                <Toolbar
                    options={toolBarOptions}
                    onChange={handleToolBarClick}
                    direction={"horizontal"}
                    style={{
                        position: "absolute",
                        top: -15,
                        width: "100%",
                        left: -1,
                        boxShadow: "none",

                    }}
                />
                {/* <DragNodeWithForce /> */}

            </Graphin>
        </div>
    );
}


GraphCanvasComponent.propTypes = {
    data: PropTypes.any,
    containerId: PropTypes.string,
    style: PropTypes.object,
}

export default GraphCanvasComponent;