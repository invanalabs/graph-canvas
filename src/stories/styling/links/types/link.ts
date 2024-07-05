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
    // {
    //     id: '5',
    //     group: 'Person',
    //     // label: 'Ravi',
    //     shapeName: 'circle',
    //     x: 100,
    //     y: 400,
    //     style :{size: 2},
    // },
    // {
    //     id: '6',
    //     group: 'Project',
    //     // label: 'Graph Canvas',
    //     shapeName: 'circle',
    //     x: 450,
    //     y: 400,
    //     style :{size: 2},
    // }
];

// eslint-disable-next-line no-sparse-arrays
export const exampleLinks: Array<ICanvasLink> = [
    {
        id: '1-2',
        group: 'authored' ,
        label: 'straightLine' ,
        source: '1' ,
        target: '2' ,
        shapeName: 'straightLine' ,
    },
    {
        id: '3-4',
        group: 'authored',
        label: 'curvedLine',
        source: '3',
        target: '4',
        shapeName: 'curvedLine',
    },
];