import React from "react";
import ExamplesView from "./examples";
import EdgeCanvasView from "./edge";
import PropTypes from "prop-types";


function App() {

    const [selected, setSelected] = React.useState("")
    return (
        <main>

            {
                (selected && selected === "examples") ?
                    <ExamplesView/>
                    : (selected && selected === "edge") ?
                        <EdgeCanvasView/>
                        : <div className={"container-fluid"}>
                            <div className="row">
                                <div className="col-12 text-center pt-5 mt-5">
                                    <h1 className={""}>Graph Canvas</h1>
                                    <div className="row  align-items-center">
                                        <div className="col-3"></div>
                                        <p className={"mb-0 col-6   "}>Interactive graph data visualiser for finding and
                                            investigating every node and relationship
                                            between the problem node and the solution node. </p>

                                    </div>
                                    {/*<div className="row">*/}
                                    {/*    <div className="col-6">*/}
                                    <ul className="nav  d-flex justify-content-center ">
                                        <li className="nav-item">
                                            <a className="nav-link text-success cursor-pointer  ps-0"

                                               onClick={() => setSelected("examples")}>Examples</a>
                                        </li>
                                        <li className="nav-item ">
                                            <a className="nav-link  text-success " href="#">| </a>
                                        </li>
                                        <li className="nav-item    ">
                                            <a className="nav-link  text-success cursor-pointer"
                                               onClick={() => setSelected("edge")}
                                            >Whats cooking? </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link  text-success " href="#">| </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link  text-success " href="#">MIT License </a>
                                        </li>

                                    </ul>
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                </div>
                            </div>

                        </div>
            }
        </main>
    )
}

export default App;