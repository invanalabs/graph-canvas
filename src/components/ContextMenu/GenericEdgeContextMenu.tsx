import React, { useCallback } from 'react';
import { useReactFlow } from 'reactflow';



const styles: React.CSSProperties = {
    background: "white",
    borderStyle: "solid",
    boxShadow: "10px 19px 20px rgba(0, 0, 0, 10%)",
    position: "absolute",
    zIndex: 10
}

export default function GenericEdgeContextMenu({ id, type,  top, left, right, bottom, ...props }: {
    id: string,  type: string, top: number, left: number, right: number, bottom: number, props: object
}) {
    console.log("====GenericEdgeContextMenu", id, type);
    // type = edge/node 
    
    const { setNodes,setEdges } = useReactFlow();
    //   const duplicateNode = useCallback(() => {
    //     const node = getNode(id);
    //     const position = {
    //       x: node.position.x + 50,
    //       y: node.position.y + 50,
    //     };

    //     addNodes({ ...node, id: `${node.id}-copy`, position });
    //   }, [id, getNode, addNodes]);

    const deleteNode = useCallback(() => {
        setNodes((nodes) => nodes.filter((node) => node.id !== id));
        setEdges((edges) => edges.filter((edge) => edge.source !== id));
    }, [id, setNodes, setEdges]);
    console.log("=====top", top, left, right, bottom);
    return (
        <div style={{ top, left, right, bottom, ...styles }} className="c"  {...props}>

            <p style={{ margin: '0.5em' }}>
                <small>edge: {id}</small>
            </p>
            {/* <button onClick={duplicateNode}>duplicate</button> */}
            <button onClick={deleteNode}>delete</button>

        </div>
    );
}
