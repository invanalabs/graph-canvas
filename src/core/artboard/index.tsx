import ArtBoardViewCtrl from "./view";
import ArtBoardDisplayCtrl from "./display";
import DataStore from "../datastore";
import {GraphData} from "../types";
import { Network } from "vis-network";

// implementation from https://stackoverflow.com/a/35925061/3448851
// const ArtBoardDisplayCtrlMixin = (ArtBoardDisplayCtrl: any) => class extends ArtBoardDisplayCtrl {}
// const ArtBoardViewCtrlMixin = (ArtBoardViewCtrl: any) => class extends ArtBoardViewCtrl {}


class ArtBoard {
    
    network: any = null;
    dataStore: DataStore = new DataStore();
 

    setNetwork(network: Network){
        this.network = this.network
    }
}

export default ArtBoard