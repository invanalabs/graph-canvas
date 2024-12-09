import React, { useCallback } from 'react';
import { useReactFlow } from 'reactflow';
import { ContextMenuType } from './types';

export const styles: React.CSSProperties = {
    background: "white",
    borderStyle: "solid",
    boxShadow: "10px 19px 20px rgba(0, 0, 0, 0.1)",
    position: "absolute",
    zIndex: 10
};

const GenericEdgeContextMenu: React.FC<ContextMenuType> = ({ id, type, top, left, right, bottom }) => {
    console.log("====GenericEdgeContextMenu", id, type);
    // type = edge/node 

    const { setNodes, setEdges } = useReactFlow();

    const deleteNode = useCallback(() => {
        setNodes((nodes) => nodes.filter((node) => node.id !== id));
        setEdges((edges) => edges.filter((edge) => edge.source !== id));
    }, [id, setNodes, setEdges]);

    console.log("=====top", top, left, right, bottom);

    return (
        <div style={{ top, left, right, bottom, ...styles }} className="c">
            <p style={{ margin: '0.5em' }}>
                <small>edge: {id}</small>
            </p>
            <button onClick={deleteNode}>delete</button>
        </div>
    );
};

export default GenericEdgeContextMenu;