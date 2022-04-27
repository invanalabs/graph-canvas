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
import { Id, FullItem, PartItem } from "vis-data/declarations/data-interface"




const nodeSettings = {
    idField : "id",
    groupField: "label",
    labelField: "name"
}


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



export interface  GraphData<Item extends PartItem<IdProp>, IdProp extends string>  {
    nodes: DataSet<Item, string> ,
    edges: DataSet<Item, string>
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


export const json2GraphData = (jsonData: any ) => {

    const nodeSettings = {

    }
    /*
        create nodes based on 
    */

    const nodeGroupTransformations = [
        {
            idField : "id",
            groupField: "Flight Number",
            labelField: "name",
            propertyFields: {
                // TODO - add data types also for the properties
                name: "Flight Number",
                launch_date: "Launch Date",
                launch_time: "Launch Site"                
            }
        },
        {
            idField: "id",
            groupField: "Launch Site",
            labelField: "name",
            propertyFields: {name: "Launch Site"}
        },
        {
            idField: "id",
            groupField: "Vehicle Type",
            labelField: "name",
            propertyFields: {name: "Vehicle Type"}
            
        }
    ]
    var options = {};
    let nodes: DataSet<Node> = new DataSet(options);
    let edges: Array<Edge> = [];


    let nodesData = 

    nodeGroupTransformations.forEach(transformation => {

        jsonData.forEach(function(element:any){
            // console.log(element)

            const propertiesData: any = {"name": element[transformation.groupField]}
            // console.log("===propertiesData", propertiesData)
            // console.log("=== transformation.labelField]", transformation.labelField)
            // console.log("===propertiesData[transformation.labelField]", propertiesData[transformation.labelField])
            //
            let d = {
                id: element[transformation.groupField],
                group:  transformation.groupField,
                label: propertiesData[transformation.labelField],
                // properties: {}
            }
            
            // Object.keys(transformation.propertyFields).map(propertyFieldKey => {
            //     console.log("propertyFieldKey", propertyFieldKey)
            //     let _d:any = {}
            //     _d[propertyFieldKey] = element[transformation.propertyFields[propertyFieldKey]]
            //     return d;

            // })
            console.log("=nodesData.get(d.id)", nodes.get(d.id))
            if (!nodes.get(d.id)){
                console.log("=====", d.id)
                nodes.add([d])
            }

            // nodes.push(d)


        });

    })
    console.log("====nodes", nodes)
    console.log("=====nodes.get()", nodes.get());
    console.log("=====nodes.get() typeof", typeof nodes.get()[0]);
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