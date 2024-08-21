


import { GraphCanvas } from "../../../../canvas";
import { ICanvasLink, ICanvasNode } from "../../../../store";
import { onStoryDown } from "../../../utils/storyDown";

export default () => {

    const canvasDiv = document.getElementById("graphCanvas") as HTMLCanvasElement




    const canvas = new GraphCanvas({
        viewElement: canvasDiv,
        debugMode: true,
        styles: {
            links: {
                follows: {
                    shape: {
                        color: "#C0C78C",
                    }
                },
                contributing_to: {
                    shape: {
                        opacity: 0.5,
                        thickness: 1,
                        color: "#BEADFA",
                    },
                    label: {
                        background: {
                            color: "#ffffff",
                            opacity: 0.5
                        },
                        padding: 3,
                        border: {
                            thickness: 0.5,
                            color: "#999999",
                        },
                        text: {
                            color: "#333333",
                            font: {
                                size: 14,
                                family: "Arial"
                            }
                        }
                    },
                    states: {
                        ":highlighted": {
                            shape: {
                                opacity: 0.6,
                                thickness: 3,
                                color: 0xfeeb77
                            }
                        },
                        ":selected": {
                            shape: {
                                opacity: 0.6,
                                thickness: 5,
                                color: 0xf11b77
                            }
                        }
                    }
                }
            }
        }
    });

    const nodes: ICanvasNode[] = [
        { id: '1', group: 'Person', label: 'Person-1', x: 100, y: 100, image: 'https://icons.getbootstrap.com/assets/icons/person.svg' },
        { id: '2', group: 'Person', label: 'Person-2', x: 450, y: 100 },
        { id: '3', group: 'Person', label: 'Person-3', x: 100, y: 450 },
        { id: '4', group: 'Person', label: 'Person-4', x: 450, y: 450 },
        { id: '5', group: 'Project', label: 'Project', x: (100+450)/2, y: (100+450)/2, image: 'https://icons.getbootstrap.com/assets/icons/building.svg' },
        { id: '6', group: 'Person', label: 'Person-6', x: 750, y: 450 }
      ];
      
      const links: ICanvasLink[] = [
        { id: '1-2', group: 'follows', label: 'follows', source: '1', target: '2' },
        { id: '2-4', group: 'follows', label: 'follows', source: '2', target: '4' },
        { id: '3-4', group: 'follows', label: 'follows', source: '3', target: '4' },
        { id: '4-6', group: 'follows', label: 'follows', source: '4', target: '6' },
        { id: '1-5', group: 'contributing_to', label: 'contributing_to', source: '1', target: '5' },
        { id: '2-5', group: 'contributing_to', label: 'contributing_to', source: '2', target: '5' },
        { id: '4-5', group: 'contributing_to', label: 'contributing_to', source: '4', target: '5' }
      ];


    canvas.artBoard.init().then(() => {
        canvas.dataStore.add(nodes, links)
        canvas.artBoard.camera.fitView();
    })


    onStoryDown(() => {
        canvas.artBoard.renderer.destroy();
    });

}

