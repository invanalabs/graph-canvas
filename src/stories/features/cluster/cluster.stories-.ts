import type { Meta, StoryObj } from '@storybook/html';
import { notImplementedPage } from '../../utils/notImplementedPage';


const meta = {
  title: 'Features/Clustering',
 
} satisfies Meta;

export default meta;


export const ClusterStyling: StoryObj = {
  name : "styling",
  render: () => notImplementedPage('ClusterStyling') ,
};


export const GroupNodeIntoCluster: StoryObj = {
  name: "groups nodes into Cluster",
  render: () => notImplementedPage("GroupNodeIntoCluster") ,
};

export const CollapseCluster: StoryObj = {
  name: "collapse or expand Cluster",
  render: () => notImplementedPage("CollapseCluster") ,
};



