import type { Meta, StoryObj } from '@storybook/html';
import { createCanvas } from '../canvas';
import { miserablesData } from '../datasets/miserables-no-positions';
import { ICanvasOptions } from '../../canvas';

 

const customICanvasOptions: ICanvasOptions = {
  // styles: {
  //     nodes: {}
  // }
  extraSettings: {
    nodeSizeBasedOn: "degree"
  }
} 

// const nodeGroups = data.nodes.map((node: any) => { return node.group})

// const nodeStyles: any = {};

// nodeGroups.forEach(group => {
//   nodeStyles[group] = {size: 10}
// })
 

// console.log("==nodeStyles", nodeStyles)
// customICanvasOptions.styles.nodes = nodeStyles

const meta = {
  title: 'Layout/dagre',
  render: () => createCanvas(miserablesData.nodes, miserablesData.links, 
    customICanvasOptions, 'dagre') ,
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

export const LesMiserables: StoryObj = {};

