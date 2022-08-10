import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import ExampleUsage1 from "./examples/example1";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ExampleUsage1 />
  </StrictMode>
);
