import { GraphCanvas, ICanvasOptions } from "../../../canvas";
import ArtBoardToolBar from "../../../plugins/toolbar";
import { LinkStyleDefaults } from "../../../renderer/shapes/links/defaults";
import { NodeStyleDefaults } from "../../../renderer/shapes/nodes/circle/defaults";
import { deepMerge } from "../../../utils/merge";
import { sample1DataSet } from "../../example-datasets/sample1";
import { onStoryDown } from "../../utils/storyDown";


export default () => {

  const canvasDiv = document.getElementById("graphCanvas") as HTMLCanvasElement

  const canvasOptions: ICanvasOptions = {
    background: "#08345c",
    viewElement: canvasDiv,
    // debugMode: true,
    styles: {
      defaultLinkStyle: deepMerge(LinkStyleDefaults, {
        shape: { color: "#ffffff" },
        label: {
          background: {
            color: "#6a849d",
            opacity: 0.5
          },
          text: {
            color: "#3c5369"
          }
        },
      }),
      defaultNodeStyle: deepMerge(NodeStyleDefaults, {
        shape: {
          background: { 
            color: "#6a849d" 
          },
          border: {
            color: "#3c5369",
            thickness: 3    
          },
        },
        label: {
          background: {
            color: "#6a849d",
            opacity: 0.5
          },
          text: {
            color: "#ffffff"
          }
        },
      }),
      nodes: {
        Project: {
          size: 30,
          label: {
            text: {
              font: {
                size: 18
              }
            }
          }
        }
      }
    },
    
    extraSettings: {
      nodeColorBasedOn: 'default',
    }
  }

  const canvas = new GraphCanvas(canvasOptions);

  const toolbar = new ArtBoardToolBar(canvas.artBoard);
  const toolBarHTMLDiv = toolbar.render()
  canvasDiv.parentNode?.appendChild(toolBarHTMLDiv)

  canvas.artBoard.init().then(() => {
    canvas.dataStore.add(sample1DataSet.nodes, sample1DataSet.links)
    canvas.artBoard.camera.fitView();
  })


  onStoryDown(() => {
    canvas.artBoard.renderer.destroy();
  });

}