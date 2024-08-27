



export const ZIndexOrder = {
  DATA_LAYER_LINKS: 4,
  DATA_LAYER_NODES: 5,

  FRONT_LAYER_LINKS: 9,
  FRONT_LAYER_NODES: 10,

  ANNOTATIONS_LAYER_LINKS: 14,
  ANNOTATIONS_LAYER_NODE: 15

}

export enum NodeContainerChildNames {
  // shapeName
  shapeName = 'shapeName',
  shapeBackground = 'nodeBackground',
  shapeHoveredBorder = 'shapeHoveredBorder',
  shapeHighlightedBorder = 'shapeHighlightedBorder',
  shapeSelectedBorder = 'shapeSelectedBorder',
  // label
  label = 'label',
  labelBackground = 'labelBackground',
  labelText = 'labelText',
  // badges

  icon = 'icon',

  // debug
  debugBorder = 'debugBorder'
}

export enum LinkContainerChildNames {
  // shapeName
  shapeName = 'shapeName',
  shapeLine = 'shapeLine',
  shapeHoveredBorder = 'shapeHoveredBorder',
  shapeHighlightedBorder = 'shapeHighlightedBorder',
  shapeSelectedBorder = 'shapeSelectedBorder',

  // label
  label = 'label',
  labelBackground = 'labelBackground',
  labelText = 'labelText',

  // debug
  debugBorder = 'debugBorder'
}