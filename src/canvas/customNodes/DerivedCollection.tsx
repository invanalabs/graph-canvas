import { memo } from "react";
import { Handle, Position } from "reactflow";
import Node  from "./Node";
import { generateFieldName } from "../utils";
import { CanvasNodeProps, NodeField } from "../core/types";
 

const DerivedCollectionNode = ({ id, data, selected }: CanvasNodeProps) => {
  return (
    <Node
      id={id}
      label={data.name}
      selected={selected}
      color={"LightBlue"}
      content={
        <>
          <div className="contentHeader">{"Fields"}</div>
          {data.fields.map((field: NodeField) => (
            <div
              className="nodeField io textLeft"
              key={"i-" + field.name}
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
                <span className="fieldDataType">{field.data_type}</span>
              </div>

              <Handle
                type="target"
                position={Position.Left}
                id={field.id}
                className="handle left"
              />
            </div>
          ))}
        </>
      }
    />
  );
};

export default memo(DerivedCollectionNode);
