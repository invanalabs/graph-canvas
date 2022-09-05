import {ContextMenuValue} from "@antv/graphin";
import React from "react";
import "./contextMenu.css"


export const NodeContextMenu = (value: ContextMenuValue) => {
    const handleClick = (evt: React.MouseEvent<Element, MouseEvent>) => {
        const {onClose, id} = value;
        const target = evt.target as HTMLElement;
        let code = target.getAttribute("data-code");
        // console.log("===menu item clicked", `${e.code}:${id}`);
        console.log("===menu item clicked", code);
        // message.info(`${e.key}:${id}`);
        onClose();
    };
    // @ts-ignore
    const model = value.item.get("model");
    console.log("model", model)

    return (
        <div className={"contextMenu"}>
            <h4>{model.label} &\ue7ce;</h4>
            <p className={"small"}>Id: {model.id}</p>
            <hr/>
            <ul>
                <div data-code="copy" onClick={handleClick}> item 1</div>
                <div data-code="delete" onClick={handleClick}>item 2</div>
                <div data-code="tag" onClick={handleClick}>item 3</div>
            </ul>
        </div>

    );
};
