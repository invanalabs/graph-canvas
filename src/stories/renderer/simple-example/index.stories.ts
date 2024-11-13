import type { Meta, StoryObj } from '@storybook/html';
import { wrapStory } from "../../utils";
import simpleExamplePlay from "./index";
import source from "./index?raw";
import template from "./../../html-templates/full-screen.html?raw";


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
