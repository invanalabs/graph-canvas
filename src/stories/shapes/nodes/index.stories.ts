import type { Meta, StoryObj } from '@storybook/html';
import { wrapStory } from "../../utils";
import template from "./../../html-templates/full-screen.html?raw";

import circleShapeExamplePlay from "./circles/index";
import circleShapeExampleSource from "./circles/index?raw";

import rectangleShapeExamplePlay from "./rectangle/index";
import rectangleShapeExampleSource from "./rectangle/index?raw";


import symmetricalPolygonShapeExamplePlay from "./symmetricalPolygon/index";
import symmetricalPolygonShapeExampleSource from "./symmetricalPolygon/index? raw";



// import straightLineShapeExamplePlay from "../links/straightLine/index";
// import straightLineShapeExampleSource from "./links/straightLine/index?raw";


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
