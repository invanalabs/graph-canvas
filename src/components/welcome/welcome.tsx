import React, {useContext} from "react";
import PropTypes, {node} from "prop-types";
import {Card, Form, Button, InputGroup, FloatingLabel} from "react-bootstrap";
import {GraphinContext} from "@antv/graphin";


// @ts-ignore
function WelcomeToCanvas(props: any) {

    const {apis, graph} = useContext(GraphinContext);

    // graph.downloadImage()
    const doSomething=()=>{
    }


    return (
        <div className="welcomeModal bg-white" style={props.style}>
            <Card className={"h-100"}>
                <Card.Header>Hey there! What do you want to analyse ?</Card.Header>
                <Card.Body className={""}>

           {/*<ul className="list-group  list-group-flush">*/}
           {/*         <li className={"list-group-item "}*/}
           {/*             style={{"cursor": "pointer"}}*/}
           {/*             onClick={() => doSomething()}>*/}
           {/*             Start new canvas*/}
           {/*         </li>*/}

           {/*         <li className={"list-group-item "}*/}
           {/*             style={{"cursor": "pointer"}}*/}
           {/*             onClick={() => doSomething()}>*/}
           {/*             canvas 1*/}
           {/*         </li>*/}
           {/*         <li className={"list-group-item "}*/}
           {/*             style={{"cursor": "pointer"}}*/}
           {/*             onClick={() => doSomething()}>*/}
           {/*             Learn more - Getting started with Graph Canvas*/}
           {/*         </li>*/}


           {/*     </ul>*/}

                </Card.Body>
            </Card>
        </div>
    )
}

WelcomeToCanvas.propTypes = {
    stateManager: PropTypes.any,
}
export default WelcomeToCanvas