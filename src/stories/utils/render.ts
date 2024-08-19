

const renderTemplate = () => {
  // Set margin and padding for html and body
  document.documentElement.style.margin = "0";
  document.documentElement.style.padding = "0";
  document.body.style.margin = "0";
  document.body.style.padding = "0";

  const html = document.createElement("div");
  const canvasDiv = document.createElement("canvas");
  canvasDiv.setAttribute("id", "graphCanvas")
  canvasDiv.style.height = '100vh';
  canvasDiv.style.width = '100vw';
  canvasDiv.style.background = "#222222"
  html.appendChild(canvasDiv)
  return html
}

export default renderTemplate