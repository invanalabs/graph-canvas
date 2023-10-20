import React, { memo } from "react";
import { useStoreApi } from "reactflow";
import NodeBase from "./NodeBase";
// import {
//   highlightHandlePathByNodeHandleId,
//   resetHandlePathHighlight
// } from "../utils/highlight";
import { CanvasNodeProps, NodeStyles } from "../core/types";
import RenderIconOrImgString from "../components/rendereIconOrImgString";
import RenderedHTML from "../components/renderedHtml";


const nodeStyles: NodeStyles = {
  shape: {
    // padding: "10px"
  },
  header: {
    background: "var(--canavas-header-bg)"
  },
  body: {
    padding: "10px",
    borderTop: "1px solid var(--canvas-border)"

  },
  nodeContainerTargeHandleStyle: {
    position: "absolute",
    top: "10px"
  },
  nodeContainerSourceHandleStyle:{
    position: "absolute",
    top: "10px"
  }
}

const CardNode = ({ id, data, selected }: CanvasNodeProps) => {
  const store = useStoreApi();
  const { edges, getNodes, setNodes, setEdges } = store.getState();
  const nodes = getNodes();

  const MouseOver = (e: React.MouseEvent) => {
    //     let el = e.currentTarget;
    //     const nodeId: string = el.getAttribute("data-node-id") || "";
    //     const handleId: string | null = el.getAttribute("data-handle-id");
    //     highlightHandlePathByNodeHandleId(nodeId, handleId, nodes, edges, setNodes, setEdges);
    //     // https://github.com/wbkd/react-flow/issues/2418
  };

  const MouseOut = (e: React.MouseEvent) => {
    // resetHandlePathHighlight(nodes, edges, setNodes, setEdges);
  };

  const handleClick = (e: React.MouseEvent) => {
    // MouseOver(e);
  };

  console.log("=====data.icon", data.icon, typeof data.icon)
  return (
    <NodeBase
      id={id}
      label={data.label}
      selected={selected}
      nodeStyles={nodeStyles}
      header={
        <div >
          {data.icon ?
            <div className="floatLeft"><RenderIconOrImgString html={data.icon} /></div>
            : <></>
          }
          <div className="floatLeft" style={{ margin: "5px 0 ", marginLeft: "10px", }} ><strong>{data.label}</strong> </div>
        </div>
      }
      // color={"Lavender"}
      body={<>
      {
        data.body?
        <RenderedHTML html={data.body} />
        : <></>
      }
      </>}
    />
  );
};

export default memo(CardNode);
