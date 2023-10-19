import React, { memo } from "react";
import { useStoreApi } from "reactflow";
import NodeBase from "./NodeBase";
// import {
//   highlightHandlePathByNodeHandleId,
//   resetHandlePathHighlight
// } from "../utils/highlight";
import { CanvasNodeProps, NodeStyles } from "../core/types";


const nodeStyles: NodeStyles = {
  shape: {
    padding: "10px"
  },
  header: {

  },
  body: {
 
  },
  nodeContainerTargeHandleStyle: {
    position: "absolute !important",
    top: "10px !important"
  },
  nodeContainerSourceHandleStyle:{
    position: "absolute !important",
    top: "10px !important"
  }
}

const GenericNode = ({ id, data, selected }: CanvasNodeProps) => {
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

  return (
    <NodeBase
      id={id}
      label={data.label}
      selected={selected}
      nodeStyles={nodeStyles}
      header={
        <div style={{paddingBottom: "2px"}}><strong>{data.label}</strong></div>
      }
      // color={"Lavender"}
      body={ <>
      </>} 
    />
  );
};

export default memo(GenericNode);
