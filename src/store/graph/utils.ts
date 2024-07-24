import { CanvasLink } from "./links";
import { IdString } from "./types";


// export const calcDegreeOfNode = (nodeId: IdString, links: Map<IdString, ICanvasLink> ) => {

//   let stats = {
//     incoming : 0,
//     outgoing: 0
//   }

//   links.forEach((link) => {
//     //@ts-ignore
//     if (link.source.id === nodeId) {
//       stats.outgoing++
//     }
//     //@ts-ignore  
//     if (link.target.id === nodeId) {
//       stats.incoming++
//     }
//   })
//   return { incoming: stats.incoming, outgoing: stats.outgoing }
// }


// export const calculateNodeLinksStats = (nodeId: IdString, links: Map<IdString, ICanvasLink> ): ICanvasNodeLinksStats => {
  
//   let stats: ICanvasNodeLinksStats = {
//     byDirection:{
//       incoming : [],
//       outgoing: []
//     },
//     // byGroup: {},
//     all: []
//   }

//   links.forEach((link) => {
//     //@ts-ignore
//     if (link.source.id === nodeId) {
//       // this is out
//       stats.byDirection.outgoing.push(link)
//       stats.all.push(link)
//     }
//     //@ts-ignore  
//     if (link.target.id === nodeId) {
//       stats.byDirection.incoming.push(link)
//       stats.all.push(link)
//     }
//   })

//   return stats
// }

export const filerLinksOfNode = (nodeId: IdString, links:  Map<IdString, CanvasLink>): CanvasLink[] => {
  console.log("filerLinksOfNode", nodeId, links)
  //@ts-ignore
  return [...links.values()].filter((link) =>  link.source.id === nodeId || link.target.id === nodeId )
}