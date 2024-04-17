import GraphCanvas from "../../../canvas/canvas";
import Circle from "../../../graphics/nodes/circle";



export const createCanvas = () => {

    const html = document.createElement("div");
    html.style.height = "500px";
    html.style.width = "800px";
    // html.style.background = "red";

    const canvas = new GraphCanvas({viewDiv: html});

    canvas.clear()
    const circleShape1 = new Circle()
    circleShape1.draw()
    canvas.addGfx(circleShape1)        

    return html
}