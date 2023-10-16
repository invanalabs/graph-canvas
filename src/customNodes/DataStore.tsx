import { memo } from "react";
import { Handle, Position } from "reactflow";
import Node from "./Node";
import { generateFieldName } from "../utils";
import { CanvasNodeProps, NodeField } from "../types";


const DataStoreNode = ({ id, data, selected }: CanvasNodeProps) => {
  return (
    <Node
      id={id}
      label={data.name}
      selected={selected}
      color={"#E0ffe0"}
      content={
        <>
          {data.fields.map((field: NodeField) => (
            <div
              key={"i-" + field.name}
              className="nodeField io textLeft"
              id={generateFieldName(id, field.id)}
            >
              <Handle
                type="source"
                position={Position.Right}
                id={field.id}
                className="handle right"
              />
              <div className="">
                <span>{field.name}</span>
                {field.data_type ? (
                  <span className="fieldDataType">{field.id}</span>
                ) : (
                  <span />
                )}
              </div>
            </div>
          ))}
        </>
      }
    />
  );
};

export default memo(DataStoreNode);
