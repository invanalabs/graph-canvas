

export type PropertiesType = {
   [key: string]: string
}

export type NodeType = {
   id: String | Number
   label: String
   properties: PropertiesType
}

export type EdgeType = NodeType & {
   source: String | Number
   target: String | Number
}

export type RenderedNode = {
   id: String | Number
   node: NodeType
   x: Number
   y: Number
   title: String
}

export type RenderedEdge = {
   id: String | Number
   edge: EdgeType
   x: Number
   y: Number
   title: String
}