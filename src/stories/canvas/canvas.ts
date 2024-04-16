import Canvas from "../../canvas/canvas";
import Circle from "../../shapes/nodes/circle";



export const createCanvas = () => {

    const html = document.createElement("div");
    // html.style.height = "500px";
    // html.style.width = "200px";
    html.style.background = "red";


    document.addEventListener("DOMContentLoaded", function (event) {
        /* The stuff I needed to initialise */
        console.log("DOM is ready", event)
   
        const canvas = new Canvas();
        const circleShape1 = new Circle()
        circleShape1.draw()
        canvas.addGfx2Canvas(circleShape1)

        
    });

    return html
}