import { CanvasData, NodeEventData, LinkEventData, ICanvasNode, ICanvasLink } from "../../store";
import { action } from '@storybook/addon-actions';


const exampleNodes: Array<ICanvasNode> = [
  { id: '1', group: 'Person', label: 'Person-1' },
  { id: '2', group: 'Person', label: 'Person-2' },

];

const exampleLinks: Array<ICanvasLink> = [
  { id: '1-2', group: 'authored', label: 'default', sourceId: '1', targetId: '2' },

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
      logAction(`nodeAdded - Node added: id:${key};\t data=${JSON.stringify(value)}`);
    });
    // add linkAdded event listener
    data.on('linkAdded', ({ key, value }: LinkEventData) => {
      logAction(`linkAdded - Link added: id:${key}; data=${JSON.stringify(value)}`);
    });

    // add nodeDeleted event listener
    data.on('nodeDeleted', ({ key, value }: LinkEventData) => {
      logAction(`nodeDeleted - Node deleted: id:${key}; data=${JSON.stringify(value)}`);
    });

    // // add linkDeleted event listener
    // data.on('linkDeleted', ({ key, value }: LinkEventData) => {
    //   logAction(`linkDeleted - Link deleted: id:${key}; data=${JSON.stringify(value)}`);
    // });

    // add linkDeleted event listener
    data.on('nodeUpdated:links', ({ key, value }: LinkEventData) => {
      logAction(`nodeUpdated:links - node links updated : id:${key}; data=${JSON.stringify(value)}`);
    });
    
    // add data
    data.add(exampleNodes, exampleLinks)
    // delete node
    data.deleteNode(exampleNodes[0].id)
    // delete link
    data.deleteLink(exampleLinks[0].id)

  }, false);
  return html
}

