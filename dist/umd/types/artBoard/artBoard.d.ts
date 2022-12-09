import "./artBoard.scss";
import DisplaySettings from "../canvas/types";
export interface ArtBoardProps {
    label: string;
    data: {
        nodes: [];
        edges: [];
    };
    displaySettings: DisplaySettings;
}
declare const ArtBoard: (props: ArtBoardProps) => JSX.Element;
export default ArtBoard;
