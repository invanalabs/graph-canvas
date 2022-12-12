import { CanvasEdge, CanvasNode } from "../../canvas/types";
interface PropertiesViewProps {
    data: CanvasNode | CanvasEdge;
}
declare const PropertiesView: ({ data }: PropertiesViewProps) => JSX.Element;
export default PropertiesView;
