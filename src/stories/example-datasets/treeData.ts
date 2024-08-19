import { CanvasLink, CanvasNode, ICanvasLink, ICanvasNode } from "../../store";


// Function to generate tree data with `x` links for each node
function generateTreeDataWithLinks(x: number): { nodes: ICanvasNode[], links: ICanvasLink[] } {
  const nodes: ICanvasNode[] = [];
  const links: ICanvasLink[] = [];
  let currentNodeId = 1;

  // Function to add a node
  function addNode(label: string): string {
    const id = currentNodeId.toString();
    nodes.push({ id, label, group: "Hello" });
    currentNodeId++;
    return id;
  }

  // Function to add a link
  function addLink(source: string, target: string): void {
    links.push({ id: `${source}-${target}`, source, target, group: "link" });
  }

  // Example: Creating a basic tree structure
  function createTree(parentId: string, depth: number): void {
    if (depth <= 0) return;

    for (let i = 0; i < x; i++) {
      const childId = addNode(`Node ${currentNodeId}`);
      addLink(parentId, childId);
      createTree(childId, depth - 1);
    }
  }

  // Initialize tree with the root node
  const rootId = addNode("Root");
  createTree(rootId, 2); // Specify the depth of the tree

  // Return the generated data
  return { nodes, links };
}

// Example usage: Generate tree with 3 links (children) per node
export const treeData = generateTreeDataWithLinks(3);
// console.log(JSON.stringify(treeData, null, 2));
