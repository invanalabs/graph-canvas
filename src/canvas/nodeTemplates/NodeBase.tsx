import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import { NodeBaseProps } from "../core/types";



const NodeBase: React.FC<NodeBaseProps> = ({
  id,
  label,
  selected,
  style,
  header,
  body
}: NodeBaseProps) => {
  console.log("====style", style)
  return (
    <div className={"customNode " + (selected ? "selected" : "")} style={style}  >
      <div className="nodeHeader">
        {header}
        <Handle
          type="source"
          position={Position.Right}
          id={id}
          className="handle nodeContainerRightHandle right react-flow__handle" />
        <Handle
          type="target"
          position={Position.Left}
          id={id}
          className="handle nodeContainerLeftHandle left react-flow__handle" />
      </div>
      <div className="nodeBody">{body}</div>
    </div>
  );
};

export default memo(NodeBase);
