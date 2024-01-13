import data from "../datasets/nivo-dataset";
import helloWorldData from "../datasets/hello-world-story";
import { NetworkLayoutStory } from './NetworkLayoutStory';

export default {
  title: 'Layouts/NetworkLayout',
  component: NetworkLayoutStory,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const NivoDataset = {
  args: {
    data: data
  },
};



export const helloWorldDataset = {
  args: {
    data: helloWorldData
  },
};
