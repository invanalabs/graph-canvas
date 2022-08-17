import React, {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import ExampleView from "./views/example";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <ExampleView/>
    </StrictMode>
);
