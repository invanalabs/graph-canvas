import type { Meta, StoryObj } from '@storybook/html';
import renderTemplate from '../../../utils/render';

import disableInteractionsExamplePlay from "./codes/disable-interactions"
import disableInteractionsExampleCode from "./codes/disable-interactions?raw"

import disableDraggingExamplePlay from "./codes/disable-dragging"
import disableDraggingExampleCode from "./codes/disable-dragging?raw"


const meta = {
  title: 'Features/Nodes/Interactions',
  // render: () => renderTemplate() ,
  // play: disableDraggingExamplePlay,
  // parameters: {
  //   storySource : {
  //     source: disableDraggingExampleCode
  //   }
  // }
} satisfies Meta;

export default meta;


export const Interactions: StoryObj = {
  name : "disable interactions and drag",
  render: () => renderTemplate() ,
  play: disableDraggingExamplePlay,
  parameters: {
    storySource : {
      source: disableDraggingExampleCode
    }
  }
};

// export const Draggable: StoryObj = {
//   name : "disable hover and click",
//   render: () => renderTemplate() ,
//   play: disableInteractionsExamplePlay,
//   parameters: {
//     storySource : {
//       source: disableInteractionsExampleCode
//     }
//   }
// };



