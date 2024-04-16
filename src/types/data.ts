 
 
export interface Properties<T> {
    [key: string]: T;
}

// Define a common export interface for both Node and Edge
export interface GraphElement {
    id: string;
    type: string; // equivalent to label in graph 
    properties: Properties<any>;
}

export interface NodeData extends GraphElement {}

export interface LinkData extends GraphElement {
    source: string | number | NodeData;
    target: string | number | NodeData;
}
