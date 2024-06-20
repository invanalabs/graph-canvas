import { ICanvasLink } from "../../data/links";
import { ICanvasNode } from "../../data/nodes";

export const exampleNodes : Array<ICanvasNode> = [
    {
        id: '1',
        group: 'Person',
        label: 'Ravi',
        shapeName: 'circle',
        x: 100,
        y: 200,
    },
    {
        id: '2',
        group: 'Project',
        label: 'Graph Canvas',
        shapeName: 'circle',
        x: 450,
        y: 200
    }
];

export const exampleLinks: Array<ICanvasLink> = [
    {
        id: '1-2',
        group: 'authored',
        label: '1-2:authored',
        source: '1',
        target: '2',
        shapeName: 'line'
    }    
];