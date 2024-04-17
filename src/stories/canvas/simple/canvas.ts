import GraphCanvas from "../../../canvas/canvas";
import Circle from "../../../graphics/nodes/circle";
import { exampleLinks, exampleNodes } from "../data";


export const createCanvas = () => {

    const html = document.createElement("div");
    html.style.height = "500px";
    html.style.width = "800px";
    // html.style.background = "red";

    const canvas = new GraphCanvas({viewDiv: html});
    canvas.clear()
    
    exampleNodes.forEach(node=> {
        const circleShape1 = new Circle(node)
        circleShape1.draw()
        canvas.addGfx2Canvas(circleShape1) 
    })

    exampleLinks.forEach(link=>{
        // const circleShape1 = new Circle(node)
        // circleShape1.draw()
        // canvas.addGfx2Canvas(circleShape1) 
    })
       

    return html
}