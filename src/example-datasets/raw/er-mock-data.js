import { MarkerType } from "reactflow";

export const initialNodes = [
  {
    id: "1.1",
    type: "NodeWithDataTypeFields",
    data: {
      // storeType: "MongoDB",
      label: "MongoDB (1.1)",
      fields: [{ label: "crawlerflow", id: "crawlerflow" }]
    }
  },
  {
    id: "1.2",
    type: "NodeWithDataTypeFields",
    data: {
      label: "FileStorage (1.2)",
      fields: [{ label: "myfile.csv", id: "myfile-csv", data_type: "string" }]
    }
  },
  {
    id: "2.1",
    type: "NodeWithDataTypeFields",
    data: {
      label: "NSE Data (2.1)",
      fields: [
        { label: "identifier", id: "identifier", data_type: "string" },
        { label: "is_active", id: "is_active", data_type: "string" }
      ]
      // unique_together: [
      //   { label: "Model", type: "data" },
      //   { label: "Error", type: "value" }
      // ]
    }
  },
  {
    id: "2.2",
    type: "NodeWithDataTypeFields",
    data: {
      label: "Source1 - Candle Data (2.2)",
      fields: [
        { label: "candle", id: "candle", data_type: "string" },
        { label: "title", id: "title", data_type: "string" },
        { label: "description", id: "description", data_type: "string" },
        { label: "is_active", id: "is_active", data_type: "bool" }
      ]
    }
  },
  {
    id: "3.1",
    type: "NodeWithDataTypeFields",
    data: {
      label: "Derived Data (3.1)",
      fields: [
        { label: "identifier", id: "identifier", data_type: "string" },
        { label: "candle", id: "candle", data_type: "string" },
        { label: "title", id: "title", data_type: "string" },
        { label: "description", id: "description", data_type: "string" }
      ]
    }
  },
  {
    id: "3.2",
    type: "NodeWithDataTypeFields",
    data: {
      label: "Derived Data (3.2)",
      fields: [
        { label: "identifier", id: "identifier", data_type: "string" },
        { label: "analysed_field", id: "analysed_field", data_type: "integer" }
      ]
    }
  }
];

export const initialEdges = [
  {
    id: "e0-1",
    source: "1.1",
    sourceHandle: "crawlerflow",
    target: "2.1",
    targetHandle: "2.1",
    animated: false,
    label: "has_NodeWithDataTypeFields",
    type: "step",
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  },
  {
    id: "e0-2",
    source: "1.2",
    sourceHandle: "myfile-csv",
    target: "2.2",
    targetHandle: "2.2",
    animated: false,
    label: "has_NodeWithDataTypeFields",
    type: "step",
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  },
  {
    id: "e0-3",
    source: "2.1",
    sourceHandle: "identifier",
    target: "3.1",
    targetHandle: "identifier",
    animated: false,
    // label: "has_NodeWithDataTypeFields",
    type: "step",
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  },
  {
    id: "e0-4",
    source: "2.2",
    sourceHandle: "candle",
    target: "3.1",
    targetHandle: "candle",
    animated: false,
    // label: "has_NodeWithDataTypeFields",
    type: "step",
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  },
  {
    id: "e0-5",
    source: "2.2",
    sourceHandle: "title",
    target: "3.1",
    targetHandle: "title",
    animated: false,
    // label: "has_NodeWithDataTypeFields",
    type: "step",
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  },
  {
    id: "e0-6",
    source: "3.1",
    sourceHandle: "identifier",
    target: "3.2",
    targetHandle: "identifier",
    animated: false,
    // label: "has_NodeWithDataTypeFields",
    type: "step",
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  },
  {
    id: "e0-7",
    source: "3.1",
    sourceHandle: "description",
    target: "3.2",
    targetHandle: "analysed_field",
    animated: false,
    // label: "has_NodeWithDataTypeFields",
    type: "step",
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  }
  // {
  //   id: "e0-7",
  //   source: "3.1",
  //   // sourceHandle: "crawlerflow",
  //   target: "1.1",
  //   targetHandle: "crawlerflow",
  //   animated: false,
  //   // label: "has_NodeWithDataTypeFields",
  //   type: "step",
  //   markerEnd: {
  //     type: MarkerType.ArrowClosed
  //   }
  // }
  // {
  //   id: "e0-2",
  //   source: "1.2",
  //   target: "2.2",
  //   animated: false,
  //   // label: "to the",
  //   type: "step",
  //   markerEnd: {
  //     type: MarkerType.ArrowClosed
  //   }
  // },
  // {
  //   id: "e0-3",
  //   source: "2.2",
  //   target: "3.1",
  //   animated: false,
  //   // label: "to the",
  //   type: "step",
  //   markerEnd: {
  //     type: MarkerType.ArrowClosed
  //   }
  // }
  // {
  //   id: "e0-1",
  //   source: "2.2",
  //   target: "3.2",
  //   animated: false,
  //   // label: "to the",
  //   type: "step",
  //   markerEnd: {
  //     type: MarkerType.ArrowClosed
  //   }
  // }
  // {
  //   id: "e0-2",
  //   source: "1.2__o__data",
  //   target: "2.2__i-Dataset__data",
  //   animated: false,
  //   markerEnd: {
  //     type: MarkerType.ArrowClosed
  //   }
  // }
  // { id: "e0-5", source: "2__o__data", target: "5__i__data", animated: false }
  // {
  //   id: "e1-4",
  //   source: "1__o__data",
  //   target: "4__i-Dataset__data",
  //   animated: false
  // },
  // {
  //   id: "e3-4",
  //   source: "3__o__data",
  //   target: "4__i-Labels__data",
  //   animated: false
  // },
  // {
  //   id: "e4-5",
  //   source: "4__o-Model__data",
  //   target: "5__i__data",
  //   animated: false
  // },
  // {
  //   id: "e4-6",
  //   source: "4__o-Error__value",
  //   target: "6__i__value",
  //   animated: false
  // }
];
// export default mockData;
