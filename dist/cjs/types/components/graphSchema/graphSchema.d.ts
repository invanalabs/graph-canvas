import { CanvasData } from "../../canvas/types";
export interface GraphSchemaProps {
    canvasData: CanvasData;
}
declare const GraphSchema: (props: GraphSchemaProps) => JSX.Element;
export default GraphSchema;
