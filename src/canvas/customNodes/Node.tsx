import React, { memo } from "react";
import { Handle, Position } from "reactflow";


interface NodeProps {
  id: string;
  label: string;
  selected: boolean;
  color?: string;
  content: React.ReactNode;
}


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
          className="handle nodeContainerRightHandle right" />
        <Handle
          type="target"
          position={Position.Left}
          id={id}
          className="handle nodeContainerLeftHandle left" />
      </div>
      <div className="nodeBody">{content}</div>
    </div>
  );
};

export default memo(Node);
