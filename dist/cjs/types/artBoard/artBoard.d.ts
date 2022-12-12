import "./artBoard.scss";
import CanvasDisplaySettings, { CanvasData } from "../canvas/types";
export interface ArtBoardProps {
    data: CanvasData;
    displaySettings: CanvasDisplaySettings;
}
declare const ArtBoard: ({ data, displaySettings }: ArtBoardProps) => JSX.Element;
export default ArtBoard;
