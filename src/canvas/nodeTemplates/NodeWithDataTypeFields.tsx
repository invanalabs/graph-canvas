import React, { memo } from "react";
import { Handle, Position, useStoreApi } from "reactflow";
import NodeBase from "./NodeBase";
import { generateFieldName } from "../utils";
import {
  highlightHandlePathByNodeHandleId,
  resetHandlePathHighlight
} from "../utils/highlight";
import { NodeField, CanvasNodeProps } from "../core/types";


const NodeWithDataTypeFields = ({ id, data, selected }: CanvasNodeProps) => {
  const store = useStoreApi();
  const { edges, getNodes, setNodes, setEdges } = store.getState();
  const nodes = getNodes();

  const MouseOver = (e: React.MouseEvent) => {
    let el = e.currentTarget;
    const nodeId: string = el.getAttribute("data-node-id") || "";
    const handleId: string | null = el.getAttribute("data-handle-id");
    highlightHandlePathByNodeHandleId(nodeId, handleId, nodes, edges, setNodes, setEdges);
    // https://github.com/wbkd/react-flow/issues/2418
  };

  const MouseOut = (e: React.MouseEvent) => {
    resetHandlePathHighlight(nodes, edges, setNodes, setEdges);
  };

  const handleClick = (e: React.MouseEvent) => {
    MouseOver(e);
  };

  return (
    <NodeBase
      id={id}
      label={data.label}
      selected={selected}
      header={
        <div className={"nodeName"} style={{ backgroundColor: "#ccc" }}>{data.label}</div>
      }
      body={
        <>
          {data.fields && data.fields.map((field: NodeField) => (
            <div
              className="nodeField textLeft io"
              onMouseOver={MouseOver}
              onMouseOut={MouseOut}
              id={generateFieldName(id, field.id)}
              onClick={handleClick}
              data-node-id={id}
              data-handle-id={field.id}
              key={"i-" + field.label}
            >
              <Handle
                type="source"
                position={Position.Right}
                id={field.id}
                className="handle react-flow__handle"
                onConnect={(params) => console.log("handle onConnect", params)}
              />
              <div>
                <span>{field.label}</span>
                <span className="fieldDataType">{field.data_type}</span>
              </div>
              <Handle
                type="target"
                position={Position.Left}
                id={field.id}
                className="handle react-flow__handle"
                onConnect={(params) => console.log("handle onConnect", params)}
              />
            </div>
          ))}
        </>
      }
    />
  );
};

export default memo(NodeWithDataTypeFields);
