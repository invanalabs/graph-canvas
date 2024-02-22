// import { memo } from 'react'
 
// import IDCard from "../graphics/nodes/IDCard";
// import NoteCard from "../graphics/nodes/NoteCard";
 

// const NonMemoizedCanvasRouterNode = <Node extends InputNode>({
//         node,
//         animated,
//         onClick,
//         onMouseEnter,
//         onMouseMove,
//         onMouseLeave,
//     }: NodeProps<Node>) => {

//     // @ts-ignore
//     const nodeShape = node.shape

//     const nodeProps: NodeProps<Node> = {node, animated, onClick, onMouseEnter, onMouseMove, onMouseLeave};

//     // @ts-ignore
//     if(!nodeShape){
//         return <NetworkNode {...nodeProps} /> 
//     }

//     if(nodeShape === "IDCard"){
//         return <IDCard {...nodeProps}/>
//     }
//     else if(nodeShape === "NoteCard"){
//         return <NoteCard {...nodeProps}/>
//     } 
    
// }

// export const CanvasRouterNode = memo(NonMemoizedCanvasRouterNode) as typeof NonMemoizedCanvasRouterNode