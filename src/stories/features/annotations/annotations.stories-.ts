import type { Meta, StoryObj } from '@storybook/html';
import { notImplementedPage } from '../../utils/notImplementedPage';


const meta = {
  title: 'Features/Annotation',

} satisfies Meta;

export default meta;


export const AnnotationStyling: StoryObj = {
  name : "styling",
  render: () => notImplementedPage('AnnotationStyling') ,
};

 
