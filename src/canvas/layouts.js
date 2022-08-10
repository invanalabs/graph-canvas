import React, { useState } from "react";

// https://g6.antv.vision/en/docs/api/graphLayout/gforce
export const gForceLayoutSettings = {
  // maxIteration: 1000,

  type: "gForce",
  // center: [0, 0], // The center of the graph by default
  linkDistance: 200,
  nodeStrength: 2500,
  edgeStrength: 100,
  nodeSize: 10,
  // gravity: 10,
  preventOverlap: true,
  preventOverlapPadding: 20,
  collideStrength: 0.8,
  // onTick: () => {
  //   console.log("ticking");
  // },
  onLayoutEnd: () => {
    console.log("force layout done");
  },
  workerEnabled: true, // Whether to activate web-worker
  gpuEnabled: true // Whether to enable the GPU parallel computing, supported by G6 4.0
  // ... // more options are shown below
};

export const gridLayoutSettings = {
  type: "grid",
  begin: [20, 20],
  preventOverlap: true
};

export const radialLayoutSettings = {
  type: "radial",
  unitRadius: 50,
  preventOverlap: true
};
export const forceLayoutSettings = {
  type: "force",
  preventOverlap: true
};
export const circularLayoutSettings = {
  type: "circular",
  // preventOverlap: true,
  radius: 200,
  startAngle: Math.PI / 4,
  endAngle: Math.PI,
  divisions: 5,
  ordering: "degree"
};

export const concentricLayoutSettings = {
  type: "concentric",
  // preventOverlap: true,
  maxLevelDiff: 0.5,
  sortBy: "degree"
};
