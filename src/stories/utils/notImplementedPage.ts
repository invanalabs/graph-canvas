


export const notImplementedPage = (message: string= "") => {
  const html = document.createElement("div");
  
  html.style.height = '100vh';
  html.style.width = '100vw';
  html.style.background = "#222222"
  html.style.margin = "0px"
  html.style.color = "#999999"
  html.innerHTML = `<div style='padding: 50px;'>'${message}' Not Implemented</div>`

  return html
}