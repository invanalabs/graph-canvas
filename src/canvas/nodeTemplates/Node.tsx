import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import { NodeProps } from "../core/types";



const Node: React.FC<NodeProps> = ({
  id,
  label,
  selected,
  color,
  content
}: NodeProps) => {
  let customTitle: { backgroundColor: string } = { backgroundColor: "#ccc" };
  if (color) customTitle.backgroundColor = color;

  return (
    <div className={"customNode " + (selected ? "selected" : "")}  >
      <div className="nodeHeader">
        <div className={"nodeName"} style={customTitle}>{label}</div>
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
      <div className="nodeBody">{content}</div>
    </div>
  );
};

export default memo(Node);
