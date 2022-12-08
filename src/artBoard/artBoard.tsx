import React from "react";
import "./artBoard.scss"
import {Canvas} from "../canvas";

export interface ArtBoardProps {
    label: string;
}

let defaultData = {
    nodes: [
        {id: 1, label: "Node 1"},
        {id: 2, label: "Node 2"},
        {id: 3, label: "Node 3"},
        {id: 4, label: "Node 4"},
        {id: 5, label: "Node 5"},
    ],
    edges: [
        {from: 1, to: 3},
        {from: 1, to: 2},
        {from: 2, to: 4},
        {from: 2, to: 5},
        {from: 3, to: 3},
    ],
};
const ArtBoard = (props: ArtBoardProps) => {
    return <div className={"artBoard"}>
        <h1>Artboard</h1>
        <Canvas data={defaultData} />
    </div>;
};

export default ArtBoard;
