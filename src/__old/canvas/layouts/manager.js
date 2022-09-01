import {
    gridLayoutSettings,
    radialLayoutSettings,
    circularLayoutSettings,
    concentricLayoutSettings,
    forceLayoutSettings,
    gForceLayoutSettings
} from "./settings";

export default class LayoutManager {
    // change layout
    //


    gridLayout(graph) {
        this.updateLayout(graph, "grid")
    }

    radialLayout(graph) {
        this.updateLayout(graph, "radial")
    }

    circularLayout(graph) {
        this.updateLayout(graph, "circular")
    }

    concentricLayout(graph) {
        this.updateLayout(graph, "concentric")
    }

    forceLayout(graph) {
        this.updateLayout(graph, "force")
    }


    gForceLayout(graph) {
        this.updateLayout(graph, "gForce")
    }


    updateLayout(graph, layoutName) {
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
        graph.destroyLayout();

        graph.updateLayout(layoutSettings);

        // graph.fitView();
        graph.render(); // needed to add this line

    }
}
