import { ICanvasLink, ICanvasNode } from "../../store";


export const exampleNodes : Array<ICanvasNode> = [
    {
        id: '1',
        group: 'Person',
        label: 'Ravi',
        
        x: 50,
        y:50,
    },
    {
        id: '2',
        group: 'Project',
        label: 'Graph Canvas',
        
        x:50,
        y:200
    }
];

export const exampleLinks: Array<ICanvasLink> = [
    {
        id: '1-2',
        group: 'authored',
        label: '1-2:authored',
        source: '1',
        target: '2',
        shapeName: 'straightLine'
    },
    // {
    //     id: '1-2.1',
    //     group: 'authored',
    //     label: '1-2.1:authored',
    //     source: '1',
    //     target: '2',
    //     shapeName: 'quadratic',
    //     curvature: 0.2
    // },
    // {
    //     id: '1-2.2',
    //     group: 'authored',
    //     label: '1-2.2:authored',
    //     source: '1',
    //     target: '2',
    //     shapeName: 'quadratic',
    //     curvature: 0.2

    // },
    // {
    //     id: '2-2.1',
    //     group: 'authored',
    //     label: '2-2.1:authored',
    //     source: '2',
    //     target: '2',
    //     shapeName: 'loop',
    //     curvature: 0.2

    // },
    // {
    //     id: '1-1',
    //     group: 'authored',
    //     label: '1-2:authored',
    //     source: '1',
    //     target: '1',
    //     shapeName: 'loop'
    // }
];