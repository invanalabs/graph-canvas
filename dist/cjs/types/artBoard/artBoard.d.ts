import "./artBoard.scss";
import CanvasDisplaySettings, { CanvasData } from "../canvas/types";
export interface ArtBoardProps {
    label: string;
    data: CanvasData;
    displaySettings: CanvasDisplaySettings;
}
declare const ArtBoard: (props: ArtBoardProps) => JSX.Element;
export default ArtBoard;
