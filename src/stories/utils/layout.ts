// src/utils/positions.ts
export interface GridPosition {
  x: number;
  y: number;
}

export interface GridConfig {
  rows?: number;
  columns?: number;
  gridSpacing?: number;
  circleRadius?: number;
}

export function generateGridPositions(config: GridConfig = {}): GridPosition[] {
  const {
    rows = 10,
    columns = 10,
    gridSpacing = 50,
    circleRadius = 10
  } = config;

  const positions: GridPosition[] = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      positions.push({
        x: j * gridSpacing + circleRadius,
        y: i * gridSpacing + circleRadius
      });
    }
  }

  return positions;
}

export const defaultGridConfig: GridConfig = {
  rows: 10,
  columns: 10,
  gridSpacing: 50,
  circleRadius: 10
};