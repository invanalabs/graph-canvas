

export type IdString = Number | String;

export type Properties  = {
    [key: string]: string | number | object;
}

export type NodeData = {
    readonly id: IdString
    group: String
    label?: String
    properties?: Properties,
}

export type LinkData = NodeData & {
    source: IdString 
    target:  IdString
}