import React from "react";
import "./artBoard.scss"

export interface ArtBoardProps {
    label: string;
}

const ArtBoard = (props: ArtBoardProps) => {
    return <div className={"artBoard"}>
        <h1>Hello Board</h1>
    </div>;
};

export default ArtBoard;
