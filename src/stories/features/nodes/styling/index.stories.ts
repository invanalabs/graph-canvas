import type { Meta, StoryObj } from '@storybook/html';
import { notImplementedPage } from '../../../utils/notImplementedPage';


import nodeImagesExamplePlay from "./codes/with-images-icons"
import nodeImagesExampleCode from "./codes/with-images-icons"
import renderTemplate from '../../../utils/render';


const meta = {
  title: 'Features/Nodes/Styling',
} satisfies Meta;

export default meta;


export const WithImageAndIcon: StoryObj = {
  name: "shape : images and icons",
  render: () => renderTemplate() ,
  play: nodeImagesExamplePlay,
  parameters: {
    storySource : {
      source: nodeImagesExampleCode
    }
  }
};


export const Styling: StoryObj = {
  name : "Styling options",
  render: () => notImplementedPage('Styling options') ,
};


export const Interactions: StoryObj = {
  name : "Interactions - hover in/out",
  render: () => notImplementedPage('Interactions(disable hover in/out)') ,
};

export const Draggable: StoryObj = {
  name : "Draggable or Locked",
  render: () => notImplementedPage('Draggable or Locked') ,
};



