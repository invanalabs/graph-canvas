import React, { memo } from "react";
import { useStoreApi } from "reactflow";
import NodeBase from "./NodeBase";
// import {
//   highlightHandlePathByNodeHandleId,
//   resetHandlePathHighlight
// } from "../utils/highlight";
import { CanvasNodeProps, NodeStyles } from "../core/types";
import RenderIconOrImgString from "../components/rendereIconOrImgString";


const nodeStyles: NodeStyles = {
  shape: {
   border: "1px solid var(--canvas-border)",
   borderTop:  "2px solid var(--canvas-border)",
   borderRadius: "3px"
  },
  header: {
  },
  body: {

  },

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
          <div className="floatLeft" style={{ margin: "5px 10px ", }} ><strong>{data.label}</strong> </div>
        </div>
      }
      // color={"Lavender"}
      body={<>
      </>}
    />
  );
};

export default memo(GenericNode);
