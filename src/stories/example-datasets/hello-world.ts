import { ICanvasLink, ICanvasNode } from "../../store";


export const helloWorldDataSet: { nodes: Array<ICanvasNode>, links: Array<ICanvasLink> } = {
    nodes: [
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
        },
        {
            id: '3',
            group: 'Project',
            label: 'Graph Engine',
            shapeName: 'circle',
            x: 350,
            y: 350
        }
    ],
    links: [{
        id: '1-2',
        group: 'authored',
        label: '1-2:authored',
        source: '1',
        target: '2',
        shapeName: 'straightLine'
    },
    {
        id: '1-3',
        group: 'authored',
        label: '1-3:authored',
        source: '1',
        target: '3',
        shapeName: 'straightLine'
    }
    ]
}