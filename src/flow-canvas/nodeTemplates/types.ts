

type NodeTemplateStyleOptions = {

}

type CanvasNodeTemplateDataBase = {
    nodeLabel: string // equals to Person, Project in graph db world
    nodeProperties: object // all the properties of the node in the graph db world

    templateData: object // structured data needed by template to render
    templateStyleOptions: object
    templateStyleOptionStates: object
}

type CanvasNodeTemplateProps = CanvasNodeTemplateDataBase & {
    id: string
    label: string // there should be copy of label in templateData.label
    selected: boolean
}
