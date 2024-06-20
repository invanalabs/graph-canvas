import { DataStore, NodeEventData, LinkEventData, ICanvasNode, ICanvasLink } from "../../store";
import { action } from '@storybook/addon-actions';


const exampleNodes: Array<ICanvasNode> = [
  { id: '1', group: 'Person', label: 'Person-1' },
  { id: '2', group: 'Person', label: 'Person-2' },
  { id: '3', group: 'Person', label: 'Person-3' },
  { id: '4', group: 'Person', label: 'Person-4' },

];

const exampleLinks: Array<ICanvasLink> = [
  { id: '1-2', group: 'authored', label: 'default-1-2', source: '1', target: '2' },
  { id: '1-2.1', group: 'authored', label: 'default-1-2.1', source: '1', target: '2' },
  { id: '2-3', group: 'authored', label: 'default-2-3', source: '2', target: '3' },
  { id: '2-4', group: 'authored', label: 'default-2-4', source: '2', target: '4' },
  { id: '3-4', group: 'authored', label: 'default-3-4', source: '3', target: '4' },
];

export const createComponent = () => {
  const html = document.createElement("div");
  html.style.backgroundColor = "#333333"
  html.style.height = "100vh";
  html.style.width = "100vw";
  html.style.margin = "0px";

  const logAction = action('action');

  document.addEventListener("DOMContentLoaded", function (_) {

    const data = new DataStore();
    // add nodeAdded event listener
    data.on('nodeAdded', ({ id, node }: NodeEventData) => {
      logAction("nodeAdded", id, node);
    });
    // add linkAdded event listener
    data.on('linkAdded', ({ id, link }: LinkEventData) => {
      logAction("linkAdded", id, link);
    });

    // add nodeDeleted event listener
    data.on('nodeDeleted', ({ id, node }: NodeEventData) => {
      logAction("nodeDeleted", id, node);
    });

    // add linkDeleted event listener
    data.on('linkDeleted', ({ id, link }: LinkEventData) => {
      logAction("linkDeleted", id, link);
    });

    // add linkDeleted event listener
    data.on('nodeUpdated:links', ({ id, node }: NodeEventData) => {
      logAction("nodeUpdated:links", id, node);
    });
    
    // add data
    data.add(exampleNodes, exampleLinks)
    // delete node
    data.deleteNode(exampleNodes[0].id)
    // delete link
    data.deleteLink(exampleLinks[2].id)

  }, false);
  return html
}

