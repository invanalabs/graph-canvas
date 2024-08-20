import type { Meta, StoryObj } from '@storybook/html';
import renderTemplate from '../../../utils/render';
import linkStatesExamplePlay from "./code"
import linkStatesExampleCode from "./code?raw"
import { notImplementedPage } from '../../../utils/notImplementedPage';


const meta = {
  title: 'Features/Links',
} satisfies Meta;

export default meta;

export const States: StoryObj = {
  name: "States",
  render: () => renderTemplate() ,
  play: linkStatesExamplePlay,
  parameters: {
    storySource : {
      source: linkStatesExampleCode
    }
  }
};

 
export const Types: StoryObj = {
  name : "Types",
  render: () => notImplementedPage('Link Types') ,
};


