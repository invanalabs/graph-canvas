import { CanvasNode } from "../../canvas/types";
interface NodePropertyViewerProps {
    node: CanvasNode;
}
declare const NodePropertiesViewer: ({ node }: NodePropertyViewerProps) => JSX.Element;
export default NodePropertiesViewer;
