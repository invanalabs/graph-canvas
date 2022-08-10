import {
  gridLayoutSettings,
  radialLayoutSettings,
  circularLayoutSettings,
  concentricLayoutSettings,
  forceLayoutSettings,
  gForceLayoutSettings
} from "./layouts";

export default class CanvasMenu {
  // change layout
  //

  constructor(graph) {
    this.graph = graph;
  }

  updateLayout(layoutName) {
    let layoutSettings = null;
    if (layoutName === "grid") {
      layoutSettings = gridLayoutSettings;
    } else if (layoutName === "radial") {
      layoutSettings = radialLayoutSettings;
    } else if (layoutName === "circular") {
      layoutSettings = circularLayoutSettings;
    } else if (layoutName === "concentric") {
      layoutSettings = concentricLayoutSettings;
    } else if (layoutName === "force") {
      layoutSettings = forceLayoutSettings;
    } else if (layoutName === "gForce") {
      layoutSettings = gForceLayoutSettings;
    }
    this.graph.destroyLayout();
    this.graph.updateLayout(layoutSettings);

    this.graph.render(); // needed to add this line
  }
}
