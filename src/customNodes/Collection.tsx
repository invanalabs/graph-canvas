import React, { memo } from "react";
// import * as R from "ramda";
import { Handle, Position, useStoreApi, useNodeId } from "reactflow";
import Node, { contentStyle as style } from "./Node";
import { generateFieldName } from "../utils";
import {
  highlightHandlePath,
  resetHandlePathHighlight
} from "../highlight-utils";

// const isValidInput = (connection, type) => {
//   return R.last(R.split("__", connection.source)) === type;
// };
// const isValidOutput = (connection, type) => {
//   console.log("====", connection, type);

//   return R.last(R.split("__", connection.target)) === type;
// };

const CollectionNode = ({ id, data, selected }) => {
  const store = useStoreApi();
  const { edges, getNodes, setNodes, setEdges } = store.getState();
  const nodes = getNodes();

  const MouseOver = (e) => {
    let el = e.currentTarget;
    const nodeId = el.getAttribute("data-node-id");
    const handleId = el.getAttribute("data-handle-id");
    highlightHandlePath(nodeId, handleId, nodes, edges, setNodes, setEdges);
    // https://github.com/wbkd/react-flow/issues/2418
  };

  const MouseOut = () => {
    resetHandlePathHighlight(nodes, edges, setNodes, setEdges);
  };
  // const handleClick = (e) => {
  //   MouseOver(e);
  // };

  return (
    <Node
      id={id}
      label={data.name}
      selected={selected}
      color={"Lavender"}
      content={
        <>
          <div style={style.contentHeader}>{"Fields"}</div>
          {data.fields.map((field) => (
            <div
              className="nodeField"
              onMouseOver={MouseOver}
              onMouseOut={MouseOut}
              id={generateFieldName(id, field.id)}
              // onClick={handleClick}
              data-node-id={id}
              data-handle-id={field.id}
              key={"i-" + field.name}
              style={{ ...style.io, ...style.textLeft }}
            >
              <Handle
                type="source"
                position={Position.Right}
                id={field.id}
                style={{ ...style.handle, ...style.right }}
                onConnect={(params) => console.log("handle onConnect", params)}
              />
              <div>
                <span>{field.name}</span>
                <span style={style.fieldDataType}>{field.data_type}</span>
              </div>

              <Handle
                type="target"
                position={Position.Left}
                id={field.id}
                style={{ ...style.handle, ...style.left }}
                onConnect={(params) => console.log("handle onConnect", params)}
              />
            </div>
          ))}
        </>
      }
    />
  );
};

export default memo(CollectionNode);
