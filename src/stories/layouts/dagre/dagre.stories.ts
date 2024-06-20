import type { Meta, StoryObj } from '@storybook/html';
import { createCanvas } from '../../canvas';
import data from "../../datasets/miserables.json";


const nodesCleaned = data.nodes.map((node: any) => {
    return {
        id: node.id,
        label: node.id,
        group: node.group,
        data: {}
    }
})

const linksCleaned = data.links.map((link: any)=>{
    return {
        id: `${link.source}-${link.target}`,
        source: link.source,
        target: link.target,
        group: "relation",
        data: {
            value: link.value
        }
    }
})

const customICanvasOptions = {
  styles: {
      nodes: {}
  }
} 

const nodeGroups = data.nodes.map((node: any) => { return node.group})

const nodeStyles: any = {};

nodeGroups.forEach(group => {
  nodeStyles[group] = {size: 10}
})
 

console.log("==nodeStyles", nodeStyles)
customICanvasOptions.styles.nodes = nodeStyles

const meta = {
  title: 'Layout/dagre',
  render: () => createCanvas(nodesCleaned, linksCleaned, customICanvasOptions, 'dagre') ,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} satisfies Meta;

export default meta;

export const HelloWorld: StoryObj = {};

