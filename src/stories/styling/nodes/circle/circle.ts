import { ICanvasOptions } from "../../../../canvas";
import { ICanvasLink, ICanvasNode } from "../../../../store";

export const exampleNodes : Array<ICanvasNode> = [
    {
        id: '1',
        group: 'TestNode',
        label: 'Default',
        shapeName: 'circle',
        // state: ':default',
        x: (window.innerWidth/2) - 100,
        y: window.innerHeight/2
    },
    {
        id: '2',
        group: 'TestNode',
        label: 'Hovered',
        shapeName: 'circle',
        state: ':hovered',
        x: (window.innerWidth/2) + 100 ,
        y: window.innerHeight/2
    },
    {
        id: '3',
        group: 'TestNode',
        label: 'Highlighted',
        shapeName: 'circle',
        state: ':highlighted',
        x: (window.innerWidth/2) - 100 ,
        y: (window.innerHeight/2) + 100
    },
    {
        id: '4',
        group: 'TestNode',
        label: 'Inactive',
        shapeName: 'circle',
        state: ':inactive',
        x: (window.innerWidth/2) + 100 ,
        y: (window.innerHeight/2) + 100
    },
    {
        id: '5',
        group: 'TestNode',
        label: 'Selected',
        shapeName: 'circle',
        state: ':selected',
        x: (window.innerWidth/2) - 100 ,
        y: (window.innerHeight/2) + 200
    }
];

export const exampleLinks: Array<ICanvasLink> = [
 
];

export const customICanvasOptions: ICanvasOptions = {
    styles: {
        nodes: {
            Person: {
                size: 40
            } 
        },
        links : {}
    }
} 