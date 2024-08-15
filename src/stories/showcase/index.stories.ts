import type { Meta, StoryObj } from '@storybook/html';
import renderTemplate from '../utils/render';
import helloWorldPlay from "./hello-world/code";
import helloWorldSource from "./hello-world/code?raw";

import LargeDatasetExamplePlay from "./largeDataset/code";
import LargeDataseteExampleSource from "./largeDataset/code?raw";


import lesMiserablesPlay from "./les-miserables/code";
import lesMiserablesSource from "./les-miserables/code?raw";





const meta: Meta = {
  title: 'Showcase',
};
export default meta;

type Story = StoryObj;

export const story: Story = {
  name: "Hello World",
  render: () => renderTemplate(),
  play: helloWorldPlay,
  parameters: {
    storySource: {
      source: helloWorldSource,
    },
  },
};


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
