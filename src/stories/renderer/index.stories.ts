import type { Meta, StoryObj } from '@storybook/html';
import { wrapStory } from "../utils";
import simpleExamplePlay from "./simple-example/index";
import source from "./simple-example/index?raw";

import template from "./../html-templates/full-screen.html?raw";


const meta = {
  title: 'Renderer',
  parameters: {
    layout: 'fullscreen',
  }

} satisfies Meta;

export default meta;

type Story = StoryObj;

export const story: Story = {
  name: "Simple Example",
  render: () => template,
  play: wrapStory(simpleExamplePlay),
  args: {},
  parameters: {
    storySource: {
      source,
    },
  },
};
