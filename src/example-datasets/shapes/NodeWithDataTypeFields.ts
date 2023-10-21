

 const exampleData = [{
    id: "2.1",
    type: "NodeWithDataTypeFields",
    data: {
      label: "NSE Data (2.1)",
      fields: [
        { label: "identifier", id: "identifier", data_type: "string" },
        { label: "is_active", id: "is_active", data_type: "string" }
      ]
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
  }];

export default exampleData;