import { ICanvasLink, ICanvasNode } from "../../../store";
import miserablesDataRaw from "./miserables.json";


const getMiserablesData = (data: any)=> {
  return {
    nodes: data.nodes.map((node: any): ICanvasNode => {

      return {
          id: node.id,
          label: node.id,
          group: "group-" + node.group.toString(),
          properties: {
            value: node.value
          },
          style: node.style
      }
  }),
  
 links: data.links.map((link: any): ICanvasLink => {
      return {
          id: `${link.source}-${link.target}`,
          group: "relation",
          source: link.source,
          target: link.target,
          properties: {
              value: link.value
          },
          style: link.style
      }
  })
  }
}

export const miserablesData = getMiserablesData(miserablesDataRaw)

