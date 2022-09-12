import {ContextMenuValue} from "@antv/graphin";
import React from "react";
import "./contextMenu.css"
import {INode} from "@antv/g6";


export const NodeContextMenu = (value: ContextMenuValue) => {
    // const handleClick = (evt: React.MouseEvent<Element, MouseEvent>) => {
    //     const {onClose, id} = value;
    //     const target = evt.target as HTMLElement;
    //     let code = target.getAttribute("data-code");
    //     // console.log("===menu item clicked", `${e.code}:${id}`);
    //     console.log("===menu item clicked", code);
    //     // message.info(`${e.key}:${id}`);
    //     onClose();
    // };
    // @ts-ignore
    const model = value.item.get("model");
    console.log("model", model)
    if (model) {
        const primaryColor = model.style.keyshape.stroke;

        return (
            <div className={"contextMenu"} style={{borderTopColor: primaryColor}}>
                <h4 style={{color: primaryColor}}>
                    {model.style.icon ? <span className="icon-foo"
                                              style={{fontFamily: model.style.icon.fontFamily,}}>
                {model.style.icon.value}</span> : <span></span>}
                    {model.label} </h4>
                <p className={"small border-bottom pb-2 mb-0"}>ID: {model.id}</p>
                <div className={"properties"}>
                    <div className="header text-uppercase mb-2 p-2 ">Properties</div>
                    <div className="body">
                        {Object.keys(model.properties || {}).map((key, index) => {
                            if (model) {
                                return (<div className={"propertyItem border-bottom pb-1 "}>
                                    <h6 className={"mb-1"}>{key} :</h6>
                                    <p className={"mb-1"}>{model.properties[key]}</p>
                                </div>)
                            }
                        })
                        }
                    </div>
                </div>

            </div>

        );
    }
    return (<div/>)
};
