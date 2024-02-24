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
    rectangle.cursor = 'pointer';
    rectangle.interactive = true;


    // const onDragStart = (event) => {
    //     event.stopPropagation();
    //     dragPoint = event.data.getLocalPosition(rectangle.parent);
    //     dragPoint.x -= rectangle.x;
    //     dragPoint.y -= rectangle.y;
    //     rectangle.parent.on("pointermove", onDragMove);
    //   };
      
    //   const onDragMove = (event) => {
    //     const newPoint = event.data.getLocalPosition(rectangle.parent);
    //     rectangle.x = newPoint.x - dragPoint.x;
    //     rectangle.y = newPoint.y - dragPoint.y;
    //   };
      
    //   const onDragEnd = (event) => {
    //     event.stopPropagation();
    //     rectangle.parent.off("pointermove", onDragMove);
    //   };
      
    //   rectangle.on("pointerdown", onDragStart);
    //   rectangle.on("pointerup", onDragEnd);
    //   rectangle.on("pointerupoutside", onDragEnd);


    return rectangle
}

export default generateRectangleGraphics