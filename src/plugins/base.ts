import { ArtBoard } from "../artBoard";


export abstract class PluginAbstract {

  artBoard: ArtBoard;

  constructor(artBoard: ArtBoard){
      this.artBoard = artBoard
  }

  abstract render(): HTMLElement
}

export class PluginBase implements PluginAbstract {

  artBoard: ArtBoard;

  constructor(artBoard: ArtBoard){
      this.artBoard = artBoard
  }

  render(): HTMLElement {
    const div = document.createElement("div");
      div.innerText = "Base Plugin - extend render()"
    return div
  }
}