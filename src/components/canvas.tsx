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
import "../canvas/style.css";
import {GraphinContextType} from "@antv/graphin/lib/GraphinContext";
import ShowSelectedNodes from "../canvas/plugins/selectedNodes"
import Footer from "../canvas/plugins/footer/footer";
import "./canvas.css"
import {handleToolBarClick} from "../canvas/plugins/toolbar/handler";
import PropTypes from 'prop-types';
import StateManager from "../canvas/state/manager";

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

/*

{

    statusMessageText : null,
    data : {
        nodes: [],
        edges: [],
    },
    selectedNodes: [],
    hoveredItem: null,
    displaySettings: {
        canvas: {
            background: null,
            layout: {}
        },
        nodeSettings: {
        },
        edgeSettings: {
        }
    }
}
*/


// @ts-ignore
function GraphCanvas({data, containerId, width, height, initState}) {
    console.log(data);
    const [state, setState] = React.useState(initState);
    const stateManager = new StateManager(setState)
    const {layoutSettings, messageText} = state;


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
                layout={{type: layoutSettings.type, ...layoutSettings.options}}
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
                    "left": "15px",
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
                    onChange={(graphinContext: GraphinContextType, config: any) =>
                        handleToolBarClick(graphinContext, config, stateManager)}
                    direction={"horizontal"}

                />

                {/* <DragNodeWithForce /> */}
                <Footer messageText={messageText}/>

            </Graphin>
        </div>
    );
}


GraphCanvas.propTypes = {
    data: PropTypes.any,
    containerId: PropTypes.string,
    style: PropTypes.object,
    initState: PropTypes.object,
}

export default GraphCanvas;