import "./artBoard.scss";
export interface ArtBoardProps {
    label: string;
    data: {
        nodes: [];
        edges: [];
    };
}
declare const ArtBoard: (props: ArtBoardProps) => JSX.Element;
export default ArtBoard;
