import type { Meta, StoryObj } from '@storybook/html';
import renderTemplate from '../utils/render';

// import helloWorldPlay from "./hello-world/code";
// import helloWorldSource from "./hello-world/code?raw";

import LargeDatasetExamplePlay from "./largeDataset/code";
import LargeDataseteExampleSource from "./largeDataset/code?raw";

import lesMiserablesPlay from "./les-miserables/code";
import lesMiserablesSource from "./les-miserables/code?raw";

import customiseStylingExamplePlay from "./customiseStyling/code"
import customiseStylingExampleSource from "./customiseStyling/code?raw"


import leafLetMapExamplePlay from "./map-leaflet/code"
import leafLetMapExampleSource from "./map-leaflet/code?raw"


import mapTemplate from "./map-leaflet/index.html?raw";


const meta: Meta = {
  title: 'Showcase',
};
export default meta;

type Story = StoryObj;

// export const story: Story = {
//   name: "Hello World",
//   render: () => renderTemplate(),
//   play: helloWorldPlay,
//   parameters: {
//     storySource: {
//       source: helloWorldSource,
//     },
//   },
// };


export const LesMiserablesStory: Story = {
  name: "Les Miserables",
  render: () => renderTemplate(),
  play: lesMiserablesPlay,
  parameters: {
    storySource: {
      source: lesMiserablesSource,
    },
  },
};


export const LargeDatasetStory: Story = {
  name: "LargeDataset",
  render: () => renderTemplate(),
  play: LargeDatasetExamplePlay,
  parameters: {
    storySource: {
      source: LargeDataseteExampleSource,
    },
  },
};



export const CustomiseStyling: StoryObj = {
  name : "Theming :: Customise Styling",
  render: () => renderTemplate(),
  play: customiseStylingExamplePlay,
  parameters: {
    storySource: {
      source: customiseStylingExampleSource
    }
  }
};



export const LeafletMap: StoryObj = {
  name : "Map :: Leaflet",
  render: () => mapTemplate,
  play: leafLetMapExamplePlay,
  parameters: {
    storySource: {
      source: leafLetMapExampleSource
    }
  }
};