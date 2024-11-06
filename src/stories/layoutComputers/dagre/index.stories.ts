import type { Meta, StoryObj } from '@storybook/html';
import renderTemplate from '../../utils/render';
import dagreLayoutExamplePlay from "./code"
import dagreLayoutExampleSource from "./code?raw"

 
 

const meta = {
  title: 'Layout Computers/dagre',
} satisfies Meta;

export default meta;

export const DagreForceLayoutComputer: StoryObj = {
  name:  "TreeData",
  render: () => renderTemplate(),
  play: dagreLayoutExamplePlay,
  parameters: {
    storySource: {
      source: dagreLayoutExampleSource
    }
  }
};

