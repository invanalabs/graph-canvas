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
    // {
    //     id: '2',
    //     group: 'TestNode',
    //     label: 'Hovered',
    //     shapeName: 'circle',
    //     state: ':hovered',
    //     x: (window.innerWidth/2) + 100 ,
    //     y: window.innerHeight/2
    // },
    {
        id: '3',
        group: 'TestNode',
        label: 'Highlighted',
        shapeName: 'circle',
        state: ':highlighted',
            x: (window.innerWidth/2) + 100 ,
        y: window.innerHeight/2
    },
    {
        id: '4',
        group: 'TestNode',
        label: 'Inactive',
        shapeName: 'circle',
        state: ':inactive',
        x: (window.innerWidth/2) - 100 ,
        y: (window.innerHeight/2) + 100
    },
    {
        id: '5',
        group: 'TestNode',
        label: 'Selected',
        shapeName: 'circle',
        state: ':selected',
        x: (window.innerWidth/2) + 100 ,
        y: (window.innerHeight/2) + 100

        // x: (window.innerWidth/2) - 100 ,
        // y: (window.innerHeight/2) + 200
    },
    {
        id: '6',
        group: 'TestNode',
        label: 'with icon',
        shapeName: 'circle',
        state: ':default',
        x: (window.innerWidth/2) - 100 ,
        y: (window.innerHeight/2) + 200,
        icon: '\uf007',
        // x: (window.innerWidth/2) - 100 ,
        // y: (window.innerHeight/2) + 200
    },
    {
        id: '7',
        group: 'TestNode',
        label: 'with image',
        shapeName: 'circle',
        state: ':default',
        x: (window.innerWidth/2) + 100 ,
        y: (window.innerHeight/2) + 200,
        // image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/240px-JavaScript-logo.png'
        image: 'https://cdn-icons-png.flaticon.com/128/12540/12540614.png'
        // image: 'https://avatars.githubusercontent.com/u/4606947?v=4'
        // x: (window.innerWidth/2) - 100 ,
        // y: (window.innerHeight/2) + 200
    }
];

export const exampleLinks: Array<ICanvasLink> = [
 
];

export const customICanvasOptions: ICanvasOptions = {
    styles: {
        nodes: {
            Project: {
                size: 40
            } 
        },
        links : {}
    }
} 