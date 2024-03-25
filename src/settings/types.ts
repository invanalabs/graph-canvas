
export interface ILabelCfg {
    align?: 'center' | string; 
    offset?: { x?: number; y?: number };
    style: {
      fill: number | string;
      fontSize: number;
      opacity?: number;
      lineWidth?: number;
    };
  }

export interface IDefaultNodeStyle {
    fill: number | string;
    stroke?: number | string;
    lineWidth?: number;
    opacity?: number;
    fillOpacity?: number;
    cursor?: string;
}

export interface IDefaultNodeCfg {
    size: number;
    style: IDefaultNodeStyle;
    labelCfg: ILabelCfg;
  }

// export interface ICfg {
//     div: string;  
//     debug: boolean; 
//     defaultNode: IDefaultNodeCfg;
//     defaultLink: IDefaultLinkCfg;
//     zoom: {
//       minZoom: number;
//       maxZoom: number;
//     };
//     currentMode: 'default' | string;
//     modes: Modes;
//     plugins: IPlugin[];
//     layout?: ILayout;
//   }