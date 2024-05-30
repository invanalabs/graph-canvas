import { CanvasData, NodeEventData, LinkEventData, ICanvasNode, ICanvasLink } from "../../store";
import { action } from '@storybook/addon-actions';


const exampleNodes: Array<ICanvasNode> = [
  { id: '1', group: 'Person', label: 'Person-1' },
  { id: '2', group: 'Person', label: 'Person-2' },
  { id: '3', group: 'Person', label: 'Person-3' },
  { id: '4', group: 'Person', label: 'Person-4' },

];

const exampleLinks: Array<ICanvasLink> = [
  { id: '1-2', group: 'authored', label: 'default-1-2', sourceId: '1', targetId: '2' },
  { id: '1-2.1', group: 'authored', label: 'default-1-2.1', sourceId: '1', targetId: '2' },
  { id: '2-3', group: 'authored', label: 'default-2-3', sourceId: '2', targetId: '3' },
  { id: '2-4', group: 'authored', label: 'default-2-4', sourceId: '2', targetId: '4' },
  { id: '3-4', group: 'authored', label: 'default-3-4', sourceId: '3', targetId: '4' },
];

export const createComponent = () => {
  const html = document.createElement("div");
  html.style.backgroundColor = "#333333"
  html.style.height = "100vh";
  html.style.width = "100vw";
  html.style.margin = "0px";

  const logAction = action('action');

  document.addEventListener("DOMContentLoaded", function (_) {

    const data = new CanvasData();
    // add nodeAdded event listener
    data.on('nodeAdded', ({ key, value }: NodeEventData) => {
      logAction("nodeAdded", key, value);
    });
    // add linkAdded event listener
    data.on('linkAdded', ({ key, value }: LinkEventData) => {
      logAction("linkAdded", key, value);
    });

    // add nodeDeleted event listener
    data.on('nodeDeleted', ({ key, value }: LinkEventData) => {
      logAction("nodeDeleted", key, value);
    });

    // add linkDeleted event listener
    data.on('linkDeleted', ({ key, value }: LinkEventData) => {
      logAction("linkDeleted", key, value);
    });

    // add linkDeleted event listener
    data.on('nodeUpdated:links', ({ key, value }: NodeEventData) => {
      logAction("nodeUpdated:links", key, value);
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

