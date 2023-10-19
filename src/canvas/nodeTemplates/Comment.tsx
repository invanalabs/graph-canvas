import React, { memo } from "react";
import { useStoreApi } from "reactflow";
import NodeBase from "./NodeBase";
// import {
//   highlightHandlePathByNodeHandleId,
//   resetHandlePathHighlight
// } from "../utils/highlight";
import { CanvasNodeProps } from "../core/types";


const styles = {
  shape: {
    backgroundColor: "#ffffcc",
    border: "1px solid #ffeb3b !important",
    borderLeftWidth: "4px !important",
    color: "#222222",
    padding: "5px 10px"
  },
  header: {

  },
  body: {
 
  }
}

const Comment = ({ id, data, selected }: CanvasNodeProps) => {
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
      style={styles.shape}
      header={
        <div>{data.label}</div>
      }
      // color={"Lavender"}
      body={ <>
        <div dangerouslySetInnerHTML={{__html: data.commentText || ""}} />
      </>} 
    />
  );
};

export default memo(Comment);
