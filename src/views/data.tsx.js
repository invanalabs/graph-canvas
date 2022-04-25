const nodesData = [
    {id: 1, label: "Person", group: "Person", properties: { name: "Ravi"}},
    {id: 2, label: "Project", group: "Project", properties: { name: "Invana Studio"}},
    {id: 3, label: "Project", group: "Project", properties: { name: "Invana Engine"}},
]
const edgesData = [
    {id: "1-2", label: "authored", group: "authored", from: 1, to: 2},
    {id: "1-3", label: "authored", group: "authored",  from: 1, to: 3},
    {id: "2-3", label: "depends_on", group: "depends_on",  from: 2, to: 3},
]

const sampleData = {
    nodes: nodesData,
    edges: edgesData
}
console.log("sampleData", sampleData)

export default sampleData