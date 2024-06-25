import { ICanvasNode, ICanvasLink } from "../../../../store";

export const exampleNodes : Array<ICanvasNode> = [
    {
        id: '1',
        group: 'Person',
        // label: 'Ravi',
        shapeName: 'circle',
        x: 100,
        y: 200,
        style :{size: 2},
    },
    {
        id: '2',
        group: 'Project',
        // label: 'Graph Canvas',
        shapeName: 'circle',
        x: 450,
        y: 200,
        style :{size: 2},
    },
    {
        id: '3',
        group: 'Person',
        // label: 'Ravi',
        shapeName: 'circle',
        x: 100,
        y: 300,
        style :{size: 2},
    },
    {
        id: '4',
        group: 'Project',
        // label: 'Graph Canvas',
        shapeName: 'circle',
        x: 450,
        y: 300,
        style :{size: 2},
    },
    {
        id: '5',
        group: 'Person',
        // label: 'Ravi',
        shapeName: 'circle',
        x: 100,
        y: 400,
        style :{size: 2},
    },
    {
        id: '6',
        group: 'Project',
        // label: 'Graph Canvas',
        shapeName: 'circle',
        x: 450,
        y: 400,
        style :{size: 2},
    },
    {
        id: '7',
        group: 'Person',
        // label: 'Ravi',
        shapeName: 'circle',
        x: 100,
        y: 500,
        style :{size: 2},
    },
    {
        id: '8',
        group: 'Project',
        // label: 'Graph Canvas',
        shapeName: 'circle',
        x: 450,
        y: 500,
        style :{size: 2},
    }
];

export const exampleLinks: Array<ICanvasLink> = [
    {
        id: '1-2',
        group: 'authored',
        label: 'default',
        source: '1',
        target: '2',
        shapeName: 'line',
    },
    {
        id: '3-4',
        group: 'authored',
        label: 'hovered',
        source: '3',
        target: '4',
        shapeName: 'line',
        state: ":hovered"
    },
    {
        id: '5-6',
        group: 'authored',
        label: 'highlighted',
        source: '5',
        target: '6',
        shapeName: 'line',
        state: ":highlighted"
    },       ,
    {
        id: '7-8',
        group: 'authored',
        label: 'inactive',
        source: '7',
        target: '8',
        shapeName: 'line',
        state: ":inactive"
    }  
];