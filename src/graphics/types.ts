

export interface IGfxOptionsBase {
  fill?: number;
  alpha?: number;
  stroke?: number;
  texture?: null,
  matrix?: null,
}

export interface INodeGfxOptionsBase extends IGfxOptionsBase {
  x: number;
  y: number;
}

export interface ILinkGfxOptionsBase extends IGfxOptionsBase {
  thickness?: number;
}
