import React, { memo } from "react";
// import * as R from "ramda";
import { Handle, Position } from "reactflow";
import Node, { contentStyle as style } from "./Node";
import { generateFieldName } from "../utils";
import { CanvasNodeProps, NodeField } from "../types";

// const isValidInput = (connection, type) => {
//   return R.last(R.split("__", connection.source)) === type;
// };
// const isValidOutput = (connection, type) => {
//   console.log("====", connection, type);

//   return R.last(R.split("__", connection.target)) === type;
// };

const DerivedCollectionNode = ({ id, data, selected }: CanvasNodeProps) => {
  return (
    <Node
      id={id}
      label={data.name}
      selected={selected}
      color={"LightBlue"}
      content={
        <>
          <div style={style.contentHeader}>{"Fields"}</div>
          {data.fields.map((field: NodeField) => (
            <div
              className="nodeField"
              key={"i-" + field.name}
              id={generateFieldName(id, field.id)}
              style={{ ...style.io, ...style.textLeft }}
            >
              <Handle
                type="source"
                position={Position.Right}
                // id={"o-" + field.label + "__" + field.type}
                id={field.id}
                style={{ ...style.handle, ...style.right }}
                // isValidConnection={(connection) =>
                //   isValidOutput(connection, field.type)
                // }
              />
              <div className="">
                <span>{field.name}</span>
                <span style={style.fieldDataType}>{field.data_type}</span>
              </div>

              <Handle
                type="target"
                position={Position.Left}
                // id={"i-" + field.label + "__" + field.type}
                id={field.id}
                style={{ ...style.handle, ...style.left }}
                // isValidConnection={(connection) =>
                //   isValidInput(connection, field.type)
                // }
              />
            </div>
          ))}
          {/* <div style={style.contentHeader}>{"Outputs"}</div>
          {data.outputs.map((output) => (
            <div
              key={"o-" + output.label}
              style={{ ...style.io, ...style.textRight }}
            >
              {output.label}
              <Handle
                type="source"
                position="right"
                id={"o-" + output.label + "__" + output.type}
                style={{ ...style.handle, ...style.right }}
                isValidConnection={(connection) =>
                  isValidOutput(connection, output.type)
                }
              />
            </div>
          ))} */}
        </>
      }
    />
  );
};

export default memo(DerivedCollectionNode);
