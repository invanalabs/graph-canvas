import React from "react";
import GraphCanvas from "../components/canvas/canvas";
import 'bootstrap/dist/css/bootstrap.min.css';
import authorStoryData from "../exampleData/author-story/data.json";
import authorStoryInitState from "../exampleData/author-story/settings.json";
import flightStoryData from "../exampleData/flight-story/data.json";
import flightStoryInitState from "../exampleData/flight-story/settings.json"
import blankStoryData from "../exampleData/blank-story/data.json";
import blankStoryInitState from "../exampleData/blank-story/settings.json"
import WelcomeToCanvas from "../components/welcome/welcome";


// import data from "../exampleData/flight-story/data.json";
// import defaultSettings from "../canvas/defaults";
// const authorStoryInitState = defaultSettings

// const data = Utils.mock(1345).random().graphin();
// data.nodes.map((node)=>{
//     node.label = "User"
// })
// data.edges.map((node)=>{
//     node.label = "relationship"
// })

function TestView() {


    const [selectedCanvas, setSelectedCanvas] = React.useState("full-ravi-story")
    return <div className="container-fluid" style={{"padding": "30px"}}>
        <div className="row">
            <div className="col-10">
                {selectedCanvas == "full-ravi-story" ?
                    <GraphCanvas data={authorStoryData}
                                 initState={authorStoryInitState}
                                 containerId={"graph-canvas"}
                                 width={"100%"} height={920}
                    />
                    : selectedCanvas == "full-flight-story" ?
                        <GraphCanvas data={flightStoryData}
                                     initState={flightStoryInitState}
                                     containerId={"graph-canvas"}
                                     width={"100%"} height={920}
                        />

                        : selectedCanvas == "blank-story" ?
                            <GraphCanvas
                                data={blankStoryData}
                                initState={blankStoryInitState}
                                containerId={"graph-canvas"}
                                width={"100%"} height={920}
                                welcomeComponent={<WelcomeToCanvas/>}

                            />

                            : <React.Fragment/>
                }

            </div>
            <div className="col-2">
                <ul className="list-group  list-group-flush">
                    <li className={"list-group-item "}
                        style={{"cursor": "pointer"}}>
                        <a   href={"/"}>&larr; go back.</a>
                    </li>
                    <li className={"list-group-item " + (selectedCanvas == "blank-story" ? 'active' : '')}
                        style={{"cursor": "pointer"}}
                        onClick={() => setSelectedCanvas("blank-story")}>
                        Blank Canvas
                    </li>
                    <li className={"list-group-item " + (selectedCanvas == "full-ravi-story" ? 'active' : '')}
                        style={{"cursor": "pointer"}}
                        onClick={() => setSelectedCanvas("full-ravi-story")}>
                        Full Canvas(Story of Ravi)
                    </li>
                    <li className={"list-group-item " + (selectedCanvas == "full-flight-story" ? 'active' : '')}
                        style={{"cursor": "pointer"}}
                        onClick={() => setSelectedCanvas("full-flight-story")}>
                        Full Canvas(Story of Flights)
                    </li>

                </ul>

            </div>
        </div>
    </div>
}

export default TestView;