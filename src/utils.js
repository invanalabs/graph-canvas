// export const convertNestObjectArrayToMapByField = (array, fieldName) => {
//   return new Map(array.map((obj) => [obj[fieldName], obj]));
// };

// export const getIncomingEdgesForNodeHandle = (nodeId, handleId, edges) => {
//   console.log("getIncomingEdgesForNodeHandle", nodeId, handleId, edges);

//   // const edgesMappedbySourceId = convertNestObjectArrayToMapByField(
//   //   edges,
//   //   "source"
//   // );
//   // const edgesMappedbyTargetId = convertNestObjectArrayToMapByField(
//   //   edges,
//   //   "target"
//   // );

//   edges.forEach((edge) => {
//     console.log("===edge", edge);
//   });
//   // const edges
//   // console.log("====", edgesMappedbySourceId, edgesMappedbyTargetId);

//   return;
// };

// export const getOutgoingEdgesForNodeHandle = (nodeId, handleId, edges) => {
//   console.log("getOutgoingEdgesForNodeHandle", nodeId, handleId, edges);
//   return;
// };

// export const generateHandleName = (nodeId, handleId)=> {
//   return nodeId +
// }

export const generateFieldName = (nodeId, handleId) => {
    return nodeId + "-" + handleId;
  };
  