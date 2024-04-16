import Canvas from "../../canvas/canvas";
import Circle from "../../shapes/nodes/circle";



export const createCanvas = () => {

    const html = document.createElement("div");
    html.style.height = "500px";
    html.style.width = "800px";
    // html.style.background = "red";

    const canvas = new Canvas({viewDiv: html});

    document.addEventListener("DOMContentLoaded", function (event) {
        /* The stuff I needed to initialise */
        console.log("DOM is ready", event)
        canvas.clear()
        const circleShape1 = new Circle()
        circleShape1.draw()
        canvas.addGfx2Canvas(circleShape1)        
    });

    return html
}