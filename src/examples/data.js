const exampleData = {
  nodes: [
    {
      id: 1,
      label: "Person"
      // properties: {
      //   name: "Ravi"
      // }
    },
    {
      id: 2,
      label: "Person"
      // properties: {
      //   name: "Roja"
      // }
    },
    {
      id: 3,
      label: "Person"
      // properties: {
      //   name: "Rinku"
      // }
    }
  ],
  edges: [
    {
      id: 4,
      label: "has_spouse",
      source: 1,
      target: 2
      // properties: {
      //   married_since: "2020"
      // }
    },
    {
      id: 5,
      label: "has_spouse",
      source: 2,
      target: 1
      // properties: {
      //   married_since: "2020"
      // }
    },
    {
      id: 6,
      label: "has_child",
      source: 1,
      target: 3
    },
    {
      id: 7,
      label: "has_child",
      source: 2,
      target: 3
    },
    {
      id: 8,
      label: "married_to",
      source: 1,
      target: 2
      // properties: {
      //   married_since: "2020"
      // }
    },
    {
      id: 9,
      label: "married_to",
      source: 2,
      target: 1
      // properties: {
      //   married_since: "2020"
      // }
    }
  ]
};

export default exampleData;

export const testData = {
  nodes: [
    {
      id: "node1",
      x: 150,
      y: 50,
      label: "node1"
    },
    {
      id: "node2",
      x: 250,
      y: 200,
      label: "node2"
    },
    {
      id: "node3",
      x: 100,
      y: 350,
      label: "node3"
    }
  ],
  edges: [
    {
      source: "node1",
      target: "node2",
      label: "edge 1"
    },
    {
      source: "node2",
      target: "node3",
      label: "edge 2"
    },
    {
      source: "node3",
      target: "node1",
      label: "edge 3"
    }
  ]
};
