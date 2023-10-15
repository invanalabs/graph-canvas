import React, { memo } from "react";
import { Handle, Position } from "reactflow";
// import { generateFieldName } from "../utils";

export const contentStyle = {
  contentHeader: {
    padding: "8px 10px",
    flexGrow: 1,
    backgroundColor: "#eee"
  },
  io: {
    position: "relative",
    padding: "8px 10px",
    flexGrow: 1,
    borderBottom: "1px solid #efefef"
  },
  left: { left: "-8px" },
  textLeft: { textAlign: "left" },
  fieldDataType: { float: "right", fontSize: "10px", color: "#999" },
  right: { right: "-8px" },
  textRight: { textAlign: "right" },
  handle: {
    width: "2px", // Does not work
    height: "2px",
    margin: "auto",
    background: "#ddd",
    borderRadius: "2px",
    border: "1px solid #ddd"
    // boxShadow:
    //   "rgba(0, 0, 0, 0.2) 0px 1px 3px 0px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 2px 1px -1px"
  },
  nodeContainerRightHandle: {
    position: "absolute",
    top: "10px",
    right: 0
  },
  nodeContainerLeftHandle: {
    position: "absolute",
    top: "10px",
    left: "0 !important"
  }
};

const style = {
  body: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    // boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    border: "1px solid #bbb",
    fontSize: "12px",
    width: "180px"
  },
  selected: {
    border: "1px solid blue"
    // boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
  },
  title: {
    position: "relative",
    padding: "8px 10px",
    flexGrow: 1,
    backgroundColor: "#eee",
    borderBottom: "1px solid #ddd"
  },
  contentWrapper: {
    padding: "0px 0px"
  }
};

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
  let customTitle = { ...style.title };
  if (color) customTitle.backgroundColor = color;

  // Collapse contentWrapper on icon click
  return (
    <div style={{ ...style.body, ...(selected ? style.selected : []) }}>
      <div style={customTitle}>{label}</div>

      <Handle
        type="source"
        position={Position.Right}
        // id={"o-" + field.label + "__" + field.type}
        id={id}
        // className={"nodeContainerHandle"}
        style={{
          ...contentStyle.handle,
          ...contentStyle.nodeContainerRightHandle,
          ...contentStyle.right
        }}
      />
      <div style={style.contentWrapper}>{content}</div>
      <Handle
        type="target"
        position={Position.Left}
        // id={"o-" + field.label + "__" + field.type}
        id={id}
        // className={"nodeContainerHandle"}
        style={{
          ...contentStyle.handle,
          ...contentStyle.nodeContainerLeftHandle,
          ...contentStyle.left
        }}
      />
    </div>
  );
};

export default memo(Node);
