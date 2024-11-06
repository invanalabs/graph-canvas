import type { Meta, StoryObj } from '@storybook/html';
import d3ForceLayoutExamplePlay from "./code"
import d3ForceLayoutExampleSource from "./code?raw"
import renderTemplate from '../../utils/render';


 
const meta = {
  title: 'Layout Computers/d3-force',
} satisfies Meta;

export default meta;


export const D3ForceLayoutComputer: StoryObj = {
  name:  "LesMiserables",
  render: () => renderTemplate(),
  play: d3ForceLayoutExamplePlay,
  parameters: {
    storySource: {
      source: d3ForceLayoutExampleSource
    }
  }
};

