import React, { memo } from "react";
import { useStoreApi } from "reactflow";
import BaseNode from "../BaseNode";
import iconUrl , {ReactComponent as StickyNotes} from "./stickyNotes.svg"


// import {
//   highlightHandlePathByNodeHandleId,
//   resetHandlePathHighlight
// } from "../utils/highlight";
import { CanvasNodeProps, NodeStyles } from "../../core/types";
import RenderedHTML from "../../components/renderedHtml";

const nodeStyles: NodeStyles = {
  shape: {
    backgroundColor: "#ffffcc",
    // border: "1px solid #ffeb3b",
    borderLeft: "5px solid #ffeb3b",
    color: "#222222",
    padding: "5px 10px",
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 15%), 0 2px 4px -1px rgb(0 0 0 / 8%);",
    width: "180px"
  },
  header: {

  },
  body: {
 
  },
  nodeContainerTargeHandleStyle: {
    position: "absolute",
    top: "20px"
  },
  nodeContainerSourceHandleStyle:{
    position: "absolute",
    top: "20px"
  }
}

const CommentNode = ({ id, data, selected }: CanvasNodeProps) => {
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
    <BaseNode
      id={id}
      label={data.label}
      selected={selected}
      nodeStyles={nodeStyles}
      header={
        <div style={{paddingBottom: "5px",  }}>
          <img src={iconUrl} style={{"position": "absolute", "top": "0", "right": "0", "width": "14px"}} />
          <strong>{data.label}</strong></div>
      }
      body={ <>
        <RenderedHTML html={data?.commentText || ""} />
      </>} 
    />
  );
};

export default memo(CommentNode);
