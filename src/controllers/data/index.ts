import { ILink, INode } from "../../canvas/types";



export default class DataCtrl {

    nodes: INode[];
    links: ILink[];

    constructor(nodes: INode[], links: ILink[] ){
        this.links = links;
        this.nodes = nodes;
    }

    addData = (nodes: INode[], links: ILink[]) => {
        // make this upsert
        this.nodes = nodes;
        this.links = links
    }


}