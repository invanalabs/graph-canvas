import type { Meta, StoryObj } from '@storybook/html';
import { wrapStory } from "../utils";
import template from "./../html-templates/full-screen.html?raw";

import circleShapeExamplePlay from "./nodes/circles/index";
import circleShapeExampleSource from "./nodes/circles/index?raw";

import rectangleShapeExamplePlay from "./nodes/rectangle/index";
import rectangleShapeExampleSource from "./nodes/rectangle/index?raw";


import symmetricalPolygonShapeExamplePlay from "./nodes/symmetricalPolygon/index";
import symmetricalPolygonShapeExampleSource from "./nodes/symmetricalPolygon/index?raw";


const meta = {
  title: 'Shapes/Nodes',
  parameters: {
    layout: 'fullscreen',
  }

} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Circle: Story = {
  name: "Circle",
  render: () => template,
  play: wrapStory(circleShapeExamplePlay),
  args: {},
  parameters: {
    storySource: {
      circleShapeExampleSource,
    },
  },
};


export const Rectangle: Story = {
  name: "Rectangle",
  render: () => template,
  play: wrapStory(rectangleShapeExamplePlay),
  args: {},
  parameters: {
    storySource: {
      rectangleShapeExampleSource,
    },
  },
};


export const Triangle: Story = {
  name: "SymmetricalPolygon",
  render: () => template,
  play: wrapStory(symmetricalPolygonShapeExamplePlay),
  args: {},
  parameters: {
    storySource: {
      symmetricalPolygonShapeExampleSource,
    },
  },
};
