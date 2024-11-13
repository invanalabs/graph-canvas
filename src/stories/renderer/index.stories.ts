import type { Meta, StoryObj } from '@storybook/html';
import { wrapStory } from "../utils";
import template from "./../html-templates/full-screen.html?raw";

import webglExamplePlay from "./webgl-example/index";
import webglExampleSource from "./webgl-example/index?raw";

import webgpuExamplePlay from "./webgpu-example/index";
import webgpuExampleSource from "./webgpu-example/index?raw";


const meta = {
  title: 'Renderer',
  parameters: {
    layout: 'fullscreen',
  }

} satisfies Meta;

export default meta;

type Story = StoryObj;

export const webglExample: Story = {
  name: "WebGL Example",
  render: () => template,
  play: wrapStory(webglExamplePlay),
  args: {},
  parameters: {
    storySource: {
      webglExampleSource,
    },
  },
};

export const webgpuExample: Story = {
  name: "WebGPU Example",
  render: () => template,
  play: wrapStory(webgpuExamplePlay),
  args: {},
  parameters: {
    storySource: {
      webgpuExampleSource,
    },
  },
};
