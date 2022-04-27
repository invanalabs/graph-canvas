/*
 *
 * Copyright 2021 Invana
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http:www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
// const csv = require('csv-parser')
// const fs = require('fs')
import { DataSet } from "vis-data"
// import {  PartItem } from "vis-data/declarations/data-interface"




// const nodeSettings = {
//     idField : "id",
//     groupField: "label",
//     labelField: "name"
// }


interface Node  {
    id: string,
    group: string,
    label: string,
    // properties: any
}


interface Edge  {
    id: string,
    group: string,
    label: string,
    // properties: any
}


// interface  GraphData {
//     nodes: Array<Node>
//     edges: Array<Edge>
// }



export interface  GraphData {
    nodes: DataSet<any> ,
    edges: DataSet<any>
}




// export const csv2json = (url:string) => {
    /*
        const data = csv2json("https://raw.githubusercontent.com/BriantOliveira/SpaceX-Dataset/master/dataset/SpaceX-Launch-Data.csv");
        console.log("+++++csv data", data)
    */
//     const results:any = [];
    
//     fs.createReadStream('data.csv')
//       .pipe(csv())
//       .on('data', (data:any) => results.push(data))
//       .on('end', () => {
//         console.log(results);
 
//         return results
//       });

// }


export const modelGroup2GraphData = (nodeGroupModels: any, edgeGroupModels: any) => {
    var options = {};
    let nodes: DataSet<Node> = new DataSet(options);
    let edges: DataSet<Edge> =  new DataSet(options);
    
    Object.keys(nodeGroupModels).forEach( nodeGroupKey => {
        // const nodeGroupModel = nodeGroupModels[nodeGroupKey];
        let node = {
            id: nodeGroupKey,
            group:  nodeGroupKey,
            label: nodeGroupKey,
            // properties: {}
        }
        if(!nodes.get(node.id)){ nodes.add([node])  }
    })

    Object.keys(edgeGroupModels).forEach( edgeId => {
        const edgeGroupModel = edgeGroupModels[edgeId];
        let edge = {
            id: edgeId,
            group:  edgeGroupModel.groupName,
            label: edgeGroupModel.groupName,
            from: edgeGroupModel.sourceGroup,
            to: edgeGroupModel.targetGroup
            // properties: {}
        }
        if(!edges.get(edge.id)){ edges.add([edge])  }
    })


    return {nodes: nodes, edges: edges}
}


export const json2GraphData = (jsonData: any, nodeGroupModels: any, edgeGroupModels: any ) => {

    /*
        create nodes based on 
    */




    var options = {};
    let nodes: DataSet<Node> = new DataSet(options);
    let edges: DataSet<Edge> =  new DataSet(options);

    jsonData.forEach(function(element:any){
        let nodeLets: any = []
        Object.keys(nodeGroupModels).forEach(groupField => {
            const transformation: any = nodeGroupModels[groupField];
            const propertiesData: any = {"name": element[groupField]}
            let node = {
                id: element[groupField],
                group:  groupField,
                label: propertiesData[transformation.labelField],
                // properties: {}
            }
            
            // Object.keys(transformation.propertyFields).map(propertyFieldKey => {
            //     console.log("propertyFieldKey", propertyFieldKey)
            //     let _d:any = {}
            //     _d[propertyFieldKey] = element[transformation.propertyFields[propertyFieldKey]]
            //     return d;

            // })
            nodeLets.push(node)
            if(!nodes.get(node.id)){ nodes.add([node])  }
        });

        nodeLets.forEach((node: any) =>{
            Object.keys(edgeGroupModels).forEach(edgeKey => {
                const edgeTransformation: any = edgeGroupModels[edgeKey];
                if(edgeTransformation.sourceGroup === node.group){ // node is source/from node
                    const targetNodeId = element[edgeTransformation.targetGroup];
                    const sourceNodeId = element[edgeTransformation.sourceGroup];
                    let edgeData: any = {
                        id: targetNodeId.toString() + "-" + sourceNodeId.toString(),
                        group: edgeTransformation.groupName,
                        from: sourceNodeId,
                        to: targetNodeId,
                        label:  edgeTransformation.groupName
                    }
                    if(!edges.get(edgeData.id)){ edges.add([edgeData])  }
                }
            })
        })
 
    })
    return {nodes: nodes, edges: edges}
}

// export const getLabelValue(element, labelPropertyKey){
//
// }

// const schemaNodeDataFn = (model: any) => {
//     return {id: model.name, label: model.name, group: model.name}
// }

// const schemaEdgeDataFn = (model: any) => {
//     let allEdgesModels: any = []
//     model.link_paths.map((linkPath: any) => {
//         allEdgesModels.push({
//             id: model.name + "-" + linkPath.outv_label + "-" + linkPath.inv_label,
//             label: model.name,
//             group: model.name + "-" + linkPath.outv_label + "-" + linkPath.inv_label,
//             from: linkPath.outv_label, to: linkPath.inv_label,
//             arrows: "to"
//         })
//     })
//     return allEdgesModels;
// }

// export const convertToNodesData = (nodes: any, nodeDataFn: any) => {
//     let allVertexModels: any = [];
//     nodes.map((model: any) => {
//         allVertexModels.push(nodeDataFn(model))
//     })
//     return allVertexModels;
// }


// export const convertToEdgesData = (edges: any, edgeDataFn: any) => {
//     let allEdgesModels: any = [];
//     edges.map((model: any) => {
//         const _ = edgeDataFn(model);
//         if (Array.isArray(_)) {
//             allEdgesModels.push(..._)
//         } else {
//             allEdgesModels.push(_)
//         }
//     })
//     return allEdgesModels;
// }


// const convertSchemaDataToVisJsData = (responseData: any) => {
//     console.log("responseData", responseData);
//     let allEdgesModels: any = [];
//     let allVertexModels: any = [];
//     allVertexModels = convertToNodesData(responseData.get_all_vertex_models, schemaNodeDataFn)
//     allEdgesModels = convertToEdgesData(responseData.get_all_edges_models, schemaEdgeDataFn)
//     return {nodes: allVertexModels, edges: allEdgesModels}

// }


// const getNodeElementDataFn = (model: any) => {
//     return {id: model.id, label: model.id.toString(), type: "node", group: model.label, properties: model.properties}
// }

// const getEdgeElementDataFn = (model: any) => {
//     return {id: model.id, label: model.id.toString(), type: "edge", group: model.label, properties: model.properties}
// }


// export const convertToVisJsData = (nodes: any, edges: any) => {
//     console.log("responseData", nodes, edges);
//     let allEdgesModels: any = [];
//     let allVertexModels: any = [];
//     allVertexModels = convertToNodesData(nodes, getNodeElementDataFn)
//     allEdgesModels = convertToEdgesData(edges, getEdgeElementDataFn)
//     return {nodes: allVertexModels, edges: allEdgesModels}

// }
// export default convertSchemaDataToVisJsData;