import { memo } from 'react'
import { animated, to } from '@react-spring/web'
import { InputNode, NodeProps } from '@nivo/network/dist/types'

import IDCard from "../../shapes/nodes/IDCard";
import NoteCard from "../../shapes/nodes/NoteCard";
import {NetworkNode} from "@nivo/network/dist/types/NetworkNode"

const NonMemoizedCanvasRouterNode = <Node extends InputNode>({
        node,
        animated,
        onClick,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
    }: NodeProps<Node>) => {

    // @ts-ignore
    const nodeShape = node.shape

    const nodeProps: NodeProps<Node> = {node, animated, onClick, onMouseEnter, onMouseMove, onMouseLeave};

    // @ts-ignore
    if(!nodeShape){
        return <NetworkNode {...nodeProps} /> 
    }

    if(nodeShape === "IDCard"){
        return <IDCard {...nodeProps}/>
    }
    else if(nodeShape === "NoteCard"){
        return <NoteCard {...nodeProps}/>
    } 
    
}

export const CanvasRouterNode = memo(NonMemoizedCanvasRouterNode) as typeof NonMemoizedCanvasRouterNode