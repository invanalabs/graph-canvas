import type { Meta, StoryObj } from '@storybook/html';
import { createCanvas } from '../../canvas';
import data from "../../datasets/miserables.json";
import { ICanvasLink, ICanvasNode } from '../../../store';
// import stc from "string-to-color";


const nodesCleaned = data.nodes.map((node: any): ICanvasNode => {

    if (node.group === 5){
      node.style = {size: 30}
    }
    return {
        id: node.id,
        label: node.id,
        group: "group-" + node.group.toString(),
        properties: {
          value: node.value
        },
        style: node.style
    }
})

const linksCleaned = data.links.map((link: any): ICanvasLink => {
    return {
        id: `${link.source}-${link.target}`,
        group: "relation",
        source: link.source,
        target: link.target,
        properties: {
            value: link.value
        },
        style: link.style
    }
})

// const customICanvasOptions: ICanvasOptions = {
//   styles: {
//       nodes: {}
//   }
// } 

// const nodeGroups = [...new Set(nodesCleaned.map((node: any) => { return   node.group}))]

// console.log("===nodeGroups", nodeGroups)
// const nodeStyles: any = {};

// nodeGroups.forEach(group => {
//   nodeStyles[group] = {size: 10, shapeName: {background: {color: stc(group) }}}
// })
 

// console.log("==nodeStyles", nodeStyles)
// customICanvasOptions.styles.nodes = nodeStyles

const meta = {
  title: 'Layout/d3-force',
  render: () => createCanvas(nodesCleaned, linksCleaned, undefined, 'd3-force') ,
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

