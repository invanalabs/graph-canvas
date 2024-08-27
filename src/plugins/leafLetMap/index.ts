import { ArtBoard } from "../../artBoard";
import { PluginAbstract } from "../base";
import L, { Map as LeafletMap, LatLngExpression, Point } from 'leaflet';


export default class LeafletMapPlugin implements PluginAbstract {

    artBoard: ArtBoard;
    private map: LeafletMap;

    constructor(artBoard: ArtBoard) {
        this.artBoard = artBoard
    }

    render = () => {
        const div = document.createElement("div");
        div.classList.add("mapContainer");
        div.style.top = "0";
        div.style.left = "0";
        div.style.position = "absolute";
        div.style.width = "100%";
        div.style.height = "100%";



        initialCoords: LatLngExpression, initialZoom: number


        
        this.map = L.map(div).setView(initialCoords, initialZoom);


        return div
    }
  }