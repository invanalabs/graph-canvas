import React, { memo } from "react";
// import * as R from "ramda";
import { Handle, Position } from "reactflow";
import Node, { contentStyle as style } from "./Node";
import { generateFieldName } from "../utils";
// const isValidInput = (connection) => {
//   return R.last(R.split("__", connection.source)) === "value";
// };
// const isValidOutput = (connection) => {
//   return R.last(R.split("__", connection.target)) === "value";
// };

const DataStoreNode = ({ id, data, selected }) => {
  return (
    <Node
      id={id}
      label={data.name}
      selected={selected}
      color={"#E0ffe0"}
      content={
        <>
          {/* <div style={style.contentHeader}>{"Collections"}</div> */}
          {data.fields.map((field) => (
            <div
              key={"i-" + field.name}
              className="nodeField"
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
                {field.data_type ? (
                  <span style={style.fieldDataType}>{field.id}</span>
                ) : (
                  <span />
                )}
              </div>
              {/* 
              <Handle
                type="target"
                position={Position.Left}
                // id={"i-" + field.label + "__" + field.type}
                id={"i__" + generateFieldId(data.id, field.field_slug)}
                style={{ ...style.handle, ...style.left }}
                // isValidConnection={(connection) =>
                //   isValidInput(connection, field.type)
                // }
              /> */}
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

export default memo(DataStoreNode);
