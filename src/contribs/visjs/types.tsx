/*
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
 */


import {GraphCanvasCtrl} from "./canvas-ctrl";

export type GraphDataType = {
    nodes: Array<any>;
    edges: Array<any>;
}

export interface CanvasArtBoardProps {
    // newData: GraphDataType,
    renderCanvas: boolean,
    setRenderCanvas: (state: boolean) => void,
    canvasCtrl: GraphCanvasCtrl,
    containerId: string,
    options: object,
    events: object,
    style: object
}

import { DataSet } from "vis-data"
// import {  PartItem } from "vis-data/declarations/data-interface"




 
export interface Node  {
    id: string,
    group: string,
    label: string,
    // properties: any
}


export interface Edge  {
    id: string,
    group: string,
    label: string,
    // properties: any
}


 

export interface  GraphData {
    nodes: DataSet<any> ,
    edges: DataSet<any>
}