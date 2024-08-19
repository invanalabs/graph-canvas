import { ICanvasLink, ICanvasNode } from "../../../../store"

export const linkTypesData: { "nodes": ICanvasNode[], "links": ICanvasLink[] } = {
    nodes: [

        {
            id: '1',
            group: 'Person',
            // label: 'Ravi',
            
            x: 100,
            y: 100,
            style: { size: 2 },
        },
        {
            id: '2',
            group: 'Project',
            // label: 'Graph Canvas',
            
            x: 450,
            y: 100,
            style: { size: 2 },
        },
        {
            id: '3',
            group: 'Person',
            // label: 'Ravi',
            
            x: 100,
            y: 200,
            style: { size: 2 },
        },
        {
            id: '4',
            group: 'Project',
            // label: 'Graph Canvas',
            
            x: 450,
            y: 200,
            style: { size: 2 },
        },
        {
            id: '5',
            group: 'Person',
            // label: 'Ravi',
            
            x: 100,
            y: 300,
            style: { size: 2 },
        },
        {
            id: '6',
            group: 'Project',
            // label: 'Graph Canvas',
            
            x: 450,
            y: 300,
            style: { size: 2 },
        },
        {
            id: '7',
            group: 'Person',
            // label: 'Ravi',
            
            x: 100,
            y: 400,
            style: { size: 2 },
        },
        {
            id: '8',
            group: 'Project',
            // label: 'Graph Canvas',
            
            x: 450,
            y: 400,
            style: { size: 2 },
        },
        // {
        //     id: '5',
        //     group: 'Person',
        //     // label: 'Ravi',
        //     
        //     x: 100,
        //     y: 400,
        //     style :{size: 2},
        // },
        // {
        //     id: '6',
        //     group: 'Project',
        //     // label: 'Graph Canvas',
        //     
        //     x: 450,
        //     y: 400,
        //     style :{size: 2},
        // }
    ],
    links: [
        {
            id: '1-2',
            group: 'authored',
            label: 'straightLine',
            source: '1',
            target: '2',
            shapeName: 'straightLine',
        },
        {
            id: '3-4',
            group: 'authored',
            label: 'bezierCurvedLine',
            source: '3',
            target: '4',
            shapeName: 'bezierCurvedLine',
        },
        {
            id: '5-6',
            group: 'authored',
            label: 'curvedLine',
            source: '5',
            target: '6',
            shapeName: 'curvedLine',
        },
        {
            id: '7-8',
            group: 'authored',
            label: 'loopLine',
            source: '7',
            target: '8',
            shapeName: 'loopLine',
        }
    ]
}