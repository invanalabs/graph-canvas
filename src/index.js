import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GraphCanvasComponent from "./components/canvas";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <GraphCanvasComponent />
  </StrictMode>
);
