// import * as fs from 'fs';
// https://observablehq.com/@elisabetb/force-layout
import { ILink, INode } from "../../../graphCanvas/types";

async function readJSONFile(filePath: string): Promise<any> {
    try {
        // Fetch JSON data
        const response = await fetch(filePath);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        // Parse JSON data
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Error reading JSON file: ' + error.message);
    }
}

async function fetchData() {
    try {
        const filePath = '/src/stories/datasets/miserables/miserables.json';
        const data = await readJSONFile(filePath);
        console.log('JSON data:', data);
        return data;
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return null;
    }
}
/*
   fetchData().then(data => {
        // You can access the returned data here
        console.log('Returned data:', data);
    });
    */

export  const convert2CanvasData = (data: any) => {
        data.nodes.forEach((node: INode)=>{
            node.shape = "circle";
            node.label = node.id,
            node.type =  "Something",
            node.shape = "circle"
        })
        data.links.forEach((link: ILink) => {
            link.id = `${link.source}-${link.target}`
        })

        return data;

    }

export default fetchData