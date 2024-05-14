import { CanvasNode, CanvasLink } from "../../../graphics/types";

export const exampleNodes : Array<CanvasNode> = [
    {
        id: '1',
        group: 'TestNode',
        label: 'Default',
        shape: 'circle',
        state: ':default',
        x: (window.innerWidth/2) - 100,
        y: window.innerHeight/2
    },
    {
        id: '2',
        group: 'TestNode',
        label: 'Hovered',
        shape: 'circle',
        state: ':hovered',
        x: (window.innerWidth/2) + 100 ,
        y: window.innerHeight/2
    },
    {
        id: '3',
        group: 'TestNode',
        label: 'Selected',
        shape: 'circle',
        state: ':selected',
        x: (window.innerWidth/2) - 100 ,
        y: (window.innerHeight/2) + 100
    },
    {
        id: '4',
        group: 'TestNode',
        label: 'Inactive',
        shape: 'circle',
        state: ':inactive',
        x: (window.innerWidth/2) + 100 ,
        y: (window.innerHeight/2) + 100
    }
];

export const exampleLinks: Array<CanvasLink> = [
 
];

export const customCanvasOptions = {
    styles: {
        nodes: {
            Person: {
                size: 40
            } 
        },
        links : {}
    }
} 