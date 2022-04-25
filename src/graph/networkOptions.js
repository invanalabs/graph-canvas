/*
 * Copyright 2021 Invana
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http:www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


export const physicsSettings = {
    // hierarchicalRepulsion: {
    //     avoidOverlap: 1,
    // },
    forceAtlas2Based: {
        gravitationalConstant: -56,
        centralGravity: 0.005,
        springLength: 180,
        // springLength: STUDIO_SETTINGS.RENDERING_EDGES_SETTINGS.length,
        springConstant: 0.18,
        avoidOverlap: 1.5
    },
    maxVelocity: 146,
    solver: 'forceAtlas2Based',
    timestep: 0.35,
    stabilization: {
        enabled: true,
        iterations: 1000,
        updateInterval: 10,
        fit: true
    }

}

const defaultOptions = {
    // layout: {
    //     hierarchical: false
    // },
    autoResize: true,
    interaction: {
        hideEdgesOnDrag: true,
        tooltipDelay: 200,
        hover: true
    },

    physics: physicsSettings,

    edges: {
        arrows: {
            to: {
                enabled: true,
                type: "arrow",
            },
        },
        font: {
            color: "#858585"
        }
    },
    nodes: {
        // physics: false,
        borderWidth: 2,
        borderWidthSelected: 4,
        shape: "dot",
        size: 16,
        scaling: {
            min: 10,
            max: 10,
        },
        shapeProperties: {
            interpolation: true    // 'true' for intensive zooming
        },
        font: {
            color: "#858585"
        }
    }
}

export default defaultOptions;