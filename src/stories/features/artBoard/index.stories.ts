import type { Meta, StoryObj } from '@storybook/html';
import renderTemplate from '../../utils/render';

import nodeColorBasedOnGroupExamplePlay from "./nodeColorBasedOnGroup/code"
import nodeColorBasedOnGroupExampleSource from "./nodeColorBasedOnGroup/code?raw"

import linkColorBasedOnGroupExamplePlay from "./linkColorBasedOnGroup/code"
import linkColorBasedOnGroupExampleSource from "./linkColorBasedOnGroup/code?raw"



const meta = {
  title: 'Features/ArtBoard',
} satisfies Meta;

export default meta;


// export const nodeSizeBasedOn: StoryObj = {
//   name: "node size based on degree",
//   render: () => notImplementedPage("nodeSizeBasedOn") ,
// };


export const nodeColorBasedOnGroup: StoryObj = {
  name : "node color based on group",
  render: () => renderTemplate(),
  play: nodeColorBasedOnGroupExamplePlay,
  parameters: {
    storySource: {
      source: nodeColorBasedOnGroupExampleSource
    }
  }
};


export const linkColorBasedOn: StoryObj = {
  name : "link color based on group",
  render: () => renderTemplate(),
  play: linkColorBasedOnGroupExamplePlay,
  parameters: {
    storySource: {
      source: linkColorBasedOnGroupExampleSource
    }
  }
};

// export const labelVisibilityZoomThreshold: StoryObj = {
//   name : "label visibility on zoom",
//   render: () => notImplementedPage('labelVisibilityZoomThreshold') ,
// };





