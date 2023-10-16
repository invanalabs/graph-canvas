import React, {  useState } from "react";
import { darkTheme, lightTheme } from "./canvas/theme";
import  { ThemeProvider } from "styled-components";
import Flow from "./canvas/flow";
import  {
  Panel
} from "reactflow";


export const App = () => {
  const [mode, setMode] = useState("light");
  const theme = mode === "light" ? lightTheme : darkTheme;

  const toggleMode = () => {
    setMode((m) => (m === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <Flow>
        <Panel position="top-left">
          <button onClick={toggleMode}>switch mode</button>
        </Panel>
      </Flow>
    </ThemeProvider>
  );
};
