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
    // add node:added event listener
    data.on('node:added', ({ id, node }: NodeEventData) => {
      logAction("node:added", id, node);
    });
    // add link:added event listener
    data.on('link:added', ({ id, link }: LinkEventData) => {
      logAction("link:added", id, link);
    });

    // add node:deleted event listener
    data.on('node:deleted', ({ id, node }: NodeEventData) => {
      logAction("node:deleted", id, node);
    });

    // add "link:deleted" event listener
    data.on('"link:deleted"', ({ id, link }: LinkEventData) => {
      logAction("link:deleted", id, link);
    });

    // add "link:deleted" event listener
    data.on('node:links:updated', ({ id, node }: NodeEventData) => {
      logAction("node:links:updated", id, node);
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

