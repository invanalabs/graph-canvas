import type { Meta, StoryObj } from '@storybook/html';
import { createCanvas, customCanvasOptions } from '../../canvas';
import data from "../../datasets/flare-2.json";
import * as d3 from "d3";


const root = d3.hierarchy(data);
const links = root.links();
const nodes = root.descendants();

const nodesCleaned = nodes.map((node: any) => {
  return {
      id: node.id,
      label: node.id,
      group: node.group,
      properties: {}
  }
})

const linksCleaned = links.map((link: any)=>{
  return {
      id: `${link.source}-${link.target}`,
      source: link.source,
      target: link.target,
      group: "relation",
      properties: {
          value: link.value
      }
  }
})

console.log("pre data is ", nodes, links)

console.log("post data is ", nodesCleaned, linksCleaned)


const meta = {
  title: 'Layout/d3-hierarchy',
  render: () => createCanvas(nodesCleaned, linksCleaned, customCanvasOptions, 'd3-hierarchy') ,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   // backgroundColor: { control: 'color' },
  // },
} satisfies Meta;

export default meta;

export const HelloWorld: StoryObj = {};

