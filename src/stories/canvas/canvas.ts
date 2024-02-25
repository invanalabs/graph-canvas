import Canvas from "../../canvas/canvas";


export const createPage = () => {
    const canvasDiv = document.createElement('canvas');
    canvasDiv.style.width = "100vw"
    canvasDiv.style.height = "100vh"


    const canvas = new Canvas(canvasDiv);

    const section = `<section class="storybook-page"></section>`;
    canvasDiv.insertAdjacentHTML('beforeend', section);
    return canvasDiv;
};
