import { ArtBoard } from "../../artBoard";
import { OnMessageChangedEventData } from "../../store/events/types";
import "./index.css"


export default class MessageBar {

    artBoard: ArtBoard;

    constructor(artBoard: ArtBoard){
        this.artBoard = artBoard
    }

    render = () => {
        const div = document.createElement("div");
        div.classList.add("message-bar");
        div.style.bottom = "10px";
        div.style.position = "absolute"

        this.artBoard.canvas.dataStore.on("artBoard:onMessageChanged", ({message}: OnMessageChangedEventData) => {
          div.innerText = message
        })
        return div
    }
}