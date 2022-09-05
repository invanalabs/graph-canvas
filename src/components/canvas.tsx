import React from "react";
import Graphin, {Behaviors, Components} from "@antv/graphin";
import {Grid} from "@antv/graphin-components";
import {Toolbar} from '@antv/graphin-components';
import SelectMultipleNodes from "../canvas/behaviours/selectMultiple"
import FocusSelectedNodes from "../canvas/behaviours/focusSelected"
import {toolBarOptions} from "../canvas/plugins/toolbar/toolbar";
import "@antv/graphin-icons/dist/index.css";
import {NodeContextMenu} from "../canvas/plugins/contextMenu";
import {defaultLayoutSettings, miniMapOptions} from "../canvas/settings";
import {defaultNodeStyle} from "../canvas/settings";
import PropTypes from 'prop-types';
import "../canvas/style.css";
import {GraphinContextType} from "@antv/graphin/lib/GraphinContext";
import {layoutsOptions} from "../canvas/layouts";
import ResizeCanvas from "@antv/graphin/lib/behaviors/ResizeCanvas";
import ShowSelectedNodes from "./selectedNodes"
import Footer from "./footer";
import "./canvas.css"

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
function GraphCanvas({data, containerId, width, height}) {
    console.log(data);
    const [state, setState] = React.useState({
        type: 'dagre',
        options: {},
    });
    const {type, options} = state;

    // const historyRef = React.createRef();
    //
    // const handleTodo = () => {
    //     // @ts-ignore
    //     historyRef.current.todo();
    // };
    // const handleUndo = () => {
    //     // @ts-ignore
    //     historyRef.current.undo();
    // };




    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <div className="grid-plugin-container graph-canvas-container"
             style={{
                 width: width, height: height,
                 paddingTop: "30px"
             }}>

            <Graphin
                data={data}
                className={"graph-canvas"}
                autoPaint={true}
                // height={height - 38}
                layout={{type, ...options}}
                containerId={containerId}
                defaultNodeStyle={defaultNodeStyle}
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
                {/*<UndoRedo ref={historyRef}/>*/}
                {/*<FocusSelectedNodes/>*/}
                {/*<SelectMultipleNodes />*/}

                {/*<ResizeCanvas graphDOM={this.graphDOM as HTMLDivElement} />*/}
                {/* <TreeCollapse /> */}
                {/** hovering node**/}
                <Hoverable bindType="node"/>

                <ShowSelectedNodes style={{
                    "top": "10px",
                    "position": "absolute"
                }}/>
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
                    // onChange={handleToolBarClick}
                    direction={"horizontal"}

                />

                {/* <DragNodeWithForce /> */}
                <Footer
                    style={{
                        border: "1px solid #cccccc",
                        width: "calc(100% + 2px)",
                        left: "-1px",
                        position: "absolute",
                        bottom: "-1px",
                        height: "24px",
                        opacity: "0.75",
                        background: "white"
                    }}/>

            </Graphin>
        </div>
    );
}


GraphCanvas.propTypes = {
    data: PropTypes.any,
    containerId: PropTypes.string,
    style: PropTypes.object,
}

export default GraphCanvas;