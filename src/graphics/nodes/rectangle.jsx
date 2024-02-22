import * as PIXI from 'pixi.js'




const generateRectangleGraphics = () => {
    const rectangle = new PIXI.Graphics();

    rectangle.beginFill(0x99ff99);

    //  new PIXI.Graphics().lineStyle(2, 0xffffff).drawRect(0, 0, 1000, 1000)

    rectangle.drawRoundedRect(
        window.innerWidth / 2,
        window.innerHeight / 2,
        100,
        100,
        2
    );
    rectangle.endFill();
    return rectangle
}

export default generateRectangleGraphics