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
    <div className={"body " + (selected ? "selected" : "")}  >
      <div className={"title"} style={customTitle}>{label}</div>
      <Handle
        type="source"
        position={Position.Right}
        id={id}
        className=" handle nodeContainerRightHandle right" />
      <div className="contentWrapper">{content}</div>
      <Handle
        type="target"
        position={Position.Left}
        id={id}
        className=" handle nodeContainerLeftHandle left" />
    </div>
  );
};

export default memo(Node);
