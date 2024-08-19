import type { Meta, StoryObj } from '@storybook/html';
import renderTemplate from '../../../utils/render';
import nodeStatesExamplePlay from "./code"
import nodeStatesExampleCode from "./code?raw"

const meta = {
  title: 'Features/Nodes',
} satisfies Meta;

export default meta;

export const States: StoryObj = {
  name: "States",
  render: () => renderTemplate() ,
  play: nodeStatesExamplePlay,
  parameters: {
    storySource : {
      source: nodeStatesExampleCode
    }
  }
};

 


