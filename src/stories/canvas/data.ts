import { CanvasNode, CanvasLink } from "../../graphics/types";

export const exampleNodes : Array<CanvasNode> = [
    {
        id: '1',
        group: 'Person',
        label: 'Ravi',
        shape: 'circle',
        x: 50,
        y:50,
    },
    {
        id: '2',
        group: 'Project',
        label: 'Graph Canvas',
        shape: 'circle',
        x:50,
        y:200
    }
];

export const exampleLinks: Array<CanvasLink> = [
    {
        id: '1-2',
        group: 'authored',
        label: '1-2:authored',
        source: '1',
        target: '2',
        shape: 'line'
    },
    {
        id: '1-1',
        group: 'authored',
        label: '1-2:authored',
        source: '1',
        target: '1',
        shape: 'loop'
    }
];