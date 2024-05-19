import { CanvasNode, CanvasLink } from "../../../graphics/types";

export const exampleNodes : Array<CanvasNode> = [
    {
        id: '1',
        group: 'Person',
        // label: 'Ravi',
        shape: 'circle',
        x: 100,
        y: 200,
        style :{size: 2},
    },
    {
        id: '2',
        group: 'Project',
        // label: 'Graph Canvas',
        shape: 'circle',
        x: 450,
        y: 200,
        style :{size: 2},
    },
    {
        id: '3',
        group: 'Person',
        // label: 'Ravi',
        shape: 'circle',
        x: 100,
        y: 300,
        style :{size: 2},
    },
    {
        id: '4',
        group: 'Project',
        // label: 'Graph Canvas',
        shape: 'circle',
        x: 450,
        y: 300,
        style :{size: 2},
    },
    {
        id: '5',
        group: 'Person',
        // label: 'Ravi',
        shape: 'circle',
        x: 100,
        y: 400,
        style :{size: 2},
    },
    {
        id: '6',
        group: 'Project',
        // label: 'Graph Canvas',
        shape: 'circle',
        x: 450,
        y: 400,
        style :{size: 2},
    },
    {
        id: '7',
        group: 'Person',
        // label: 'Ravi',
        shape: 'circle',
        x: 100,
        y: 500,
        style :{size: 2},
    },
    {
        id: '8',
        group: 'Project',
        // label: 'Graph Canvas',
        shape: 'circle',
        x: 450,
        y: 500,
        style :{size: 2},
    }
];

export const exampleLinks: Array<CanvasLink> = [
    {
        id: '1-2',
        group: 'authored',
        label: 'default',
        source: '1',
        target: '2',
        shape: 'line',
    },
    {
        id: '3-4',
        group: 'authored',
        label: 'hovered',
        source: '3',
        target: '4',
        shape: 'line',
        state: ":hovered"
    },
    {
        id: '5-6',
        group: 'authored',
        label: 'selected',
        source: '5',
        target: '6',
        shape: 'line',
        state: ":selected"
    },       ,
    {
        id: '7-8',
        group: 'authored',
        label: 'inactive',
        source: '7',
        target: '8',
        shape: 'line',
        state: ":inactive"
    }  
];