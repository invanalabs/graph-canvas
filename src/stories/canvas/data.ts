import { NodeData, LinkData } from "../../data/types"

export const nodes : Array<NodeData> = [
    {
        id: '1',
        group: 'Person',
        label: 'Ravi'
    },
    {
        id: '2',
        group: 'Project',
        label: 'Graph Canvas'
    }
];

export const links: Array<LinkData> = [
    {
        id: '1-2',
        group: 'authored',
        label: '1-2:authored',
        source: '1',
        target: '2'
    }
];