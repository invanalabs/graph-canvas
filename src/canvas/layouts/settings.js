// import React, { useState } from "react";

// https://g6.antv.vision/en/docs/api/graphLayout/gforce
export const gForceLayoutSettings = {

    type: "gForce",
    // center: [0, 0], // The center of the graph by default
    linkDistance: 200,
    nodeStrength: 2500,
    edgeStrength: 100,
    nodeSize: 10,
    maxIteration: 1000,
    gravity: 10,
    preventOverlap: true,
    preventOverlapPadding: 20,
    collideStrength: 0.8,
    // onTick: () => {
    //   console.log("ticking");
    // },
    // onLayoutEnd: (graph) => {
    //     console.log("force layout done");
    //     // const nodes = graph.getNodes();
    //     // const edges = graph.getEdges();
    //     // nodes.forEach((node) => {
    //     //     node.show();
    //     // });
    //     // edges.forEach((edge) => {
    //     //     edge.show();
    //     // });
    // },
    workerEnabled: true, // Whether to activate web-worker
    gpuEnabled: true // Whether to enable the GPU parallel computing, supported by G6 4.0
    // ... // more options are shown below
};

export const gridLayoutSettings = {
    type: "grid",
    // begin: [20, 20],
    preventOverlap: true
};

export const radialLayoutSettings = {
    type: "radial",
    // unitRadius: 50,
    preventOverlap: true
};
export const forceLayoutSettings = {
    type: "force",
    preventOverlap: true
};
export const circularLayoutSettings = {
    type: "circular",
    preventOverlap: true,
    radius: 200,
    startAngle: Math.PI / 4,
    endAngle: Math.PI,
    divisions: 5,
    ordering: "degree"
};

export const concentricLayoutSettings = {
    type: "concentric",
    preventOverlap: true,
    maxLevelDiff: 0.5,
    sortBy: "degree"
};


export const compactBoxLayoutSettings = {
    type: 'compactBox',
    direction: 'TB',
    getId: function getId(d) {
        return d.id;
    },
    getHeight: function getHeight() {
        return 16;
    },
    getWidth: function getWidth() {
        return 16;
    },
    getVGap: function getVGap() {
        return 40;
    },
    getHGap: function getHGap() {
        return 70;
    },
};